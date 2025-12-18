export type PlanTier = 'free' | 'silver' | 'gold';

export type User = {
  id: string;
  email: string;
  plan: PlanTier;
  createdAt: string;
};

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const STORAGE_KEY = 'worldpulse_user';

export const auth = {
  login: (email: string, _password: string): User | null => {
    if (typeof window === 'undefined') return null;
    
    let user = auth.getCurrentUser();
    
    if (!user || user.email !== email) {
      user = {
        id: generateUUID(),
        email,
        plan: 'free',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
    
    // Set a session cookie for middleware
    document.cookie = `session=${user.id}; path=/; max-age=86400`;
    
    return user;
  },

  signup: (email: string, _password: string): User => {
    const user: User = {
      id: generateUUID(),
      email,
      plan: 'free',
      createdAt: new Date().toISOString(),
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      document.cookie = `session=${user.id}; path=/; max-age=86400`;
    }
    
    return user;
  },

  logout: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      document.cookie = 'session=; path=/; max-age=0';
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    try {
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  },

  updatePlan: (plan: PlanTier): void => {
    const user = auth.getCurrentUser();
    if (user && typeof window !== 'undefined') {
      user.plan = plan;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  },
};



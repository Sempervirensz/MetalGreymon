import { clsx } from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl border border-gray-200 p-6",
        hover && "transition-shadow hover:shadow-lg cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}



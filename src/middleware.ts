import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // In development, bypass authentication
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Check for session cookie (simulated auth)
  const isLoggedIn = request.cookies.get("session")?.value;
  
  // Protected dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!isDevelopment && !isLoggedIn) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // /create redirect
  if (pathname === "/create") {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard/content", request.url));
    } else {
      const signupUrl = new URL("/signup", request.url);
      signupUrl.searchParams.set("next", "/dashboard/content");
      return NextResponse.redirect(signupUrl);
    }
  }
  
  // /plans redirect
  if (pathname === "/plans") {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard/plans", request.url));
    } else {
      return NextResponse.redirect(new URL("/pricing", request.url));
    }
  }

  // Legacy /test-* routes redirect to /_dev/*
  if (pathname === "/test-route") {
    return NextResponse.redirect(new URL("/_dev/test-route", request.url));
  }
  if (pathname === "/diagnostics") {
    return NextResponse.redirect(new URL("/_dev/diagnostics", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/create", 
    "/plans",
    "/test-route",
    "/diagnostics",
  ],
};

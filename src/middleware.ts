import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore routes starting with /api or /_next
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  // Get the token from Zustand store instead of cookies
  const token = request.cookies.get("token")?.value;

  const allowedRoutes = ["/login", "/register"]; // List of allowed paths
  const isRouteAllowed = allowedRoutes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // If no token is found, redirect to login page unless it's an allowed route
  if (!token) {
    if (isRouteAllowed) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the token is found and the route is allowed (login/register), redirect to the home page
  if (isRouteAllowed && token ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next(); // Continue to the requested page
}

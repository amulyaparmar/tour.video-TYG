// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Bypass middleware for favicon.ico
  if (url.pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  // Add other middleware logic if necessary

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};

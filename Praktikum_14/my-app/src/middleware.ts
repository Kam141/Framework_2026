import { NextRequest,NextResponse } from 'next/server'
import withAuth from "./middleware/withAuth";

export function mainMiddleware(request: NextRequest) {
  // const isLogin = false;
  // if (isLogin) {
  //   return NextResponse.next();
  // } else {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }

  //return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
  
}

export const config = {
  matcher: ["/produk", "/about", "/profile"],
}

export default withAuth(mainMiddleware, config.matcher);
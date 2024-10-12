import { NextURL } from 'next/dist/server/web/next-url'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    //user h kha
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === "/signup" || path === "/verifyemail"
    // getting token from user
   const token= request.cookies.get("token")?.value||""
   if(isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.url))
   }
     
   if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.url))
   }
}

//  matcher m jo bhi apth hoga vha per middleware inject hoga and check oga befire routing
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/verifyemail',
        '/profile',
    ]
}
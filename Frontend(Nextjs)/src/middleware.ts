
import { NextRequest, NextResponse  } from "next/server";


export default function middlewnare(req: NextRequest) {
  // const sessionget = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});
  // if (!sessionget) {
  //   const requestPage = req.nextUrl.pathname;
  //   const url = req.nextUrl.clone();
  //   url.pathname = `/auth/signin`;
  //   url.search = `p=${requestPage}`;
  //   return NextResponse.redirect(url);
  // }
  const token = req.cookies.get("access_token")?.value;
  const signInUrl = new URL("/auth/signin", req.url)
  const dashboardAdmin = new URL("dashboard/admin", req.url)
//   if(!token){
//     if(req.nextUrl.pathname === "/"){
//       return NextResponse.next()
//     }
//     return NextResponse.redirect(signInUrl)
//   }
// if(req.nextUrl.pathname === "/dashboard/admin"){
// return NextResponse.redirect(dashboardAdmin)
// }
}

export const config = {
  matcher: ["/dashboard/:path*","/"],
};


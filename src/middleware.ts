// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "./auth";
// // import {
// //     DEFAULT_LOGIN_REDIRECT,
// //     apiAuthPrefix,
// //     authRoutes,
// //     publicRoutes,
// // } from "@/routes";

// // export async function middleware(request: Request) {
// //     const session = await auth();
// //     console.log({ session });
// //     return NextResponse.next();
// // }

// const protectedRoutes = ["/dashboard"];
// const publicRoutes = ["/login", "/signup", "/"];

// export default auth((req: NextRequest) => {
//     // const path = req.nextUrl.pathname;
//     // const isProtectedRoute = protectedRoutes.includes(path);
//     // const isPublicRoute = publicRoutes.includes(path);

//     // console.log("REQ ", req);

//     return NextResponse.next();
// });

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.jpg).*)"],
// };

export { auth as middleware } from "@/auth";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

const protectedRoutes = [
    "/checkout/address",
    "/products",
    "/users",
    "/profile",
    "/orders",
];

const authRoutes = ["/auth/login", "/auth/register"];

export const authConfig = {
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
            const isAuthRoute = authRoutes.includes(nextUrl.pathname);
            const isLoggedIn = !!auth?.user;

            if (isAuthRoute && isLoggedIn) {
                return Response.redirect(new URL("/", nextUrl));
            }

            if (isProtectedRoute) {
                if (isLoggedIn) {
                    return true;
                }
                return Response.redirect(
                    new URL(`/auth/login?origin=${nextUrl.pathname}`, nextUrl)
                );
            }

            return true;
        },
        jwt({ token, user }) {
            // console.log({ token, user });

            if (user) {
                token.data = user;
            }

            return token;
        },
        session({ session, token, user }) {
            // aqui se puede hacer una consulta a la base de datos
            // para actualizar información del usuario, ejemplo cambiar de admin a user
            session.user = token.data as any;
            return session;
        },
    },
} satisfies Omit<NextAuthConfig, "providers">;

import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import prisma from "./lib/prisma";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },

    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                console.log("CREDENTIALS ", parsedCredentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                //Buscar correo
                const user = await prisma.user.findUnique({
                    where: { email: email.toLowerCase() },
                });

                console.log("USER ", user);

                if (!user || !bcryptjs.compareSync(password, user.password)) {
                    return null;
                }

                const { password: _, ...rest } = user;

                console.log("REST ", rest);

                return rest;
            },
        }),
    ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);

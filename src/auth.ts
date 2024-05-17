import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import prisma from "./lib/prisma";
import { authConfig } from "./auth.config";

export const { signIn, signOut, auth, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                //Buscar correo
                const user = await prisma.user.findUnique({
                    where: { email: email.toLowerCase() },
                });

                if (!user || !bcryptjs.compareSync(password, user.password)) {
                    return null;
                }

                const { password: _, ...rest } = user;

                return rest;
            },
        }),
    ],
});

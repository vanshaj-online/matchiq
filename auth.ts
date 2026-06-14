import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import bcrypt from 'bcryptjs';
import { User } from "./models/user.model";

export const { signIn, signOut, handlers, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {

                const email = credentials?.email as string
                const password = credentials?.password as string

                if (!email || !password) return null
                await connectDB()

                const user = await User.findOne({ email })

                if (!user) return null

                const passwordValid = await bcrypt.compare(password, user.passwordHash)

                if (!passwordValid) return null


                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                } as any
            }
        })
    ],
    callbacks: {
        authorized({ auth }) {
            return !!auth;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }

    }
})
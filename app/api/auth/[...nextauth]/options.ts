import { db } from "@/libs/db";
import { decodeJwtToken } from "@/libs/jwt";
import { excludeField } from "@/libs/utils";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        token: {},
      },
      async authorize(credentials, req) {
        let email = credentials?.email;
        let token = credentials?.token;
        let password = credentials?.password;
        // auto connexion after clicking on email
        if (token) {
          const decodedUser = decodeJwtToken<User>(token);
          if (decodedUser) {
            const existingUser = await db.user.findUnique({
              where: {
                email: decodedUser?.email,
                password: decodedUser?.password,
              },
            });
            if (existingUser?.id) {
              return {
                id: existingUser.id.toString(),
                email: existingUser.email,
              };
            }
          }
        }

        if (!email || !password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: email },
        });

        if (!existingUser) {
          return null;
        }

        if (!existingUser.isVerified) {
          return null;
        }

        const passwordMatch = await compare(password, existingUser.password!);

        if (!passwordMatch) {
          return null;
        }

        return excludeField(existingUser, ["password"]);
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, user, account }) {
      return { ...token, ...user, ...account };
    },
    async session({ session, token, user }) {
      return {
        ...session,
        ...user,
        ...token,
      };
    },
  },
};

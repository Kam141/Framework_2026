import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

import {
  signIn,
  signInWithGoogle,
} from "@/utils/db/servicefirebase";


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  providers: [

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user: any = await signIn(credentials.email);

          if (!user) return null;

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) return null;

          // return data clean (tanpa password)
          return {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
          };
        } catch (error) {
          return null;
        }
      },
    }),


    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),


    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }: any) {

      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }


      if (account?.provider === "google" || account?.provider === "github") {
        if (!user?.email) return token; // safety check

        const data = {
          fullname: user?.name || "",
          email: user?.email,
          image: user?.image || "",
          type: account.provider,
        };

        await signInWithGoogle(data, (result: any) => {
          if (result?.status && result?.data) {
            token.fullname = result.data.fullname;
            token.email = result.data.email;
            token.image = result.data.image;
            token.type = result.data.type;
            token.role = result.data.role;
          }
        });
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user = {
        email: token.email,
        fullname: token.fullname,
        image: token.image,
        role: token.role,
      };

      return session;
    },
  },
};

export default NextAuth(authOptions);
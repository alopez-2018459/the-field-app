import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const nextUrl = process.env.NEXTAUTH_URL as string;

export const authOptions: NextAuthOptions ={
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`http://localhost:3000/api/account/login/`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/account/signin",
  },
  callbacks:{
    async jwt({token, user}){
        return {...token, ...user}
    },
    async session({session, token}){
        session.user = token as any;
        return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
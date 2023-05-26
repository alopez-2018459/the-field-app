import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user:{
            id: number;
            name: string;
            username: string;
            email: string; 
            accessToken: string;
            image: string;
            picture:string;
        }
    }
}
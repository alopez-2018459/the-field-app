import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/Connection";
import Teams from "@/app/models/Teams";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

dbConnect();

export async function POST(request: NextRequest){
    try{
        const json = await request.json();
        console.log({ DataRequest: json });

        const data = new Teams(json);
        console.log({ TeamsCreated: data });

        const teams = await data.save();

        return new NextResponse(JSON.stringify(teams),{
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }catch (err){
        console.log({ err});

        const error = {
            message: "Error saving notification.",
            error: err,
        };
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}
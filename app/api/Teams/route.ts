import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/Connection";
import Teams from "@/app/models/Teams";

dbConnect();

export async function GET() {
    try {
        const teams = await Teams.find()
            
       
        if (teams.length === 0) {
            return new NextResponse(
                JSON.stringify({ message: "No teams found." }),
                {
                    status: 404,
                }
            );
        }

        return new NextResponse(JSON.stringify(teams), {
            status: 200,
        });
    } catch (err) {
        console.log(err);

        return new NextResponse(JSON.stringify(err), {
            status: 500,
        });
    }
}
        
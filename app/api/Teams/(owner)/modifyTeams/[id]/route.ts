import { NextResponse, NextRequest} from "next/server";
import dbConnect from "@/app/db/Connection";
import Teams from "@/app/models/Teams";
import { getServerSession} from "next-auth";
import { authOptions} from "@/app/api/auth/[...nextauth]/route";

dbConnect();

interface params extends Request {
    params: {
        id: string;
    };
}



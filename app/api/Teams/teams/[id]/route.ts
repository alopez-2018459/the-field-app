import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/Connection";
import User from "@/app/models/User";
import Teams from "@/app/models/Teams";

dbConnect();


interface params extends Request {
    params: {
      id: string;
    };
  }

  export async function GET(request: NextRequest, params: params) {
    const id = params.params.id;

    const users = await

  }




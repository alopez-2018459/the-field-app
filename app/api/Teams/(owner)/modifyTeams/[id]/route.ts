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

export async function GET(request: Request, params: params) {
    const id = params.params.id;

    try {
        const teams = await Teams.findById(id)
        if(!teams){
            return new NextResponse("Teams not found",{
                status:404,
            });
        }
        return new NextResponse(JSON.stringify(teams),{
            status:200,
        });
    } catch (err){
        console.log(err);
        return new NextResponse(JSON.stringify(err),{
            status: 500,
        });
    }
}


export async function PUT(request: Request, params: params) {
    const id = params.params.id;
    const data = await request.json();

    try{
        const teams = await Teams.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!teams) {
            return new NextResponse("Teams not found",{
                status: 404,
            });
        }
        return new NextResponse(JSON.stringify(teams),{
            status: 200,
        });
    }catch (err) {
        console.log(err);

        return new NextResponse(JSON.stringify(err),{
            status:500,
        });
    }
}

export async function DELETE(request: Request, params: params) {
    const id = params.params.id;

    try{
        const teams = await Teams.findByIdAndDelete(id);

        if (!teams){
            return new NextResponse("Teams not found",{
                status: 404,
            });
        }

        return new NextResponse(JSON.stringify(teams),{
            status: 200,
        });
            
        

    } catch (err){
        console.log(err);
        return new NextResponse(JSON.stringify(err),{
            status: 500,
        });
    }
}
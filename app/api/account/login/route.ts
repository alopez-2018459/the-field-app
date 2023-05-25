
import dbConnect from "@/app/db/Connection";
import { NextRequest, NextResponse } from "next/server";
import User, { IUser } from "@/app/models/User";
import { comparePassword } from "@/app/tools/encrypt";
import { JWT } from "@/app/tools/jwt";

dbConnect();

export async function POST(req: NextRequest) {
  try {
    const json: IUser = await req.json();

    const credentials = {
      username: json.username,
      password: json.password,
    };

    if (credentials.username.length < 3) {
      return new NextResponse(
        JSON.stringify({ message: "Username too short" }),
        { status: 400 }
      );
    }

    if (credentials.password.length < 8) {
      return new NextResponse(
        JSON.stringify({ message: "Password too short" }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ username: json.username });

    if (!user)
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });

    const isPasswordValid = await comparePassword(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      return new NextResponse(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }

    const token = await JWT(user);

    const userLogged = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    const result = { ...userLogged, token };

    console.log({ login: result });

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
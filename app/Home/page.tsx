import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";

export default async function Page(){

    const session = await getServerSession(authOptions);

    console.log({session})

    return (
        <div className="w-full h-full p-3">
            <Link href={`/Home/${session?.user?.id}/account/`}>
                account
            </Link>
        </div>
    );
}
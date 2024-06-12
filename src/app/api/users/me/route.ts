import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { cookies } from 'next/headers'

connect();

export async function GET(request: NextRequest) {

    try {
        const userData: { userId: string, token: string } = getDataFromToken(request);
        const user = await User.findOne({ _id: userData.userId }).select("-password");

        const response = NextResponse.json({
            message: "User found",
            data: user
        });

        // cookies().set("token", userData.token, { secure: true, httpOnly: true });
        response.cookies.set("token", userData.token);
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}
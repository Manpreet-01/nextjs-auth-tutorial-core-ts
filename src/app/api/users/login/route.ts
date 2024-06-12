import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) return NextResponse.json({ error: "User does not exists" }, { status: 400 });

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) return NextResponse.json({ error: "Check your credentials" }, { status: 400 });

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
        const response = NextResponse.json({ message: "User login successfully", success: true }, { status: 200 });

        // response.cookies.set("token", token, { secure: true, httpOnly: true });
        response.cookies.set("token", token);
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest) {
    try {
        const response = NextResponse.json({ message: "Logout successfully", success: true });
        
        // response.cookies.set("token", "", { secure: true, httpOnly: true, expires: new Date(0) });
        response.cookies.set("token", "");
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
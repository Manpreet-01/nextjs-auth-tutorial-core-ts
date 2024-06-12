import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        console.log("test ", token)
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return { userId: decodedToken.id, token };
    } catch (error: any) {
        throw new Error(error.message);
    }

}
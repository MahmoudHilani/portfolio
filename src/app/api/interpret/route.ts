import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const response = await fetch("https://gointerpreter-production.up.railway.app/interpret",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        }
    );

    const data = await response.json();
    return Response.json({data});
}
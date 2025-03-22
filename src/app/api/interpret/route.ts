import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  // Get the request body using json() method
  const body = await req.json();

  const response = await fetch(
    "https://gointerpreter-production.up.railway.app/interpret",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();
  return Response.json({ data });
}

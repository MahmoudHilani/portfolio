import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  //"https://gointerpreter-production.up.railway.app/interpret",
  const response = await fetch("http://localhost:8080/interpret", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return Response.json(data);
}

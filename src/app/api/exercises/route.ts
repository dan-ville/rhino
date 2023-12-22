import { NextResponse } from "next/server"

export async function GET(request: Request) {

  const res = await fetch(`https://api.api-ninjas.com/v1/exercises`, {
    headers: {
      "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJA_KEY!,
    },
  })
  const data = await res.json()

  return NextResponse.json({ data })
}

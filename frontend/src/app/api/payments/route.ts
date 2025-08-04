import { NextResponse } from "next/server";
export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments`);
  return NextResponse.json(await res.json());
}
export async function POST(request: Request) {
  const body = await request.blob();
  const res  = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments`, {
    method:  "POST",
    headers: { "Content-Type": request.headers.get("Content-Type")! },
    body,
  });
  return NextResponse.json(await res.json(), { status: res.status });
}

// frontend/app/api/settings/route.ts
import { NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function GET() {
  const res = await fetch(`${BASE}/settings`);
  const settings = await res.json();
  return NextResponse.json(settings, { status: res.status });
}

export async function PUT(request: Request) {
  // Read the raw multipart/form-data body
  const bodyBlob = await request.blob();
  // Forward to your backend, preserving the Content-Type header
  const res = await fetch(`${BASE}/settings`, {
    method:  "PUT",
    headers: {
      "Content-Type": request.headers.get("Content-Type")!
    },
    body: bodyBlob,
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// frontend/app/api/orders/route.ts
import { NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  const res = await fetch(`${BASE}/orders`);
  if (!res.ok) {
    return NextResponse.error();
  }
  const orders = await res.json();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const body = await request.json();
  const res  = await fetch(`${BASE}/orders`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

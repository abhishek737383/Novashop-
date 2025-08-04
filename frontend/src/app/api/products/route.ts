import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
  const products = await res.json();
  return NextResponse.json(products);
}

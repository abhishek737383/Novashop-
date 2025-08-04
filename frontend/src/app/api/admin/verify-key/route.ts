// frontend/app/api/admin/verify-key/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { key } = await req.json();
  const SECRET = process.env.ADMIN_SECRET_KEY;

  if (!SECRET) {
    console.error("Missing ADMIN_SECRET_KEY in env!");
    return NextResponse.json(
      { message: "Server misconfigured" },
      { status: 500 }
    );
  }

  if (key === SECRET) {
    return NextResponse.json({ ok: true }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Invalid key" }, { status: 401 });
  }
}

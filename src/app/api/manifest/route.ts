import { NextResponse } from "next/server";
import { generatePolImage } from "@/lib/ai/pollinations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

    const imageUrl = await generatePolImage({ prompt });

    if (!imageUrl) {
      return NextResponse.json({ error: "Visual Cortex Unavailable" }, { status: 503 });
    }

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
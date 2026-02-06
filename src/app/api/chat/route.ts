import { NextResponse } from "next/server";
import { generateCharacterResponse, ChatMessage } from "@/lib/ai/groq";
import { SERVER_PROMPTS } from "@/data/server-prompts";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, characterId, variantId } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
    }

    if (!characterId || !SERVER_PROMPTS[characterId]) {
      return NextResponse.json({ error: "Invalid Character ID" }, { status: 400 });
    }

    const personaPrompts = SERVER_PROMPTS[characterId];
    let systemContent = personaPrompts.systemPrompt;

    // Handle Variant Overrides
    if (variantId && personaPrompts.variants) {
      const variant = personaPrompts.variants.find(v => v.id === variantId);
      if (variant) {
        systemContent += `\n\n[SYSTEM OVERRIDE - VARIANT ACTIVE]: ${variant.systemPromptMod}`;
      }
    }

    // Prepend System Prompt
    const finalMessages: ChatMessage[] = [
      { role: "system", content: systemContent },
      ...messages
    ];
    
    // Force JSON mode for the sentinel system
    const response = await generateCharacterResponse(finalMessages, true);

    return NextResponse.json({ content: response });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
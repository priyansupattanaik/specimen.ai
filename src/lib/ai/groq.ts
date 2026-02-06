import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function generateCharacterResponse(messages: ChatMessage[], jsonMode: boolean = false) {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: messages,
      temperature: 0.8,
      max_completion_tokens: 500,
      top_p: 1,
      stream: false,
      response_format: jsonMode ? { type: "json_object" } : { type: "text" },
      stop: null,
    });

    return completion.choices[0]?.message?.content || "...";
  } catch (error) {
    console.error("Groq Error:", error);
    return "[CONNECTION INTERRUPTED] The specimen is refusing to speak.";
  }
}
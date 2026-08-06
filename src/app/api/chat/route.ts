import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const formattedMessages = messages.map((m: { role: string; content?: string; text?: string }) => ({
      role: m.role === "bot" ? "assistant" : m.role,
      content: m.text || m.content
    }));

    const result = await streamText({
      model: anthropic("claude-3-haiku-20240307"),
      system: "You are a helpful customer support agent for B & Y Technology, an enterprise retail software company. Keep your answers concise, helpful, and professional. Mention our flagship omnichannel POS or AI analytics if relevant.",
      messages: formattedMessages,
    });

    return new Response(result.textStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });

  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}

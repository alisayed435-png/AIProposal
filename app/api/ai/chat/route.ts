import { NextRequest, NextResponse } from "next/server";
import { getAIProvider, type AIMessage } from "@/lib/ai/providers";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { messages } = body as { messages: AIMessage[] };

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 }
            );
        }

        // Get the configured AI provider
        const provider = getAIProvider();

        // Add a system prompt for context
        const systemMessage: AIMessage = {
            role: "system",
            content: `You are an AI assistant for SmallBiz Growth Platform, a tool that helps small businesses manage their online presence, leads, and bookings. You help users:
- Analyze their leads and identify patterns
- Generate ad headlines and landing page copy
- Provide personalized CTA recommendations
- Offer insights on bookings and business growth
- Answer questions about marketing and lead generation

Be helpful, concise, and professional. Format your responses with markdown for readability.`,
        };

        const fullMessages = [systemMessage, ...messages];

        // Get response from provider
        const response = await provider.chat(fullMessages);

        return NextResponse.json({
            success: true,
            message: response.content,
            provider: provider.name,
            usage: response.usage,
        });
    } catch (err) {
        console.error("[AI Chat API Error]", err);
        return NextResponse.json(
            { error: "Failed to get AI response" },
            { status: 500 }
        );
    }
}

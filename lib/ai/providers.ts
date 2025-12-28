// AI Provider Interface
export interface AIMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface AIResponse {
    content: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

export interface AIProvider {
    name: string;
    chat(messages: AIMessage[]): Promise<AIResponse>;
    isAvailable(): boolean;
}

// Get the current AI provider based on environment configuration
export function getAIProvider(): AIProvider {
    const providerName = process.env.AI_PROVIDER || "stub";

    switch (providerName) {
        case "openai":
            return new OpenAICompatibleProvider();
        case "huggingface":
            return new HuggingFaceProvider();
        case "stub":
        default:
            return new StubProvider();
    }
}

// Stub Provider - Default demo mode
class StubProvider implements AIProvider {
    name = "stub";

    isAvailable(): boolean {
        return true; // Always available
    }

    async chat(messages: AIMessage[]): Promise<AIResponse> {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const lastMessage = messages[messages.length - 1];
        const userQuery = lastMessage?.content.toLowerCase() || "";

        // Generate contextual responses based on keywords
        let response = this.generateResponse(userQuery);

        return {
            content: response,
            usage: {
                promptTokens: messages.reduce((acc, m) => acc + m.content.length / 4, 0),
                completionTokens: response.length / 4,
                totalTokens: 0,
            },
        };
    }

    private generateResponse(query: string): string {
        // Lead analysis
        if (query.includes("lead") && (query.includes("analyze") || query.includes("summary") || query.includes("how many"))) {
            return `📊 **Lead Analysis Summary**

Based on your current leads:
- **Total Leads**: 5
- **New Leads**: 2 (40%)
- **Contacted**: 1 (20%)
- **Qualified**: 1 (20%)
- **Converted**: 1 (20%)

**Top Sources**:
1. Google Ads - 2 leads
2. Social Media - 2 leads
3. Organic - 1 lead

**Recommendations**:
- Follow up with new leads within 24 hours
- Your Google Ads campaign is performing well
- Consider increasing social media budget`;
        }

        // Ad headlines
        if (query.includes("headline") || query.includes("ad copy")) {
            const businessType = query.includes("plumber") ? "plumbing" :
                query.includes("dentist") ? "dental" :
                    query.includes("gym") ? "fitness" : "business";

            return `📝 **3 Ad Headlines for your ${businessType} business**:

1. "Transform Your ${businessType === "plumbing" ? "Home" : businessType === "dental" ? "Smile" : "Body"} Today - Book Your Free Consultation!"

2. "Trusted by 500+ Local Families - ${businessType === "plumbing" ? "24/7 Emergency Service" : businessType === "dental" ? "Gentle Care Guaranteed" : "Results in 30 Days"}"

3. "${businessType === "plumbing" ? "Fix It Right, Fix It Once" : businessType === "dental" ? "Your Perfect Smile Awaits" : "Your Fitness Journey Starts Here"} - Limited Time Offer!"

💡 **Pro Tip**: Headlines with numbers and urgency typically get 30% higher click-through rates.`;
        }

        // Landing page variants
        if (query.includes("landing page") || query.includes("page variant")) {
            return `🎯 **3 Landing Page Variants**:

**Variant A - Trust Focus**
- Headline: "Join 1,000+ Happy Customers"
- Hero: Customer testimonial video
- CTA: "See Why We're #1 Rated"

**Variant B - Urgency Focus**
- Headline: "Limited Spots Available This Month"
- Hero: Countdown timer + offer
- CTA: "Claim Your Spot Now"

**Variant C - Value Focus**
- Headline: "Save 20% on Your First Service"
- Hero: Clear pricing comparison
- CTA: "Get Your Free Quote"

📈 I recommend A/B testing these with equal traffic split for 2 weeks.`;
        }

        // CTA personalization
        if (query.includes("cta") || query.includes("personalize")) {
            return `✨ **Personalized CTA Recommendations**:

Based on visitor intent analysis:

**For "looking for help" intent**:
→ "Get Expert Help Today"

**For "comparing options" intent**:
→ "See Why We're Different"

**For "ready to buy" intent**:
→ "Start Your Free Trial"

**For "researching" intent**:
→ "Download Our Free Guide"

Implementation: Add \`?intent=looking\` URL parameter to test different CTAs.`;
        }

        // Booking optimization
        if (query.includes("booking") || query.includes("appointment")) {
            return `📅 **Booking Optimization Insights**:

**Current Stats**:
- 3 upcoming bookings this week
- Average booking lead time: 3 days
- Most popular: Consultation calls

**Recommendations**:
1. Add same-day booking option for 15% more conversions
2. Send reminder emails 24h before appointments
3. Offer video call option for busy clients`;
        }

        // Default response
        return `👋 I'm your AI assistant! Here's what I can help you with:

• **Analyze your leads** - "How are my leads performing?"
• **Generate ad headlines** - "Create headlines for my plumber business"
• **Create landing page variants** - "Suggest landing page variations"
• **Personalize CTAs** - "How should I personalize my call-to-action?"
• **Booking insights** - "How can I get more bookings?"

Just ask me anything about growing your business! 🚀

*Note: Running in demo mode with simulated responses*`;
    }
}

// OpenAI Compatible Provider
class OpenAICompatibleProvider implements AIProvider {
    name = "openai";
    private apiKey: string;
    private baseUrl: string;

    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY || "";
        this.baseUrl = process.env.OPENAI_API_BASE || "https://api.openai.com/v1";
    }

    isAvailable(): boolean {
        return Boolean(this.apiKey);
    }

    async chat(messages: AIMessage[]): Promise<AIResponse> {
        if (!this.isAvailable()) {
            throw new Error("OpenAI API key not configured");
        }

        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages.map((m) => ({
                    role: m.role,
                    content: m.content,
                })),
                temperature: 0.7,
                max_tokens: 1000,
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();

        return {
            content: data.choices[0]?.message?.content || "",
            usage: {
                promptTokens: data.usage?.prompt_tokens || 0,
                completionTokens: data.usage?.completion_tokens || 0,
                totalTokens: data.usage?.total_tokens || 0,
            },
        };
    }
}

// HuggingFace Provider
class HuggingFaceProvider implements AIProvider {
    name = "huggingface";
    private apiKey: string;

    constructor() {
        this.apiKey = process.env.HUGGINGFACE_API_KEY || "";
    }

    isAvailable(): boolean {
        return Boolean(this.apiKey);
    }

    async chat(messages: AIMessage[]): Promise<AIResponse> {
        if (!this.isAvailable()) {
            throw new Error("HuggingFace API key not configured");
        }

        // Combine messages into a single prompt
        const prompt = messages
            .map((m) => `${m.role === "user" ? "User" : m.role === "assistant" ? "Assistant" : "System"}: ${m.content}`)
            .join("\n\n");

        const response = await fetch(
            "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 500,
                        temperature: 0.7,
                    },
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HuggingFace API error: ${response.statusText}`);
        }

        const data = await response.json();

        return {
            content: Array.isArray(data) ? data[0]?.generated_text || "" : data.generated_text || "",
        };
    }
}

export { StubProvider, OpenAICompatibleProvider, HuggingFaceProvider };

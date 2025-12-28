"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2, RefreshCw, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { DEMO_SUBSCRIPTION, isDemoMode } from "@/lib/demo-mode";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const suggestedPrompts = [
    "How are my leads performing?",
    "Generate 3 ad headlines for my plumber business",
    "Suggest landing page variations",
    "How should I personalize my CTA?",
];

export default function AIPage() {
    const { addToast } = useToast();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const subscription = DEMO_SUBSCRIPTION;
    const hasAccess = subscription.tier === "growth" || isDemoMode();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || loading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: content.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.message,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            addToast({
                type: "error",
                title: "Failed to get response",
                description: "Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleSuggestedPrompt = (prompt: string) => {
        sendMessage(prompt);
    };

    const clearChat = () => {
        setMessages([]);
    };

    if (!hasAccess) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">AI Assistant</h1>
                    <p className="mt-1 text-neutral-600">
                        Your intelligent business growth companion.
                    </p>
                </div>

                <Card className="max-w-lg mx-auto">
                    <CardContent className="p-8 text-center">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 mb-4">
                            <Lock className="h-8 w-8 text-neutral-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            Upgrade to Growth
                        </h2>
                        <p className="mt-2 text-neutral-600">
                            The AI Assistant is available on the Growth plan. Upgrade to unlock
                            lead analysis, ad generation, and personalization features.
                        </p>
                        <Button variant="gradient" className="mt-6">
                            Upgrade Now
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6 h-[calc(100vh-10rem)] flex flex-col">
            {/* Page header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                        AI Assistant
                        <Badge variant="primary">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Beta
                        </Badge>
                    </h1>
                    <p className="mt-1 text-neutral-600">
                        Get insights, generate content, and optimize your business.
                    </p>
                </div>
                {messages.length > 0 && (
                    <Button variant="outline" size="sm" onClick={clearChat}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Clear Chat
                    </Button>
                )}
            </div>

            {/* Chat Area */}
            <Card className="flex-1 flex flex-col overflow-hidden">
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 mb-4">
                                <Bot className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-neutral-900">
                                How can I help you today?
                            </h2>
                            <p className="mt-2 text-neutral-600 max-w-md">
                                I can analyze your leads, generate ad copy, suggest landing page
                                improvements, and help you grow your business.
                            </p>

                            {/* Suggested prompts */}
                            <div className="mt-6 flex flex-wrap gap-2 justify-center">
                                {suggestedPrompts.map((prompt, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestedPrompt(prompt)}
                                        className="px-4 py-2 rounded-full border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-3",
                                        message.role === "user" && "flex-row-reverse"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                                            message.role === "user"
                                                ? "bg-brand-100 text-brand-600"
                                                : "bg-gradient-to-br from-brand-500 to-accent-500 text-white"
                                        )}
                                    >
                                        {message.role === "user" ? (
                                            <User className="h-4 w-4" />
                                        ) : (
                                            <Bot className="h-4 w-4" />
                                        )}
                                    </div>
                                    <div
                                        className={cn(
                                            "max-w-[80%] rounded-2xl px-4 py-3",
                                            message.role === "user"
                                                ? "bg-brand-600 text-white"
                                                : "bg-neutral-100 text-neutral-900"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "prose prose-sm max-w-none",
                                                message.role === "user" && "prose-invert"
                                            )}
                                            dangerouslySetInnerHTML={{
                                                __html: message.content
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                    .replace(/\n/g, '<br />')
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                                        <Bot className="h-4 w-4 text-white" />
                                    </div>
                                    <div className="bg-neutral-100 rounded-2xl px-4 py-3">
                                        <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </CardContent>

                {/* Input Area */}
                <div className="border-t border-neutral-200 p-4">
                    <form onSubmit={handleSubmit} className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything about your business..."
                            className="flex-1 rounded-lg border border-neutral-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            disabled={loading}
                        />
                        <Button type="submit" disabled={!input.trim() || loading}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                    <p className="mt-2 text-xs text-neutral-400 text-center">
                        AI responses are generated for demo purposes. Connect an AI provider for production use.
                    </p>
                </div>
            </Card>
        </div>
    );
}

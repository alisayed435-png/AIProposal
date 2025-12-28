import { NextRequest, NextResponse } from "next/server";
import { trackEvent } from "@/lib/analytics";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { eventName, path, metadata, accountId } = body;

        if (!eventName) {
            return NextResponse.json(
                { error: "Event name is required" },
                { status: 400 }
            );
        }

        const result = await trackEvent({
            eventName,
            path,
            metadata,
            accountId,
        });

        return NextResponse.json(result);
    } catch (err) {
        console.error("[Analytics API Error]", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

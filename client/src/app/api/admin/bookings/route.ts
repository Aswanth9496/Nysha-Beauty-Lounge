import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        success: true,
        data: [
            { id: 1, client: "Bonnie Bennett", date: "2024-03-15T10:00:00Z", status: "Confirmed" }
        ]
    });
}

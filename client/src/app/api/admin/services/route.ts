import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        success: true,
        data: [
            { id: 1, name: "Hair Styling", description: "Premium hair styling and cutting." },
            { id: 2, name: "Skin Care", description: "Luxury facials and skin treatments." }
        ]
    });
}

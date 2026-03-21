import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        success: true,
        data: [
            { id: 1, name: "Elena Gilbert", role: "Master Stylist" },
            { id: 2, name: "Damon Salvatore", role: "Senior Barber" }
        ]
    });
}

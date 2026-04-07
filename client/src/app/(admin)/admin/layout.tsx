import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "@/styles/globals.css";

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["400", "500"],
    style: ["normal", "italic"],
});

const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    weight: ["200", "300", "400"],
});

export const metadata: Metadata = {
    title: "Admin Dashboard | Nysha Beauty Lounge",
    description: "Secure Admin Panel for Nysha Beauty Lounge",
};

export default function RootAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${playfair.variable} ${dmSans.variable} antialiased selection:bg-gold selection:text-salon-bg`}>
                <div className="noise-overlay" />
                {children}
            </body>
        </html>
    );
}

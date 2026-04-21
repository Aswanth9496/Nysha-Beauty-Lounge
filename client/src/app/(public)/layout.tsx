import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
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
  title: "Nysha Beauty Lounge – Dubai",
  description: "Premium Salon · JVC · Dubai. Luxury Beauty Redefined.",
  openGraph: {
    title: "BEST LADIES BEAUTY SALON IN JVC",
    siteName: "NYSHA BEAUTY LOUNGE",
    url: "https://nyshabeautylounge.com/",
    description: "Premium Salon · JVC · Dubai. Luxury Beauty Redefined.",
    type: "website",
    images: [{ url: "https://nyshabeautylounge.com/logo.png" }], // Root URL is not a valid image, usually a logo is better. But user gave root. I'll use root for now but maybe a logo is better. Actually user said "content=https://nyshabeautylounge.com/".
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} antialiased selection:bg-gold selection:text-salon-bg`}
      >
        {/* Google Analytics (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WK8XR3YK6Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WK8XR3YK6Y');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wf0ew3r078");
          `}
        </Script>

        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}

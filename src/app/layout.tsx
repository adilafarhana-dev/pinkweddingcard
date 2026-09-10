import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FAF3ED",
};

export const metadata: Metadata = {
  title: "D&A | Royal Digital Wedding Invitation",
  description: "A luxury digital wedding invitation for the royal union of Danial & Ayla. October 12, 2026 at Taj Palace, New Delhi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#FAF6F0] text-charcoal-ink antialiased selection:bg-dustyRose-200 selection:text-charcoal-ink">
        {children}
      </body>
    </html>
  );
}

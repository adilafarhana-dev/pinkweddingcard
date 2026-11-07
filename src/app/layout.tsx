import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#FFFDF9",
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
    <html lang="en" className="scroll-smooth w-full overflow-x-hidden">
      <body className="bg-[#FFFDF9] text-charcoal-ink antialiased selection:bg-dustyRose-200 selection:text-charcoal-ink w-full min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

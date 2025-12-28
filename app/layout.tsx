import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SmallBiz Growth Platform | Launch & Scale Your Business Online",
    template: "%s | SmallBiz Growth Platform",
  },
  description:
    "The all-in-one platform for small businesses to launch professional websites, capture leads, manage bookings, and grow with AI-powered tools.",
  keywords: [
    "small business website",
    "lead generation",
    "booking system",
    "CRM",
    "AI assistant",
    "marketing platform",
  ],
  authors: [{ name: "SmallBiz Growth Platform" }],
  creator: "SmallBiz Growth Platform",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://smallbiz-growth.com",
    siteName: "SmallBiz Growth Platform",
    title: "SmallBiz Growth Platform | Launch & Scale Your Business Online",
    description:
      "The all-in-one platform for small businesses to launch professional websites, capture leads, manage bookings, and grow with AI-powered tools.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SmallBiz Growth Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmallBiz Growth Platform",
    description:
      "The all-in-one platform for small businesses to launch professional websites, capture leads, manage bookings, and grow with AI-powered tools.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

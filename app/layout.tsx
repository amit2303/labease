import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "LabEase.ai | Autonomous AI for Testing Laboratories (Universal Standards Engine)",
  description:
    "Autonomous Laboratory Report Generation with zero hallucinations. LabEase transforms product specs and raw test readings into fully compliant, audit-ready test reports for any standard (e.g., IS 374, IS 302, IEC, or custom lab SOPs) in seconds.",
  keywords: [
    "LabEase",
    "AI Lab Reports",
    "Universal Standards Engine",
    "BIS Compliance",
    "IS Standards",
    "NABL Accredited",
    "Industrial Testing Automation",
    "Test Report Generation",
  ],
  authors: [{ name: "LabEase AI Engineering" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/25 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}

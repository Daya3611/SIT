import type { Metadata } from "next";
import { Share_Tech_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import PageLoader from "@/components/PageLoader";

const boxyFont = Share_Tech_Mono({
  weight: "400",
  variable: "--font-boxy",
  subsets: ["latin"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIT_PORTAL",
  description: "Next-gen Portal for SIT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${boxyFont.variable} ${bodyFont.variable} antialiased font-body bg-black text-white`}
      >
        <AuthProvider>
          <PageLoader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

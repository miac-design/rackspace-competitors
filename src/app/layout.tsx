import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rackspace Competitive Intelligence",
  description: "Competitive positioning tool for Rackspace sales teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f5f5f5]">{children}</body>
    </html>
  );
}

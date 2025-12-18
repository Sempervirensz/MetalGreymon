import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorldPulse - Digital Product Passports",
  description: "Create beautiful digital product passports for your products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}


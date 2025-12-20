import type { Metadata } from "next";
import "./globals.css";
import DevMenu from "@/components/dev/DevMenu";

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
      <body className="antialiased">
        {children}
        <DevMenu />
      </body>
    </html>
  );
}



import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Get Executa - AI Partner for Financial Institutions",
  description:
    "The intelligence layer for investment banks, advisory firms and private equity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

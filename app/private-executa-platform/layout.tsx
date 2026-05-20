import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executa Platform Deck",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivateDeckLayout({ children }: { children: React.ReactNode }) {
  return children;
}

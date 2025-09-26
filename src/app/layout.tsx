import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interface Pro - Matériel Informatique | Yaoundé, Cameroun",
  description: "Interface Pro - Votre partenaire informatique de confiance à Yaoundé. PC, imprimantes, consommables, accessoires. Boutique B3-3, Espace commercial le MFOUNDI.",
  keywords: "Interface Pro, matériel informatique, PC, imprimantes, Yaoundé, Cameroun, ordinateurs, consommables, toners, cartouches",
  authors: [{ name: "Interface Pro" }],
  creator: "Interface Pro",
  publisher: "Interface Pro",
  robots: "index, follow",
  openGraph: {
    title: "Interface Pro - Matériel Informatique",
    description: "Votre partenaire informatique de confiance à Yaoundé",
    url: "https://interface-pro.com",
    siteName: "Interface Pro",
    images: [
      {
        url: "/interface-pro-logo.png",
        width: 400,
        height: 200,
        alt: "Interface Pro Logo",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interface Pro - Matériel Informatique",
    description: "Votre partenaire informatique de confiance à Yaoundé",
    images: ["/interface-pro-logo.png"],
  },
  icons: {
    icon: "/interface-pro-logo.png",
    shortcut: "/interface-pro-logo.png",
    apple: "/interface-pro-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

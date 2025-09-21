import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SidebarProvider } from "@/contexts/SidebarContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000';
const siteTitle = "DocSite - Documentação de Estruturas de Dados";
const siteDescription = "Uma plataforma simples e eficiente para acessar anotações e recursos sobre estruturas de dados e algoritmos, organizada para desenvolvedores e estudantes.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | DocSite"
  },
  description: siteDescription,
  keywords: [
    "estruturas de dados",
    "algoritmos",
    "programação",
    "tutorial",
    "documentação",
    "desenvolvimento",
    "ciência da computação"
  ].join(", "),

  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: baseUrl,
    siteName: "DocSite",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: `${baseUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: siteTitle,
      }
    ],
  },

  authors: [{ name: "Vitor Hugo Antunes" }],

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: baseUrl,
  },

  other: {
    "twitter:card": "summary_large_image",
    "twitter:title": siteTitle,
    "twitter:description": siteDescription,
    "twitter:image": `${baseUrl}/og-default.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} antialiased`}
      >
        <SidebarProvider>
          <Header />
          {children}
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}
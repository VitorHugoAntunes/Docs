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

export const metadata: Metadata = {
  title: "DocSite - Documentação de Estruturas de Dados",
  description: "Uma plataforma simples e eficiente para acessar anotações e recursos sobre estruturas de dados e algoritmos, organizada para desenvolvedores e estudantes.",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
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
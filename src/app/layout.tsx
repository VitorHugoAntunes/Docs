import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SidebarProvider } from "@/contexts/SidebarContext";
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
  title: "Documentação de Estruturas de Dados",
  description: "Uma plataforma simples e eficiente para acessar anotações e recursos sobre estruturas de dados e algoritmos, organizada para desenvolvedores e estudantes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
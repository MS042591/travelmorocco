import type { Metadata } from "next";
import { Inter, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/lib/ModalContext";
import ModalWrapper from "@/components/ModalWrapper";
import PageTransition from "@/components/PageTransition";
import Preloader from "@/components/Preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://travelmorocco.co'),
  title: "Authentic Moroccan Adventures | Custom Travel & Tours 2024",
  description: "Discover and experience the magic of Morocco with Authentic Moroccan Adventures. Custom tours, desert treks, and imperial city experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${montserrat.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-canvas text-ink antialiased font-inter">
        <ModalProvider>
          <Preloader />
          <PageTransition>
            {children}
          </PageTransition>
          <ModalWrapper />
        </ModalProvider>
      </body>
    </html>
  );
}

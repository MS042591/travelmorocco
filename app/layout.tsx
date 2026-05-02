import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "./globals.css";
import { ModalProvider } from "@/lib/ModalContext";
import ModalWrapper from "@/components/ModalWrapper";

export const metadata: Metadata = {
  title: "Authentic Moroccan Adventures | Custom Travel & Tours",
  description: "Discover the magic of Morocco with Authentic Moroccan Adventures. Custom tours, desert treks, and imperial city experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ModalProvider>
          {children}
          <ModalWrapper />
        </ModalProvider>
      </body>
    </html>
  );
}

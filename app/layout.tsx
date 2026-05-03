import type { Metadata } from "next";
import { Inter, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/lib/ModalContext";
import ModalWrapper from "@/components/ModalWrapper";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "700", "900"],
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
  manifest: '/site.webmanifest',
  openGraph: {
    url: 'https://travelmorocco.co',
    type: 'website',
    siteName: 'Travel Morocco',
    title: 'Authentic Moroccan Adventures | Custom Travel & Tours 2024',
    description: 'Discover and experience the magic of Morocco with Authentic Moroccan Adventures. Custom tours, desert treks, and imperial city experiences.',
    images: [
      {
        url: '/images/hero-sahara-opt.jpg',
        width: 1200,
        height: 630,
        alt: 'Travel Morocco - Sahara Desert',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport = {
  themeColor: '#ff385c',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${montserrat.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-canvas text-ink antialiased font-inter">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Travel Morocco",
            "url": "https://travelmorocco.co",
            "logo": "https://travelmorocco.co/logo.webp",
            "sameAs": [
              "https://www.facebook.com/travelmorocco",
              "https://www.instagram.com/travelmorocco"
            ]
          }) }}
        />
        <ModalProvider>
          <PageTransition>
            {children}
          </PageTransition>
          <ModalWrapper />
        </ModalProvider>
      </body>
    </html>
  );
}

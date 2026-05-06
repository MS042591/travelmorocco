import type { Metadata } from "next";
import { Inter, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/lib/ModalContext";
import ModalWrapper from "@/components/ModalWrapper";
import PageTransition from "@/components/PageTransition";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  title: "Authentic Moroccan Adventures | Premium Custom Travel & Tours 2026",
  description: "Experience the soul of Morocco through curated, premium journeys. From luxury Sahara camps to hidden Medina gems, discover authentic adventures tailored for the modern explorer.",
  manifest: '/site.webmanifest',
  openGraph: {
    url: 'https://travelmorocco.co',
    type: 'website',
    siteName: 'Travel Morocco',
    title: 'Authentic Moroccan Adventures | Premium Custom Travel & Tours 2026',
    description: 'Experience the soul of Morocco through curated, premium journeys. From luxury Sahara camps to hidden Medina gems, discover authentic adventures tailored for the modern explorer.',
    images: [
      {
        url: '/images/hero-sahara-opt.jpg',
        width: 1200,
        height: 630,
        alt: 'Travel Morocco - Sahara Desert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authentic Moroccan Adventures | Premium Custom Travel & Tours 2026',
    description: 'Experience the soul of Morocco through curated, premium journeys. From luxury Sahara camps to hidden Medina gems.',
    images: ['/images/hero-sahara-opt.jpg'],
  },
  keywords: ["Morocco tours", "custom Morocco travel", "Sahara desert treks", "imperial city tours", "luxury Morocco travel", "private Morocco guide", "authentic Moroccan adventures", "Marrakech tours", "Fes guided tours"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  alternates: {
    canonical: 'https://travelmorocco.co/',
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
    <html lang="en" style={{ height: '100%' }} className={`scroll-smooth ${inter.variable} ${montserrat.variable} ${playfair.variable}`}>
      <head />
      <body className="min-h-screen bg-canvas text-ink antialiased font-inter">
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KH8SHDFN');`}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BHLJ7BD0LH"
          strategy="lazyOnload"
        />
        <Script id="ga-script" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BHLJ7BD0LH');
          `}
        </Script>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KH8SHDFN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Travel Morocco",
              "url": "https://travelmorocco.co",
              "logo": "https://travelmorocco.co/logo.webp",
              "sameAs": [
                "https://www.facebook.com/travelmorocco",
                "https://www.instagram.com/travelmorocco"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Authentic Moroccan Adventures",
              "image": "https://travelmorocco.co/images/hero-sahara-opt.jpg",
              "@id": "https://travelmorocco.co",
              "url": "https://travelmorocco.co",
              "telephone": "+212000000000",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Medina",
                "addressLocality": "Marrakech",
                "postalCode": "40000",
                "addressCountry": "MA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 31.6295,
                "longitude": -7.9811
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "priceRange": "$$$"
            }
          ]) }}
        />
        {/* Security & Domain Consolidation Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
                var isWww = window.location.hostname.startsWith('www.');
                var isHttp = window.location.protocol === 'http:';
                if (isWww || isHttp) {
                  var newHost = window.location.hostname.replace('www.', '');
                  window.location.replace('https://' + newHost + window.location.pathname + window.location.search);
                }
              }
            `,
          }}
        />
        <ModalProvider>
          <Navbar />
          <main id="main-content">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <ModalWrapper />
        </ModalProvider>
      </body>
    </html>
  );
}

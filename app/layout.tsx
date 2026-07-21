import type { Metadata } from "next";
import { Barlow_Condensed, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/data";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Diesel Generators & Mobile Light Towers Manufacturer`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "diesel generator manufacturer",
    "mobile light tower manufacturer",
    "diesel generator sets China",
    "solar light tower supplier",
    "mining power solutions",
    "construction generators",
    "generator exporter",
    "Haode Power",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Diesel Generators & Mobile Light Towers Manufacturer`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Diesel Generators & Mobile Light Towers Manufacturer`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/logo.svg`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 600, Tongjiang Middle Road",
      addressLocality: "Changzhou",
      addressRegion: "Jiangsu",
      addressCountry: "CN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone,
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Chinese"],
      },
    ],
    sameAs: Object.values(site.socials),
  };

  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

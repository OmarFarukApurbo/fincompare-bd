import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/context/I18nContext";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinCompare BD | Make the Best Financial Decisions",
  description: "Compare credit cards, loans, and saving rates in Bangladesh. Transparent data, zero hidden fees.",
  keywords: ["credit cards bangladesh", "loans bd", "fdr rates bd", "dps calculator", "financial comparison"],
  openGraph: {
    title: "FinCompare BD - Honest Financial Comparisons",
    description: "Compare the best financial products in Bangladesh instantly.",
    url: "https://fincompare.com.bd",
    siteName: "FinCompare BD",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinCompare BD",
    description: "Compare the best financial products in Bangladesh instantly.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen bg-slate-50`}>
        <I18nProvider>
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}

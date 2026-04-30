import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Toaster } from "react-hot-toast";

import NextSessionProvider from "@/components/Provider/NextSessionProvider";
import StoreProvider from "@/redux/StoreProvider";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Parking",
  description: "Smart Parking",
  icons: {
    icon: "/imgs/right-logo.png", // Path to your icon in public directory
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" reverseOrder={true} />
        <StoreProvider>
          <NextSessionProvider>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </NextSessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

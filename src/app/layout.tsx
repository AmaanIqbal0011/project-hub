import type { Metadata } from "next";
import "./globals.css";
import 'easymde/dist/easymde.min.css'
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  metadataBase: new URL('https://nextjs-project-hub.vercel.app'),
  title: {
    default: "Project Hub - Discover & Share Next.js Projects",
    template: "%s | Project Hub"
  },
  description: "Discover and share amazing Next.js projects. Browse real-world examples, learn from code, and showcase your creations.",
  keywords: ['Next.js', 'projects', 'development', 'web development', 'open source'],
  authors: [{ name: "Project Hub Team" }],
  creator: "Project Hub",
  publisher: "Project Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextjs-project-hub.vercel.app",
    title: "Project Hub - Discover & Share Next.js Projects",
    description: "Discover and share amazing Next.js projects. Browse real-world examples, learn from code, and showcase your creations.",
    siteName: "Project Hub",
    images: [
      {
        url: "https://nextjs-project-hub.vercel.app/og-image.jpg", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Project Hub - Discover & Share Next.js Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Hub - Discover & Share Next.js Projects",
    description: "Discover and share amazing Next.js projects. Browse real-world examples, learn from code, and showcase your creations.",
    images: ["https://nextjs-project-hub.vercel.app/twitter-image.jpg"], // Replace with your actual Twitter image
    creator: "@projecthub",
  },
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
  verification: {
    google: 'your-google-verification-code', // Replace with your actual Google verification code
    yandex: 'your-yandex-verification-code', // Replace with your actual Yandex verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        {children}
         <Toaster />
         <Analytics />
          <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/language-context";

const atten = localFont({
  src: [
    {
      path: "../../public/fonts/AttenRoundNewRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AttenRoundNewBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-atten",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.williamseguin.com"),
  title: "William Séguin | CPA & Assistant Financial Controller",
  description:
    "CPA accountant and digital creator combining financial clarity with operational innovation. See William Séguin's full CV and entrepreneurial journey.",
  openGraph: {
    type: "website",
    title: "William Séguin | CPA & Assistant Financial Controller",
    description:
      "CPA accountant and digital creator building people-first systems. Explore William's background, experience, and projects.",
    url: "https://www.williamseguin.com/",
    siteName: "William Séguin",
    images: [{ url: "/images/William_OG.jpg" }],
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "William Séguin | CPA & Assistant Financial Controller",
    description:
      "CPA accountant and digital creator building people-first systems.",
    images: ["/images/William_headshot.jpg"],
    site: "https://www.williamseguin.com/",
  },
  appleWebApp: {
    title: "Will's CV",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={atten.variable}
    >
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

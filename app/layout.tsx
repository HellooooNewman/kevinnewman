import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";

const SITE_URL = "https://www.kevinnewman.ca";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kevin Newman · Full Stack Developer",
    template: "%s · Kevin Newman",
  },
  description:
    "Kevin Newman is a full stack developer in Canada with 10+ years of experience building web and mobile products, and a game jam enthusiast.",
  keywords: [
    "Kevin Newman",
    "full stack developer",
    "web developer",
    "software developer",
    "Canada",
    "remote",
    "game jam",
  ],
  authors: [{ name: "Kevin Newman", url: SITE_URL }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Kevin Newman",
    title: "Kevin Newman · Full Stack Developer",
    description:
      "Full stack developer in Canada with 10+ years of experience building web and mobile products.",
    images: [{ url: "/assets/icons/logo-image.png", alt: "Kevin Newman logo" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Helloooo_Newman",
    title: "Kevin Newman · Full Stack Developer",
    description:
      "Full stack developer in Canada with 10+ years of experience building web and mobile products.",
    images: ["/assets/icons/logo-image.png"],
  },
  icons: {
    icon: [
      { url: "/assets/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/icons/apple-touch-icon.png",
  },
};

// Zoom is allowed; v1 disabled it (WCAG fail), v2 doesn't.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0e1a",
};

// Set theme before paint to avoid a flash of the wrong theme.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Starfield ambient />
        <SiteNav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

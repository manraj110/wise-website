import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WISE — Educating India",
  description:
    "End-to-end educational consulting for CBSE affiliation, school planning, academic systems, training, and institutional development.",
  openGraph: {
    title: "WISE — Educating India",
    description:
      "End-to-end educational consulting for CBSE affiliation, school planning, academic systems, training, and institutional development.",
    images: ["/logo2.jpg"],
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function () {
          try {
            if (location.hash) {
              window.__pendingHash = location.hash;
              history.replaceState(null, "", location.pathname + location.search);
              document.documentElement.style.visibility = "hidden";
              setTimeout(function () {
                document.documentElement.style.visibility = "";
              }, 5000);
            }
          } catch (e) {}
        })();
      `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

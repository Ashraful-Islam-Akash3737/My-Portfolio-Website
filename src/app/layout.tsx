import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
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
  title: "Ashraful Islam Akash | Frontend Engineer & React Developer",
  description: "Portfolio of Ashraful Islam Akash, an advanced Frontend Engineer & React Developer. Specialized in building premium, high-performance web applications with Next.js, TypeScript, and modern UI/UX engineering.",
  keywords: [
    "Ashraful Islam Akash",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "UI Engineer",
    "Web Application Developer",
    "MERN Stack Developer",
    "JavaScript Specialist",
    "Dhaka React Developer"
  ],
  authors: [{ name: "Ashraful Islam Akash" }],
  creator: "Ashraful Islam Akash",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akash-portfolio.vercel.app",
    title: "Ashraful Islam Akash | Frontend Engineer & React Developer",
    description: "Premium interactive portfolio showcasing advanced React, Next.js, and high-performance frontend engineering by Ashraful Islam Akash.",
    siteName: "Akash Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ashraful Islam Akash - Frontend Engineer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashraful Islam Akash | Frontend Engineer & React Developer",
    description: "Advanced frontend engineering and React application development portfolio.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ashraful Islam Akash",
    "alternateName": "Akash",
    "jobTitle": "Frontend Engineer & React Developer",
    "url": "https://akash-portfolio.vercel.app",
    "image": "/profile.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressCountry": "Bangladesh"
    },
    "email": "abirashrafulislamabir@gmail.com",
    "telephone": "+8801875133328",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Uttara University"
    },
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
      "HTML5",
      "CSS3",
      "MERN Stack",
      "Firebase",
      "MongoDB",
      "ExpressJS",
      "NodeJS",
      "REST APIs",
      "UI/UX Design",
      "Web Development"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col custom-cursor-active selection:bg-accent/30 selection:text-white bg-background text-foreground overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

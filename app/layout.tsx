import type { Metadata } from 'next'
import { ThemeProvider } from '../src/contexts/ThemeContext'
import SmoothScroll from '../src/components/ui/SmoothScroll'
import '../src/index.css'
import 'remixicon/fonts/remixicon.css'

export const metadata: Metadata = {
  title: 'Caret Design',
  description: 'Caret Design builds websites that elevate your brand. Our student-founded agency specializes in web design, development, branding, and creative digital solutions.',
  keywords: [
    'web design',
    'web development',
    'website design',
    'web design agency',
    'web developer',
    'branding services',
    'SEO optimization',
    'responsive web design',
    'UI/UX design',
    'digital branding',
    'creative agency',
    'graphic design services',
    'web design portfolio',
    'professional website development',
    'mobile-friendly websites',
    'modern web applications',
    'ecommerce website development',
    'custom web solutions',
    'website optimization',
    'caret design agency'
  ],
  authors: [{ name: 'Caret Design' }],
  creator: 'Caret Design',
  publisher: 'Caret Design',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://caretdesign.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Caret Design',
    description: 'Caret Design builds websites that elevate your brand. Our student-founded agency specializes in web design, development, branding, and creative digital solutions.',
    url: 'https://caretdesign.com',
    siteName: 'Caret Design',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Caret Design',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caret Design',
    description: 'Caret Design builds websites that elevate your brand. Our student-founded agency specializes in web design, development, branding, and creative digital solutions.',
    site: '@caretdesign',
    creator: '@caretdesign',
    images: ['/images/og-image.png'],
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
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#0a0a0a',
    'apple-mobile-web-app-title': 'Caret Design',
    'application-name': 'Caret Design',
    'msapplication-TileColor': '#0a0a0a',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Caret Design",
              "alternateName": "Caret Design Agency",
              "description": "Caret Design builds websites that elevate your brand. Our student-founded agency specializes in web design, development, branding, and creative digital solutions.",
              "url": "https://caretdesign.com",
              "logo": "https://caretdesign.com/favicon.svg",
              "image": "https://caretdesign.com/images/og-image.png",
              "sameAs": [
                "https://twitter.com/caretdesign",
                "https://instagram.com/caretdesign",
                "https://x.com/caretdesign"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "caretdesign0@gmail.com",
                "telephone": "+1-718-500-7647",
                "areaServed": "Worldwide"
              },
              "knowsAbout": [
                "Web Design",
                "Web Development",
                "Responsive Design",
                "User Experience Design",
                "Branding",
                "SEO Optimization",
                "Graphic Design",
                "Digital Solutions",
                "Modern Web Development"
              ]
            })
          }}
        />
      </head>
      <body>
        {/* Removed Lenis - using native CSS smooth scroll instead */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

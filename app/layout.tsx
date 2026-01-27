import type { Metadata } from 'next'
import { ThemeProvider } from '../src/contexts/ThemeContext'
import SmoothScroll from '../src/components/ui/SmoothScroll'
import '../src/index.css'
import 'remixicon/fonts/remixicon.css'

export const metadata: Metadata = {
  title: 'waht! | Websites That Make People Say WAHT!',
  description: 'waht! creates stunning, responsive websites and digital experiences. Our student-founded agency specializes in web design, development, branding, and creative digital solutions.',
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
    'waht agency'
  ],
  authors: [{ name: 'waht!' }],
  creator: 'waht!',
  publisher: 'waht!',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://waht.agency'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'waht! | Websites That Make People Say WAHT!',
    description: 'waht! creates stunning, responsive websites and digital experiences. Our student-founded agency specializes in web design, development, branding, and creative digital solutions.',
    url: 'https://waht.agency',
    siteName: 'waht!',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'waht! - Websites That Make People Say WAHT!',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'waht! | Websites That Make People Say WAHT!',
    description: 'waht! creates stunning, responsive websites and digital experiences. Our student-founded agency specializes in web design, development, branding, and creative digital solutions.',
    site: '@wahtagency',
    creator: '@wahtagency',
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
    'apple-mobile-web-app-title': 'waht!',
    'application-name': 'waht!',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "waht!",
              "alternateName": "waht! agency",
              "description": "waht! creates stunning, responsive websites and digital experiences. Our student-founded agency specializes in web design, development, branding, and creative digital solutions.",
              "url": "https://waht.agency",
              "logo": "https://waht.agency/favicon.svg",
              "image": "https://waht.agency/images/og-image.png",
              "sameAs": [
                "https://twitter.com/wahtagency",
                "https://instagram.com/waht.agency",
                "https://x.com/wahtagency"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "hello@waht.agency",
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

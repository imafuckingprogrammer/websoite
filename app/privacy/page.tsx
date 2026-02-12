'use client'

import { useTheme } from '../../src/contexts/ThemeContext'
import Layout from '../../src/components/layout/Layout'

export default function PrivacyPage() {
  const { darkMode } = useTheme()

  return (
    <Layout>
      <section className={`min-h-screen py-32 ${darkMode ? 'bg-neutral-950 text-white' : 'bg-cream-100 text-black'}`}>
        <div className="container-wide max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              Privacy Policy
            </h1>
            <p className={`text-lg ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
              Last Updated: February 11, 2026
            </p>
          </div>

          <div className={`space-y-10 text-base leading-relaxed ${darkMode ? 'text-white/80' : 'text-black/80'}`}>
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>
                Caret Design ("we", "our", or "us") respects your privacy and is committed to protecting your personal data.
                This privacy policy explains how we collect, use, and safeguard your information when you visit our
                website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p className="mb-4">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, company name when you fill out our contact form</li>
                <li><strong>Newsletter Data:</strong> Email address when you subscribe to our newsletter</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website (pages visited, time spent, etc.)</li>
                <li><strong>Device Information:</strong> Browser type, operating system, and device type</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to your inquiries and provide requested services</li>
                <li>To send newsletter updates (only if you've subscribed)</li>
                <li>To improve our website and services</li>
                <li>To communicate about projects and services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Storage & Security</h2>
              <p className="mb-4">
                Your data is stored securely using industry-standard encryption and security measures.
                We use Supabase for data storage, which provides enterprise-grade security including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL/TLS encryption for data in transit</li>
                <li>Encryption at rest for stored data</li>
                <li>Regular security audits and updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Sharing</h2>
              <p className="mb-4">We do not sell your personal information. We may share data with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Third-party services that help us operate (hosting, analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Unsubscribe from our newsletter at any time</li>
                <li>Opt out of non-essential cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
              <p>
                We use essential cookies to ensure our website functions properly. We may also use analytics
                cookies to understand how visitors interact with our site. You can control cookie preferences
                through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy
                practices of these external sites. We encourage you to read their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under 16. We do not knowingly collect personal
                information from children. If you believe we have collected data from a child, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. Changes will be posted on this page with
                an updated revision date. Continued use of our services after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <p>
                For privacy-related questions or to exercise your rights, contact us at{' '}
                <a href="mailto:caretdesign0@gmail.com" className="underline">caretdesign0@gmail.com</a>
              </p>
            </section>

            <section className={`border-t pt-8 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
              <p className="italic opacity-70">
                By using our website and services, you consent to this Privacy Policy.
              </p>
            </section>
          </div>

          <div className={`mt-16 pt-8 border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
            <a href="/" className="inline-flex items-center hover:opacity-70 transition-opacity">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

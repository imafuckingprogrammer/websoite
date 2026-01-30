'use client'

import { useTheme } from '../../src/contexts/ThemeContext'
import Layout from '../../src/components/layout/Layout'

export default function TermsPage() {
  const { darkMode } = useTheme()

  return (
    <Layout>
      <section className={`min-h-screen py-32 ${darkMode ? 'bg-neutral-950 text-white' : 'bg-cream-100 text-black'}`}>
        <div className="container-wide max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              Terms of Service
            </h1>
            <p className={`text-lg ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
              Last Updated: January 27, 2026
            </p>
          </div>

          <div className={`space-y-10 text-base leading-relaxed ${darkMode ? 'text-white/80' : 'text-black/80'}`}>
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p>
                By engaging WAHT! for any services, whether through verbal agreement, email confirmation,
                contract signature, or payment, you accept these terms and conditions. Proceeding with any
                project constitutes acceptance of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Scope of Services</h2>
              <p className="mb-4">Our services include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Website design and development</li>
                <li>Branding and visual identity creation</li>
                <li>Basic SEO setup and optimization</li>
                <li>Website deployment and hosting setup</li>
                <li>Ongoing maintenance (if separately contracted)</li>
              </ul>
              <p className="mt-4">
                The specific scope and deliverables for each project are agreed upon before work begins.
                Any work outside the agreed scope may require a separate agreement and additional fees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. No Guarantees on Results</h2>
              <p className="mb-4">
                All work is delivered on a best-effort basis. While we strive to deliver high-quality websites, we
                make no guarantees regarding:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Search engine rankings or SEO performance</li>
                <li>Website traffic, conversions, or revenue</li>
                <li>Business outcomes resulting from the delivered work</li>
                <li>Compatibility with future third-party updates or platform changes</li>
              </ul>
              <p className="mt-4">
                Websites are delivered as-is upon completion. We build to the best of our ability, but
                results depend on many factors beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Project Delivery & Ownership</h2>
              <p className="mb-4">Upon completion and full payment:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Website files and assets will be transferred to you</li>
                <li>You receive ownership of the final delivered website design and custom code</li>
                <li>We retain the right to display the project in our portfolio</li>
                <li>Third-party assets (fonts, icons, stock images, libraries) remain under their respective licenses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Post-Delivery Support</h2>
              <p className="mb-4">
                We provide a 14-day bug fix period from the date of final delivery. During this period:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We will address bugs that impact core functionality as originally specified</li>
                <li>Issues caused by your modifications, third-party services, or hosting environment are not covered</li>
                <li>Feature additions and design changes are not considered bug fixes</li>
                <li>Extended support or maintenance is available through a separate agreement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Payment Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment terms are specified in individual project agreements</li>
                <li>A deposit is required before work begins</li>
                <li>Final payment is due before project files are delivered</li>
                <li>We reserve the right to pause or suspend work for overdue payments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our total liability shall not exceed the amount paid for the specific project</li>
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>We are not responsible for third-party services, hosting issues, or security breaches after project transfer</li>
                <li>We are not liable for lost revenue, data, or business opportunities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Client Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide timely feedback, content, and materials</li>
                <li>Ensure you have rights to all content you provide us</li>
                <li>Maintain your own backups after project transfer</li>
                <li>Handle hosting, domain registration, and ongoing infrastructure</li>
                <li>Review and approve deliverables in a timely manner</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
              <p>
                Either party may terminate with written notice. Upon termination, payment is due for all
                completed work. We will provide files for work that has been completed and paid for.
                No refunds are issued for completed work.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
              <p>
                These terms are governed by the laws of New York.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
              <p>
                Questions? Email us at <a href="mailto:hello@waht.agency" className="underline">hello@waht.agency</a>
              </p>
            </section>

            <section className={`border-t pt-8 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
              <p className="italic opacity-70">
                By proceeding with any project or service provided by WAHT!, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service.
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

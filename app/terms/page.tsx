'use client'

import { useTheme } from '../../src/contexts/ThemeContext'
import Layout from '../../src/components/layout/Layout'

export default function TermsPage() {
  const { darkMode } = useTheme()

  return (
    <Layout>
      <section
        className={`min-h-screen section-padding ${
          darkMode ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <div className="container-main max-w-4xl">
          <div className="mb-12">
            <h1 className="text-display font-bold tracking-tighter mb-6">
              Terms of Service
            </h1>
            <p className="text-body opacity-70">
              Last Updated: January 13, 2026
            </p>
          </div>

          <div className="space-y-12 text-body leading-relaxed">
            {/* Student-Run Disclaimer */}
            <section>
              <h2 className="text-section font-bold mb-4">
                1. Student-Run Service Disclaimer
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  ZapsApps is a <strong>student-founded and student-operated</strong> web design and development service.
                  By engaging our services, you acknowledge and agree that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    We are a beginner agency with one primary developer who is actively learning and growing in the field
                  </li>
                  <li>
                    We operate with <strong>limited liability</strong> as a student-run business
                  </li>
                  <li>
                    We offer <strong>competitive discounts</strong> in exchange for understanding that we are building our portfolio
                    and expertise
                  </li>
                  <li>
                    Our pricing reflects our status as students and our commitment to providing affordable services while
                    gaining real-world experience
                  </li>
                </ul>
              </div>
            </section>

            {/* Acceptance of Services */}
            <section>
              <h2 className="text-section font-bold mb-4">
                2. Acceptance of Terms
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  By agreeing to work on a project with ZapsApps, whether through verbal agreement, email confirmation,
                  contract signature, or payment, you automatically accept these terms and conditions in their entirety.
                </p>
                <p>
                  <strong>Proceeding with any project constitutes full acceptance of these terms</strong>, including all
                  limitations of liability, disclaimers, and conditions outlined in this document.
                </p>
              </div>
            </section>

            {/* Scope of Services */}
            <section>
              <h2 className="text-section font-bold mb-4">
                3. Scope of Services
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  Our services include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Website design and development</li>
                  <li>Branding and visual identity creation</li>
                  <li>Basic SEO optimization</li>
                  <li>Initial website deployment and setup</li>
                </ul>
                <p>
                  <strong>Our services typically end at project delivery</strong>. Post-delivery support is limited and
                  provided on a best-effort basis only.
                </p>
              </div>
            </section>

            {/* Website Transfer and Ownership */}
            <section>
              <h2 className="text-section font-bold mb-4">
                4. Website Transfer and Post-Transfer Limitations
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  Upon completion and full payment, website files and assets will be transferred to you. However:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Once a website is transferred to your hosting/control</strong>, ZapsApps has <strong>no
                    responsibility</strong> to manage, maintain, update, or troubleshoot the website
                  </li>
                  <li>
                    We are <strong>not responsible</strong> for managing databases, server configurations, hosting issues,
                    security updates, or any technical infrastructure after transfer
                  </li>
                  <li>
                    Any post-transfer changes, updates, or modifications are <strong>not included</strong> unless explicitly
                    agreed upon in a separate maintenance contract
                  </li>
                  <li>
                    You assume full responsibility for backups, security, hosting, domain management, and all ongoing
                    technical maintenance after transfer
                  </li>
                </ul>
              </div>
            </section>

            {/* Bug Fixes and Support */}
            <section>
              <h2 className="text-section font-bold mb-4">
                5. Bug Fixes and Ongoing Support
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  <strong>Limited Bug Fix Period:</strong> We provide a 30-day bug fix period from the date of final delivery.
                  During this period:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    We will address bugs that directly impact core functionality as originally specified in the project scope
                  </li>
                  <li>
                    Bug fixes are provided on a <strong>best-effort basis</strong> and subject to our availability as students
                  </li>
                  <li>
                    Issues caused by your modifications, third-party plugins, hosting environment, or factors outside our
                    control are <strong>not covered</strong>
                  </li>
                </ul>
                <p className="font-semibold">
                  After the 30-day period, or for websites already transferred, you <strong>cannot require us to fix bugs,
                  issues, or problems</strong>. Any support provided beyond this period is entirely at our discretion and may
                  be billed separately.
                </p>
                <p>
                  The <strong>most we can do</strong> is help with initial setup and deployment. Beyond that, ongoing maintenance,
                  hosting issues, database management, and technical support are your responsibility.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-section font-bold mb-4">
                6. Limitation of Liability
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  As a student-run operation, our liability is strictly limited:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Maximum Liability:</strong> Our total liability for any claims related to our services shall not
                    exceed the amount you paid for the specific project in question
                  </li>
                  <li>
                    We are <strong>not liable</strong> for any indirect, incidental, special, consequential, or punitive damages,
                    including but not limited to loss of profits, data, use, or goodwill
                  </li>
                  <li>
                    We are <strong>not responsible</strong> for any damages resulting from:
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Hosting provider issues or downtime</li>
                      <li>Third-party services, plugins, or integrations</li>
                      <li>Security breaches or data loss after website transfer</li>
                      <li>Changes or modifications made by you or third parties</li>
                      <li>Business losses, revenue impacts, or opportunity costs</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>

            {/* No Guarantees */}
            <section>
              <h2 className="text-section font-bold mb-4">
                7. No Guarantees or Warranties
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  While we strive to deliver quality work, as a student-run service:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Services are provided <strong>"AS IS"</strong> without warranties of any kind, express or implied
                  </li>
                  <li>
                    We do not guarantee specific results, rankings, traffic, conversions, or business outcomes
                  </li>
                  <li>
                    We do not guarantee that websites will be error-free, secure, or uninterrupted after delivery
                  </li>
                  <li>
                    We make no warranties regarding compatibility with future browsers, devices, or technology updates
                  </li>
                </ul>
              </div>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-section font-bold mb-4">
                8. Payment Terms
              </h2>
              <div className="space-y-4 opacity-80">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Payment terms will be specified in individual project agreements
                  </li>
                  <li>
                    Typically, we require a deposit upfront (usually 50%) before work begins
                  </li>
                  <li>
                    Final payment is due before website transfer or project delivery
                  </li>
                  <li>
                    We reserve the right to suspend or terminate services for non-payment
                  </li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-section font-bold mb-4">
                9. Intellectual Property
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  Upon full payment:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    You receive ownership of the final delivered website design and custom code created specifically for your
                    project
                  </li>
                  <li>
                    We retain the right to display the project in our portfolio and use it for promotional purposes
                  </li>
                  <li>
                    Third-party assets, plugins, frameworks, and libraries remain under their respective licenses
                  </li>
                  <li>
                    Any reusable code, components, or frameworks we developed remain our property and may be reused in other
                    projects
                  </li>
                </ul>
              </div>
            </section>

            {/* Client Responsibilities */}
            <section>
              <h2 className="text-section font-bold mb-4">
                10. Client Responsibilities
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide timely feedback, content, and materials needed for the project</li>
                  <li>Ensure you have rights to all content, images, and materials you provide</li>
                  <li>Maintain backups of your website after transfer</li>
                  <li>Handle your own hosting, domain, security, and infrastructure management</li>
                  <li>Not hold us responsible for issues arising from your actions or third-party services</li>
                </ul>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-section font-bold mb-4">
                11. Termination
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  Either party may terminate the project with written notice. Upon termination:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You will pay for all work completed up to the termination date</li>
                  <li>We will provide files for work completed and paid for</li>
                  <li>No refunds will be issued for work already completed</li>
                </ul>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-section font-bold mb-4">
                12. Changes to Terms
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting
                  to our website. Your continued use of our services after changes constitutes acceptance of the modified terms.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-section font-bold mb-4">
                13. Governing Law
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  These terms shall be governed by and construed in accordance with the laws of the State of New York,
                  United States, without regard to its conflict of law provisions.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-section font-bold mb-4">
                14. Contact Information
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  If you have questions about these terms, please contact us:
                </p>
                <ul className="list-none pl-0 space-y-2">
                  <li><strong>Email:</strong> zapsapps1@gmail.com</li>
                  <li><strong>Phone:</strong> 718-500-7647</li>
                </ul>
              </div>
            </section>

            {/* Acceptance */}
            <section className={`border-t pt-8 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
              <p className="opacity-80 italic">
                By proceeding with any project or service provided by ZapsApps, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </div>

          {/* Back to Home */}
          <div className="mt-16 pt-8 border-t border-current/10">
            <a
              href="/"
              className={`inline-flex items-center text-body hover:opacity-70 transition-opacity`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

'use client'

import React from 'react'
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        {/* Animated geometric shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-white opacity-3 rounded-full blur-2xl animate-float-medium"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-white opacity-4 rounded-full blur-3xl animate-float-fast"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <div className="animate-slide-up">
            <h1 className="text-display text-white mb-6 font-black tracking-tight drop-shadow-2xl">
              Privacy Policy
            </h1>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-title-3 text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
              How we process and protect your personal data
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="prose prose-lg max-w-none">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 hover-lift">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Introduction</h2>
                  <p className="text-gray-700 mb-6">
                    This privacy policy (hereinafter referred to as the "Policy") informs about how
                    Venue Inc. (hereinafter referred to as the "Controller") processes
                    the personal data of users of the Venue platform in accordance with the GDPR regulation
                    and the Personal Data Protection Act.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Personal Data Controller</h2>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 mb-2"><strong>Venue Inc.</strong></p>
                    <p className="text-gray-700 mb-2">ID: 12345678</p>
                    <p className="text-gray-700 mb-2">Address: Placeholder Address, 110 00 City, State</p>
                    <p className="text-gray-700 mb-2">Email: info@venue.com</p>
                    <p className="text-gray-700">Phone: +1 234 567 890</p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">3. What personal data do we process</h2>
                  <p className="text-gray-700 mb-4">
                    We process the following categories of personal data:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li><strong>Identification data:</strong> name, surname, e-mail address</li>
                    <li><strong>Contact details:</strong> phone, address (for venue owners)</li>
                    <li><strong>Accounting data:</strong> billing address, ID number, VAT number</li>
                    <li><strong>Technical data:</strong> IP address, cookies, browser data</li>
                    <li><strong>Usage data:</strong> visit logs, interaction with the platform</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Purpose of processing</h2>
                  <p className="text-gray-700 mb-4">
                    We process personal data for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>Operation and administration of the Venue platform</li>
                    <li>Registration and management of user accounts</li>
                    <li>Communication with users and customer support</li>
                    <li>Processing payments and invoicing</li>
                    <li>Marketing communication (with consent)</li>
                    <li>Analysis and improvement of our services</li>
                    <li>Fulfillment of legal obligations</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Legal basis for processing</h2>
                  <p className="text-gray-700 mb-4">
                    We process personal data on the basis of:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li><strong>Contract:</strong> for the provision of platform services</li>
                    <li><strong>Legitimate interest:</strong> for the analysis and improvement of services</li>
                    <li><strong>Consent:</strong> for marketing communication</li>
                    <li><strong>Legal obligation:</strong> for accounting and tax obligations</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Transfer to third parties</h2>
                  <p className="text-gray-700 mb-4">
                    We may transfer personal data to:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>Providers of IT services and cloud solutions</li>
                    <li>Payment companies for payment processing</li>
                    <li>Accounting and tax advisors</li>
                    <li>Public authorities (if required by law)</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Processing time</h2>
                  <p className="text-gray-700 mb-4">
                    We process personal data for the duration of:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>The duration of the user account and another 3 years after its cancellation</li>
                    <li>For the period stipulated by legal regulations (e.g. 10 years for accounting documents)</li>
                    <li>Until the withdrawal of consent (for marketing communication)</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Your rights</h2>
                  <p className="text-gray-700 mb-4">
                    As a data subject, you have the right:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>To access personal data</li>
                    <li>To correct inaccurate data</li>
                    <li>To delete data (right to be forgotten)</li>
                    <li>To restrict processing</li>
                    <li>To data portability</li>
                    <li>To object to processing</li>
                    <li>To withdraw consent</li>
                    <li>To file a complaint with the supervisory authority</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Data security</h2>
                  <p className="text-gray-700 mb-6">
                    We implement appropriate technical and organizational measures to protect
                    personal data against unauthorized access, alteration, destruction or
                    loss. We use an encrypted connection (SSL/TLS) and regularly
                    update security measures.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Cookies</h2>
                  <p className="text-gray-700 mb-6">
                    Our website uses cookies to improve functionality and
                    user experience. Detailed information about the use of cookies
                    can be found in our Cookie Policy.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Changes to the policy</h2>
                  <p className="text-gray-700 mb-6">
                    We may update this policy. We will inform you about significant changes
                    by e-mail or through the platform.
                  </p>

                  <div className="bg-gray-50 rounded-xl p-6 mt-8">
                    <p className="text-gray-600 text-sm">
                      This privacy policy is effective from January 1, 2025.
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      For questions regarding the processing of personal data, contact us at:
                      <a href="mailto:info@venue.com" className="text-blue-600 hover:underline ml-1">
                        info@venue.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
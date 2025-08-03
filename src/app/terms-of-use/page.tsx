'use client'

import React from 'react'
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function TermsOfUsePage() {
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
              Terms of Use
            </h1>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-title-3 text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
              Rules and conditions for using the Venue platform
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Introductory provisions</h2>
                  <p className="text-gray-700 mb-6">
                    These terms of use (hereinafter referred to as "Terms") govern the use of the Venue web platform
                    (hereinafter referred to as the "Platform") operated by Venue Inc. (hereinafter referred to as the "Operator").
                    By using the Platform, you express your consent to these Terms.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Description of services</h2>
                  <p className="text-gray-700 mb-6">
                    Venue is an online platform that connects event organizers with venue owners.
                    The platform allows you to publish venue offers, search for suitable event spaces
                    and communicate between users. The operator is not a party to contracts concluded
                    between users.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Registration and user accounts</h2>
                  <p className="text-gray-700 mb-4">
                    Registration is required for full use of the Platform. When registering, it is necessary to provide
                    correct and current information. The user is responsible for securing their login
                    credentials and for all activities carried out under their account.
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>Registration is free for event organizers</li>
                    <li>Venue owners can use premium features for a fee</li>
                    <li>One user can have only one account</li>
                    <li>Accounts may not be transferred to third parties</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Rules of use</h2>
                  <p className="text-gray-700 mb-4">
                    When using the Platform, the user undertakes to:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>Provide true and current information</li>
                    <li>Respect the rights of other users</li>
                    <li>Not to publish inappropriate or illegal content</li>
                    <li>Not to use the Platform for fraudulent activities</li>
                    <li>Comply with copyright and other legal regulations</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Responsibility</h2>
                  <p className="text-gray-700 mb-6">
                    The operator provides the Platform in its available state and makes no warranties
                    regarding its functionality. The operator is not responsible for damages incurred
                    by using the Platform or in connection with contracts concluded between users.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Payments and fees</h2>
                  <p className="text-gray-700 mb-6">
                    Basic use of the Platform is free. Venue owners can use
                    premium features for a monthly fee. All prices are inclusive of VAT.
                    Payments are processed through secure payment gateways.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Termination of service</h2>
                  <p className="text-gray-700 mb-6">
                    The user can terminate the use of the Platform at any time by canceling their account.
                    The operator reserves the right to terminate or suspend a user's access
                    in case of violation of these Terms.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Changes to the terms</h2>
                  <p className="text-gray-700 mb-6">
                    The operator reserves the right to change these Terms. About changes will be
                    users informed by e-mail or through the Platform at least
                    30 days before their entry into force.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Final provisions</h2>
                  <p className="text-gray-700 mb-4">
                    These Terms are governed by the laws of the United States. Any disputes
                    will be resolved before the competent courts of the United States.
                  </p>
                  <p className="text-gray-700 mb-6">
                    If any provision of these Terms becomes invalid, the other
                    provisions remain in effect.
                  </p>

                  <div className="bg-gray-50 rounded-xl p-6 mt-8">
                    <p className="text-gray-600 text-sm">
                      These terms of use are effective from January 1, 2025.
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      Contact: info@venue.com | +1 234 567 890
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
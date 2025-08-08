'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ScrollReveal } from "@/components/ui/scroll-reveal"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How does Venue Fusion work?",
    answer: "Venue Fusion connects event organizers with venue owners. Browse available venues, submit a request, and communicate directly with venue owners."
  },
  {
    question: "Is registration free?",
    answer: "Yes, registration is completely free for event organizers. Venue owners pay only for premium features."
  },
  {
    question: "How can I add my venue?",
    answer: "After registering, click 'Add venue' in the main menu. Fill in all required information including photos and contact details."
  },
  {
    question: "What types of events do you support?",
    answer: "We support a wide range of events including corporate events, team building activities, weddings, private parties, conferences, and more."
  },
  {
    question: "How does booking work?",
    answer: "After you find a suitable venue, send a request to the owner. The venue owner will contact you and you'll arrange the booking details directly."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, Venue Fusion does not charge hidden fees. All costs are transparent and agreed directly with the venue owner."
  },
  {
    question: "Can I cancel my request?",
    answer: "Yes, you can cancel your request any time before the booking is confirmed. After confirmation, follow the cancellation terms agreed with the owner."
  },
  {
    question: "How can I contact support?",
    answer: "You can contact us at info@venuefusion.com. We're here for you on business days from 9:00 to 18:00."
  },
  {
    question: "Can I edit my venue profile?",
    answer: "Yes, as a venue owner you can edit your venue information at any time, including photos, description, price and availability."
  },
  {
    question: "How long does venue approval take?",
    answer: "Approval of a new venue usually takes 24–48 hours. Our team reviews all information and photos before publishing."
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

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
            <h1 className="text-display text-white mb-6 font-black tracking-tight drop-shadow-2xl">Frequently Asked Questions</h1>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-title-3 text-gray-300 mb-12 max-w-2xl mx-auto font-medium">Find answers to common questions about Venue Fusion</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-title-1 text-black mb-6 font-bold">Common questions</h2>
              <p className="text-body text-gray-600 max-w-2xl mx-auto text-lg font-medium">
                Vše co potřebujete vědět o využívání venuefusion
              </p>
            </div>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <ScrollReveal key={index} delay={index * 50}>
                  <div 
                    className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden hover-lift transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {item.question}
                      </h3>
                      {openItems.includes(index) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {openItems.includes(index) && (
                      <div className="px-6 pb-5">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-float-medium" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl sm:text-title-1 text-white mb-6 leading-tight font-bold">Didn't find your answer?</h2>
              <p className="text-lg sm:text-title-3 text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium mb-12">Feel free to contact us — we're happy to help</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
                <a
                  href="mailto:info@venuefusion.com"
                  className="magnetic-button hover-lift px-10 py-4 text-lg font-semibold rounded-2xl bg-white text-black hover:bg-gray-100 transition-all duration-300 shadow-xl"
                >
                  Send email
                </a>
                <a
                  href="tel:+420775654639"
                  className="magnetic-button hover-lift px-10 py-4 text-lg font-semibold rounded-2xl border-2 border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300"
                >
                  Call us
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
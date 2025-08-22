import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { AnimatedBackground, FloatingShapes } from "@/components/ui/animated-background"
import { Check, Star, Zap, TrendingUp, Mail, Target, Users, Search, Send, Sparkles, BarChart3 } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <FloatingShapes />
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <div className="animate-slide-up">
            <h1 className="text-display text-white mb-6 font-black tracking-tight drop-shadow-lg">
              Simple pricing<br />
              for your space
            </h1>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-title-3 text-gray-200 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
              No hidden fees. No commissions on bookings. Just an annual subscription
              for maximum visibility of your space.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-white relative">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-12 hover-lift transition-all duration-300 shadow-xl relative overflow-hidden">
              {/* Subtle background gradient */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-50 to-transparent rounded-full blur-3xl opacity-50" />
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-title-2 text-black font-bold mb-4">
                    Monthly subscription
                  </h2>
                  <div className="mb-4">
                    <span className="text-5xl sm:text-6xl font-black text-black">$70</span>
                    <span className="text-title-3 text-gray-600 ml-2">/ month</span>
                  </div>
                  <p className="text-body text-gray-600 font-medium">
                    Full access to the platform with monthly billing
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-10">
                  {[
                    'Venue profile with photo gallery',
                    'Unlimited inquiries from clients',
                    'Access to event requests',
                    'Basic traffic statistics',
                    'Email support',
                    'Monthly payment (cancel anytime)'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-body text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/add-venue">
                    <Button 
                      variant="default"
                      size="lg" 
                      className="magnetic-button hover-lift w-full sm:w-auto px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg bg-black text-white hover:bg-gray-800"
                    >
                      Add venue
                    </Button>
                  </Link>
                  <Link href="mailto:info@venue.com">
                    <Button 
                      variant="secondary"
                      size="lg" 
                      className="hover-lift w-full sm:w-auto px-12 py-4 text-lg font-semibold rounded-2xl border-2"
                    >
                      Contact sales
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Power-Up Add-ons Section */}
      <section className="py-20 px-6 bg-gray-50 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-title-1 text-black mb-6 font-bold">
                Power-Up Add-ons
              </h2>
              <p className="text-body text-gray-600 max-w-3xl mx-auto text-lg font-medium leading-relaxed">
                One-time purchases to supercharge your venue's visibility and double your bookings
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <ScrollReveal delay={100}>
              <div className="bg-white rounded-3xl p-8 hover-lift transition-all duration-300 shadow-lg border border-gray-100 text-center group h-full flex flex-col relative overflow-hidden">
                {/* Popular badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-title-3 font-bold text-black mb-3">
                  Premium Search Results
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-black text-black">$299</span>
                  <span className="text-sm text-gray-500 block">one-time</span>
                </div>
                <p className="text-callout text-gray-600 leading-relaxed flex-grow mb-6">
                  Appear in top 3 search results for 6 months. <strong className="text-black">3x more visibility</strong> guaranteed.
                </p>
                <div className="space-y-2 text-left mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">Top 3 placement for 6 months</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">Priority in all search filters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">Featured badge on listing</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl">
                  Get Premium Search
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white rounded-3xl p-8 hover-lift transition-all duration-300 shadow-lg border border-gray-100 text-center group h-full flex flex-col relative overflow-hidden">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-title-3 font-bold text-black mb-3">
                  Newsletter Blast
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-black text-black">$199</span>
                  <span className="text-sm text-gray-500 block">one-time</span>
                </div>
                <p className="text-callout text-gray-600 leading-relaxed flex-grow mb-6">
                  Reach <strong className="text-black">10,000+ event planners</strong> with your venue featured in our monthly newsletter.
                </p>
                <div className="space-y-2 text-left mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Featured in newsletter spotlight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Reach 10K+ event planners</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Performance analytics included</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl">
                  Send Newsletter
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-white rounded-3xl p-8 hover-lift transition-all duration-300 shadow-lg border border-gray-100 text-center group h-full flex flex-col relative overflow-hidden">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-title-3 font-bold text-black mb-3">
                  Homepage Spotlight
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-black text-black">$499</span>
                  <span className="text-sm text-gray-500 block">one-time</span>
                </div>
                <p className="text-callout text-gray-600 leading-relaxed flex-grow mb-6">
                  Feature your venue on homepage hero section for 30 days. <strong className="text-black">Maximum exposure</strong>.
                </p>
                <div className="space-y-2 text-left mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-700">Homepage hero placement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-700">30 days of premium visibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-700">Custom spotlight description</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-xl">
                  Get Spotlight
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="bg-white rounded-3xl p-8 hover-lift transition-all duration-300 shadow-lg border border-gray-100 text-center group h-full flex flex-col relative overflow-hidden">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-title-3 font-bold text-black mb-3">
                  Targeted Boost
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-black text-black">$149</span>
                  <span className="text-sm text-gray-500 block">one-time</span>
                </div>
                <p className="text-callout text-gray-600 leading-relaxed flex-grow mb-6">
                  Push your venue to <strong className="text-black">5,000 targeted clients</strong> based on their event preferences.
                </p>
                <div className="space-y-2 text-left mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-700">5K targeted push notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-700">Based on client preferences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-700">Real-time delivery tracking</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-xl">
                  Launch Boost
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <div className="bg-white rounded-3xl p-8 hover-lift transition-all duration-300 shadow-lg border border-gray-100 text-center group h-full flex flex-col relative overflow-hidden">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-title-3 font-bold text-black mb-3">
                  Social Media Package
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-black text-black">$399</span>
                  <span className="text-sm text-gray-500 block">one-time</span>
                </div>
                <p className="text-callout text-gray-600 leading-relaxed flex-grow mb-6">
                  Professional photo shoot + <strong className="text-black">30-day social campaign</strong> across all our channels.
                </p>
                <div className="space-y-2 text-left mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-600" />
                    <span className="text-sm text-gray-700">Professional photo shoot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-600" />
                    <span className="text-sm text-gray-700">30-day social media campaign</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-600" />
                    <span className="text-sm text-gray-700">Instagram, Facebook, LinkedIn</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold rounded-xl">
                  Get Package
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <div className="bg-white rounded-3xl p-8 hover-lift transition-all duration-300 shadow-lg border border-gray-100 text-center group h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  BEST VALUE
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-title-3 font-bold text-black mb-3">
                  Ultimate Visibility Pack
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-black text-black">$999</span>
                  <span className="text-sm text-gray-500 block">one-time</span>
                  <span className="text-xs text-green-600 font-semibold">Save $545!</span>
                </div>
                <p className="text-callout text-gray-600 leading-relaxed flex-grow mb-6">
                  <strong className="text-black">All add-ons included!</strong> Complete marketing package to maximize your bookings.
                </p>
                <div className="space-y-2 text-left mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-gray-700">Everything from all packages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-gray-700">Personal account manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-gray-700">Monthly performance reports</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-xl">
                  Get Ultimate Pack
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Marketing Claims Section */}
          <ScrollReveal delay={700}>
            <div className="bg-gradient-to-br from-black to-gray-800 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6">
                  Join 500+ venues that doubled their bookings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <div className="text-4xl font-black text-green-400 mb-2">2.3x</div>
                    <div className="text-gray-300">Average booking increase</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-blue-400 mb-2">85%</div>
                    <div className="text-gray-300">Client satisfaction rate</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-purple-400 mb-2">48hr</div>
                    <div className="text-gray-300">Average time to first booking</div>
                  </div>
                </div>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  "Within 2 weeks of using Premium Search Results, we went from 3 inquiries per month to 15+ qualified leads. 
                  Our revenue increased by 180% in the first quarter." - Sarah M., Event Space Owner
                </p>
                <Link href="/add-venue">
                  <Button className="bg-white text-black hover:bg-gray-200 font-bold px-8 py-3 rounded-xl">
                    Start Growing Today
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-float-medium" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-title-1 text-white mb-6 leading-tight font-bold">
              Ready to start?
            </h2>
            <p className="text-lg sm:text-title-3 text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium mb-12">
              Add your space to the largest platform of event spaces in the city
              and start getting new clients today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
              <Link href="/add-venue">
                <Button 
                  variant="secondary"
                  size="lg" 
                  className="magnetic-button hover-lift w-full sm:w-auto px-12 py-4 text-lg font-semibold rounded-2xl bg-white text-black hover:bg-gray-100 transition-all duration-300 shadow-xl"
                >
                  Add venue
                </Button>
              </Link>
              <Link href="mailto:info@venue.com">
                <Button 
                  size="lg" 
                  className="hover-lift magnetic-button w-full sm:w-auto px-12 py-4 text-lg font-semibold rounded-2xl border-2 border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300"
                >
                  Contact us
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
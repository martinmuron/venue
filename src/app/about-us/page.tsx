import Image from 'next/image'
import { CheckCircle, Users, Building, Sparkles } from 'lucide-react'

export default function AboutUsPage() {
  const values = [
    {
      icon: CheckCircle,
      title: "Quality",
      description: "We carefully check all spaces and ensure high quality services."
    },
    {
      icon: Users,
      title: "Community",
      description: "We are building a community of people who share a love for nice spaces and events."
    },
    {
      icon: Building,
      title: "Variety",
      description: "We offer a wide selection of spaces for every type of event and budget."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "We are constantly improving our services and technologies for a better user experience."
    }
  ]

  const stats = [
    { number: "500+", label: "Spaces in the database" },
    { number: "1000+", label: "Satisfied clients" },
    { number: "50+", label: "Cities across the country" },
    { number: "24/7", label: "Support" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            About Us
          </h1>
          <p className="text-xl text-center text-gray-300 max-w-2xl mx-auto">
            Connecting event organizers with venue owners since 2023
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600">
              We simplify the search and booking of spaces for your events
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-16">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Venue was created out of the need to simplify the process of finding and booking spaces for various types of events.
              We realized how challenging it can be to find the right space for a corporate event, wedding,
              teambuilding or a private celebration.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our vision is to create the largest and highest quality database of spaces in the country,
              where event organizers meet with venue owners in a friendly and professional environment.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that every event deserves the perfect space, and we are here
              to help you find it.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Venue in numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide us in building Venue
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Team
              </h2>
              <p className="text-xl text-gray-600">
                The people behind Venue
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Founder */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">JN</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Jan Novák
                </h3>
                <p className="text-blue-600 font-semibold mb-4">
                  Founder & CEO
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Jan has more than 10 years of experience in event management
                  and technology startups. He decided to create Venue after
                  experiencing the frustration of finding suitable spaces for corporate events.
                </p>
              </div>

              {/* Co-founder */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">MK</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Marie Krásná
                </h3>
                <p className="text-blue-600 font-semibold mb-4">
                  Co-founder & CTO
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Marie is an experienced developer with a love for clean code and user
                  experience. She is responsible for the technical side of Venue and is constantly
                  improving the platform for our users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to know more?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Do not hesitate to contact us with any question or suggestion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Contact us
            </a>
            <a
              href="mailto:info@venue.com"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200"
            >
              Write an e-mail
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
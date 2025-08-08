import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const venuesData = [
  {
    name: "The Grand Ballroom",
    description: "Elegant ballroom perfect for large social events and weddings. Capacity for up to 300 guests with professional lighting and sound systems.",
    address: "1247 Fifth Avenue, New York, NY 10029",
    capacitySeated: 200,
    capacityStanding: 300,
    venueType: "Ballroom",
    amenities: ["Valet Parking", "Professional Sound", "Lighting", "In-house Catering", "Full Bar"],
    contactEmail: "info@grandballroom.com",
    priceMin: 5000,
    priceMax: 12000,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=800&h=600&fit=crop"
    ]
  },
  {
    name: "Brooklyn Industrial Loft",
    description: "Modern industrial space with high ceilings and large windows. Perfect for corporate events and product launches.",
    address: "87 Richardson Street, Brooklyn, NY 11211",
    capacitySeated: 80,
    capacityStanding: 150,
    venueType: "Loft",
    amenities: ["Wi-Fi", "Projector", "Air Conditioning", "Street Parking"],
    contactEmail: "booking@brooklynloft.com",
    priceMin: 2500,
    priceMax: 6000,
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
    ]
  },
  {
    name: "Rooftop Garden Manhattan",
    description: "Stunning rooftop terrace with Manhattan skyline views. Perfect for summer events and networking gatherings.",
    address: "432 Park Avenue, New York, NY 10016",
    capacitySeated: 60,
    capacityStanding: 100,
    venueType: "Rooftop",
    amenities: ["Skyline Views", "Outdoor Space", "Bar", "BBQ Grill"],
    contactEmail: "events@rooftopgarden.com",
    priceMin: 4000,
    priceMax: 8500,
    images: [
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop"
    ]
  },
  {
    name: "SoHo Art Gallery",
    description: "Contemporary art gallery with white walls and modern design. Ideal for exhibitions and cultural events.",
    address: "156 Spring Street, New York, NY 10012",
    capacitySeated: 40,
    capacityStanding: 80,
    venueType: "Gallery",
    amenities: ["Exhibition System", "Professional Lighting", "Wi-Fi", "Climate Control"],
    contactEmail: "gallery@sohoart.com",
    priceMin: 2000,
    priceMax: 5000,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
    ]
  },
  {
    name: "Midtown Conference Center",
    description: "State-of-the-art conference center with the latest technology. Perfect for business meetings and seminars.",
    address: "350 Fifth Avenue, New York, NY 10118",
    capacitySeated: 120,
    capacityStanding: 180,
    venueType: "Conference",
    amenities: ["AV Equipment", "High-Speed Wi-Fi", "Catering Kitchen", "Valet Parking", "Climate Control"],
    contactEmail: "booking@midtownconf.com",
    priceMin: 3500,
    priceMax: 7000,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&h=600&fit=crop"
    ]
  },
  {
    name: "Historic Mansion Upper East Side",
    description: "19th-century mansion with beautiful gardens. Exclusive venue for weddings and ceremonial events.",
    address: "1234 Madison Avenue, New York, NY 10128",
    capacitySeated: 80,
    capacityStanding: 120,
    venueType: "Mansion",
    amenities: ["Private Gardens", "Historic Architecture", "Valet Parking", "Full Catering"],
    contactEmail: "events@historicmansion.com",
    priceMin: 8000,
    priceMax: 15000,
    images: [
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1521334884684-d80222895322?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop"
    ]
  },
  {
    name: "Chelsea Photography Studio",
    description: "Bright studio with professional equipment for photo and video productions.",
    address: "245 West 29th Street, New York, NY 10001",
    capacitySeated: 30,
    capacityStanding: 50,
    venueType: "Studio",
    amenities: ["Professional Lighting", "Cyclorama Wall", "Wi-Fi", "Equipment Rental"],
    contactEmail: "studio@chelseaphoto.com",
    priceMin: 1500,
    priceMax: 3500,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&h=600&fit=crop"
    ]
  }
]

// Restaurant/Venue placeholder images pool
const imagePool = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1521334884684-d80222895322?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop"
]

// Generate more venues programmatically
function generateVenues() {
  const venues = [...venuesData]
  
  const types = ["Restaurant", "Bar", "Club", "Hotel", "Theater", "Museum", "Garden", "Warehouse", "Bistro", "Cafe"]
  const cities = [
    { name: "New York", state: "NY", streets: ["Broadway", "Park Avenue", "Madison Avenue", "Lexington Avenue", "Fifth Avenue"] },
    { name: "Los Angeles", state: "CA", streets: ["Sunset Boulevard", "Hollywood Boulevard", "Melrose Avenue", "Beverly Drive", "Rodeo Drive"] },
    { name: "Chicago", state: "IL", streets: ["Michigan Avenue", "State Street", "Lake Shore Drive", "Rush Street", "Division Street"] },
    { name: "Miami", state: "FL", streets: ["Ocean Drive", "Collins Avenue", "Lincoln Road", "Washington Avenue", "Biscayne Boulevard"] },
    { name: "San Francisco", state: "CA", streets: ["Market Street", "Union Street", "Fillmore Street", "Valencia Street", "Mission Street"] }
  ]
  const amenitiesPool = ["Wi-Fi", "Valet Parking", "Air Conditioning", "Full Bar", "Catering", "AV Equipment", "Outdoor Seating", "Private Dining", "VIP Area", "Coat Check"]
  
  for (let i = venues.length; i < 50; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const city = cities[Math.floor(Math.random() * cities.length)]
    const street = city.streets[Math.floor(Math.random() * city.streets.length)]
    const capacity = 50 + Math.floor(Math.random() * 200)
    const streetNumber = Math.floor(Math.random() * 9999) + 1
    
    // Get random images for this venue
    const shuffledImages = [...imagePool].sort(() => Math.random() - 0.5)
    const venueImages = shuffledImages.slice(0, 2 + Math.floor(Math.random() * 3)) // 2-4 images per venue
    
    venues.push({
      name: `${type} ${city.name} ${i - venues.length + 1}`,
      description: `Professional ${type.toLowerCase()} in the heart of ${city.name}. Modern amenities and excellent service for your events.`,
      address: `${streetNumber} ${street}, ${city.name}, ${city.state}`,
      capacitySeated: Math.floor(capacity * 0.7),
      capacityStanding: capacity,
      venueType: type,
      amenities: amenitiesPool.slice(0, 3 + Math.floor(Math.random() * 4)),
      contactEmail: `info@${type.toLowerCase()}${i}.com`,
      priceMin: 1000 + Math.floor(Math.random() * 3000),
      priceMax: 2500 + Math.floor(Math.random() * 7000),
      images: venueImages
    })
  }
  
  return venues
}

const eventRequestsData = [
  {
    title: "Corporate Holiday Party 2024",
    description: "Looking for a venue for our company holiday party. Expecting 80-100 guests.",
    eventType: "Corporate Event",
    guestCount: 90,
    budgetRange: "5000-8500",
    locationPreference: "Manhattan",
    requirements: "Catering options, parking, AV equipment",
    contactName: "Sarah Johnson",
    contactEmail: "sarah.johnson@company.com",
    contactPhone: "+1 (555) 123-4567"
  },
  {
    title: "Wedding Reception - June 2024",
    description: "Wedding reception for 120 guests. Looking for a venue with outdoor space options.",
    eventType: "Wedding",
    guestCount: 120,
    budgetRange: "10000-15000",
    locationPreference: "New York",
    requirements: "Garden or terrace, catering, guest parking",
    contactName: "Michael Davis",
    contactEmail: "michael.davis@email.com"
  },
  {
    title: "Tech Professional Conference",
    description: "Full-day conference for IT specialists. We need modern equipment and facilities.",
    eventType: "Conference",
    guestCount: 150,
    budgetRange: "8000-12000",
    locationPreference: "Midtown",
    requirements: "Projector, microphones, Wi-Fi, catering for breaks",
    contactName: "David Wilson",
    contactEmail: "david.wilson@tech.com",
    contactPhone: "+1 (555) 789-0123"
  }
]

// Generate more event requests
function generateEventRequests() {
  const requests = [...eventRequestsData]
  
  const eventTypes = ["Corporate Event", "Wedding", "Birthday Party", "Conference", "Workshop", "Networking", "Product Launch", "Charity Fundraiser", "Anniversary", "Baby Shower"]
  const names = ["John Smith", "Emily Johnson", "Michael Brown", "Sarah Davis", "David Wilson", "Lisa Anderson", "Robert Taylor", "Jennifer Martinez", "William Garcia", "Ashley Rodriguez"]
  const locations = ["Manhattan", "Brooklyn", "Los Angeles", "Chicago", "Miami", "San Francisco"]
  
  for (let i = requests.length; i < 20; i++) {
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    const name = names[Math.floor(Math.random() * names.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    const guestCount = 20 + Math.floor(Math.random() * 180)
    const minBudget = 1000 + Math.floor(Math.random() * 5000)
    const maxBudget = minBudget + 2000 + Math.floor(Math.random() * 8000)
    
    requests.push({
      title: `${eventType} - ${new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('en-US')}`,
      description: `We are organizing a ${eventType.toLowerCase()} and looking for a suitable venue for ${guestCount} guests.`,
      eventType,
      guestCount,
      budgetRange: `${minBudget}-${maxBudget}`,
      locationPreference: location,
      requirements: "Wi-Fi, catering options, parking",
      contactName: name,
      contactEmail: `${name.toLowerCase().replace(' ', '.')}@email.com`,
      contactPhone: Math.random() > 0.5 ? `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : undefined
    })
  }
  
  return requests
}

const blogPostsData = [
  {
    title: "How to Choose the Perfect Venue for Your Corporate Event",
    slug: "how-to-choose-perfect-venue-corporate-event",
    content: `<h2>Essential Selection Criteria</h2>
    <p>When choosing a venue for your corporate event, it's important to consider several key factors:</p>
    <ul>
    <li>Capacity and layout of the space</li>
    <li>Technical equipment and facilities</li>
    <li>Accessibility and parking</li>
    <li>Catering options and restrictions</li>
    </ul>
    <h2>Tips for a Successful Event</h2>
    <p>Don't forget important details like lighting, acoustics, and the overall atmosphere of the venue.</p>`,
    excerpt: "A complete guide to selecting the ideal venue for your corporate event. Practical tips and recommendations.",
    published: true,
    status: "published",
    tags: ["corporate events", "tips", "venue selection"]
  },
  {
    title: "Wedding Planning Trends for 2024",
    slug: "wedding-planning-trends-2024",
    content: `<h2>Latest Trends</h2>
    <p>2024 brings exciting trends in wedding planning:</p>
    <ul>
    <li>Sustainable weddings</li>
    <li>Intimate ceremonies</li>
    <li>Outdoor venues</li>
    <li>Local vendors and suppliers</li>
    </ul>
    <p>Couples are choosing venues that reflect their personality more than ever before.</p>`,
    excerpt: "Discover the latest trends in wedding planning and find inspiration for your big day.",
    published: true,
    status: "published",
    tags: ["weddings", "trends", "planning"]
  },
  {
    title: "Conference Organization: A Practical Guide",
    slug: "conference-organization-practical-guide",
    content: `<h2>Conference Preparation</h2>
    <p>A successful conference requires careful planning and proper venue selection.</p>
    <h3>Key Steps:</h3>
    <ol>
    <li>Define goals and target audience</li>
    <li>Select appropriate date and time</li>
    <li>Book venue with suitable facilities</li>
    <li>Organize catering and break services</li>
    </ol>`,
    excerpt: "Complete guide for organizing successful conferences from start to finish.",
    published: true,
    status: "published",
    tags: ["conferences", "organization", "business"]
  }
]

// Generate more blog posts
function generateBlogPosts() {
  const posts = [...blogPostsData]
  
  const topics = [
    "Tips for Hosting the Perfect Party",
    "How to Organize a Networking Event",
    "Choosing the Right Catering for Your Event",
    "Venue Decoration Ideas for Different Occasions",
    "Essential AV Equipment for Events",
    "How to Negotiate the Best Venue Price",
    "Seasonal Events and Their Unique Requirements"
  ]
  
  for (let i = posts.length; i < 10; i++) {
    const topic = topics[i - posts.length] || `Event Planning Guide - Part ${i}`
    const slug = topic.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
    
    posts.push({
      title: topic,
      slug: `${slug}-${i}`,
      content: `<h2>Introduction</h2><p>In this article, we'll explore ${topic.toLowerCase()}.</p><h2>Key Points</h2><p>Practical tips and recommendations for your next event.</p>`,
      excerpt: `Practical advice and tips regarding ${topic.toLowerCase()}.`,
      published: true,
      status: "published",
      tags: ["events", "tips", "planning"]
    })
  }
  
  return posts
}

async function main() {
  console.log("🌱 Starting comprehensive seed...")

  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 12)
    const adminUser = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@venuefusion.cz",
        password: hashedPassword,
        role: "admin",
        phone: "+420 777 888 999"
      }
    })

    console.log("✅ Admin user created")

    // Generate and create venues
    const venues = generateVenues()
    let venueCount = 0

    for (const venueData of venues) {
      try {
        const slug = generateSlug(venueData.name)
        const existingVenue = await prisma.venue.findUnique({ where: { slug } })
        
        if (!existingVenue) {
          await prisma.venue.create({
            data: {
              ...venueData,
              slug,
              published: true,
              status: "active",
              managerId: adminUser.id
            }
          })
          venueCount++
        }
      } catch (error) {
        console.log(`⚠️ Skipping venue ${venueData.name}:`, error.message)
      }
    }

    console.log(`✅ Created ${venueCount} venues`)

    // Generate and create event requests  
    const eventRequests = generateEventRequests()
    let requestCount = 0

    for (const requestData of eventRequests) {
      try {
        await prisma.eventRequest.create({
          data: {
            ...requestData,
            userId: adminUser.id,
            status: "active",
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            eventDate: new Date(2024, Math.floor(Math.random() * 6) + 6, Math.floor(Math.random() * 28) + 1) // Random date in next 6 months
          }
        })
        requestCount++
      } catch (error) {
        console.log(`⚠️ Skipping request:`, error.message)
      }
    }

    console.log(`✅ Created ${requestCount} event requests`)

    // Generate and create blog posts
    const blogPosts = generateBlogPosts()
    let postCount = 0

    for (const postData of blogPosts) {
      try {
        const existingPost = await prisma.blogPost.findUnique({ where: { slug: postData.slug } })
        
        if (!existingPost) {
          await prisma.blogPost.create({
            data: {
              ...postData,
              authorId: adminUser.id
            }
          })
          postCount++
        }
      } catch (error) {
        console.log(`⚠️ Skipping blog post ${postData.title}:`, error.message)
      }
    }

    console.log(`✅ Created ${postCount} blog posts`)

    console.log("🎉 Comprehensive seed completed!")
    console.log(`📊 Summary:`)
    console.log(`   - Admin user: 1`)
    console.log(`   - Venues: ${venueCount}`)
    console.log(`   - Event requests: ${requestCount}`)
    console.log(`   - Blog posts: ${postCount}`)

  } catch (error) {
    console.error("❌ Seed failed:", error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
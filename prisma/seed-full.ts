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
  
  const types = ["Restaurant", "Bar", "Club", "Hotel", "Theater", "Museum", "Garden", "Warehouse", "Bistro", "Cafe", "Ballroom", "Loft", "Rooftop", "Gallery", "Conference Center", "Mansion", "Studio", "Winery", "Resort", "Country Club"]
  const cities = [
    { name: "New York", state: "NY", streets: ["Broadway", "Park Avenue", "Madison Avenue", "Lexington Avenue", "Fifth Avenue"] },
    { name: "Los Angeles", state: "CA", streets: ["Sunset Boulevard", "Hollywood Boulevard", "Melrose Avenue", "Beverly Drive", "Rodeo Drive"] },
    { name: "Chicago", state: "IL", streets: ["Michigan Avenue", "State Street", "Lake Shore Drive", "Rush Street", "Division Street"] },
    { name: "Miami", state: "FL", streets: ["Ocean Drive", "Collins Avenue", "Lincoln Road", "Washington Avenue", "Biscayne Boulevard"] },
    { name: "San Francisco", state: "CA", streets: ["Market Street", "Union Street", "Fillmore Street", "Valencia Street", "Mission Street"] },
    { name: "Houston", state: "TX", streets: ["Main Street", "Westheimer Road", "Richmond Avenue", "Memorial Drive", "Allen Parkway"] },
    { name: "Phoenix", state: "AZ", streets: ["Central Avenue", "Camelback Road", "Indian School Road", "Thomas Road", "Van Buren Street"] },
    { name: "Philadelphia", state: "PA", streets: ["Broad Street", "Market Street", "Chestnut Street", "Walnut Street", "South Street"] },
    { name: "San Antonio", state: "TX", streets: ["River Walk", "Broadway", "San Pedro Avenue", "Fredericksburg Road", "Blanco Road"] },
    { name: "San Diego", state: "CA", streets: ["Harbor Drive", "Fifth Avenue", "University Avenue", "El Cajon Boulevard", "Adams Avenue"] },
    { name: "Dallas", state: "TX", streets: ["Main Street", "Commerce Street", "Elm Street", "McKinney Avenue", "Greenville Avenue"] },
    { name: "San Jose", state: "CA", streets: ["First Street", "Santa Clara Street", "Market Street", "The Alameda", "Stevens Creek Boulevard"] },
    { name: "Austin", state: "TX", streets: ["Congress Avenue", "South Lamar", "East Sixth Street", "Rainey Street", "Red River Street"] },
    { name: "Jacksonville", state: "FL", streets: ["Bay Street", "Forsyth Street", "Main Street", "Ocean Street", "Atlantic Boulevard"] },
    { name: "Fort Worth", state: "TX", streets: ["Main Street", "Commerce Street", "Houston Street", "Camp Bowie Boulevard", "University Drive"] },
    { name: "Columbus", state: "OH", streets: ["High Street", "Broad Street", "Main Street", "Long Street", "Spring Street"] },
    { name: "Indianapolis", state: "IN", streets: ["Meridian Street", "Washington Street", "Massachusetts Avenue", "Monument Circle", "Virginia Avenue"] },
    { name: "Charlotte", state: "NC", streets: ["Trade Street", "Tryon Street", "Fifth Street", "College Street", "Church Street"] },
    { name: "Seattle", state: "WA", streets: ["Pine Street", "Pike Street", "First Avenue", "Capitol Hill", "Queen Anne Avenue"] },
    { name: "Denver", state: "CO", streets: ["16th Street", "Colfax Avenue", "Broadway", "Speer Boulevard", "Federal Boulevard"] },
    { name: "Washington", state: "DC", streets: ["Pennsylvania Avenue", "Connecticut Avenue", "Massachusetts Avenue", "K Street", "M Street"] },
    { name: "Boston", state: "MA", streets: ["Boylston Street", "Newbury Street", "Commonwealth Avenue", "Beacon Street", "Washington Street"] },
    { name: "El Paso", state: "TX", streets: ["Mesa Street", "Montana Avenue", "Alameda Avenue", "Paisano Drive", "Dyer Street"] },
    { name: "Detroit", state: "MI", streets: ["Woodward Avenue", "Jefferson Avenue", "Grand Boulevard", "Michigan Avenue", "Fort Street"] },
    { name: "Nashville", state: "TN", streets: ["Broadway", "Music Row", "Demonbreun Street", "Division Street", "Church Street"] },
    { name: "Portland", state: "OR", streets: ["Burnside Street", "Hawthorne Boulevard", "Division Street", "Alberta Street", "Mississippi Avenue"] },
    { name: "Oklahoma City", state: "OK", streets: ["Broadway", "Main Street", "Robinson Avenue", "Walker Avenue", "Hudson Avenue"] },
    { name: "Las Vegas", state: "NV", streets: ["Las Vegas Boulevard", "Fremont Street", "Charleston Boulevard", "Flamingo Road", "Tropicana Avenue"] },
    { name: "Louisville", state: "KY", streets: ["Fourth Street", "Broadway", "Main Street", "Market Street", "Bardstown Road"] },
    { name: "Baltimore", state: "MD", streets: ["Charles Street", "Baltimore Street", "Pratt Street", "Light Street", "Calvert Street"] },
    { name: "Milwaukee", state: "WI", streets: ["Water Street", "Wisconsin Avenue", "North Avenue", "Brady Street", "Kinnickinnic Avenue"] },
    { name: "Albuquerque", state: "NM", streets: ["Central Avenue", "Fourth Street", "San Mateo Boulevard", "Montgomery Boulevard", "Coors Boulevard"] },
    { name: "Tucson", state: "AZ", streets: ["Stone Avenue", "Campbell Avenue", "Oracle Road", "Speedway Boulevard", "Broadway Boulevard"] },
    { name: "Fresno", state: "CA", streets: ["Blackstone Avenue", "Shaw Avenue", "Kings Canyon Road", "Fresno Street", "Van Ness Avenue"] },
    { name: "Sacramento", state: "CA", streets: ["Capitol Avenue", "J Street", "K Street", "L Street", "Broadway"] },
    { name: "Mesa", state: "AZ", streets: ["Main Street", "Broadway Road", "Southern Avenue", "McKellips Road", "University Drive"] }
  ]
  const amenitiesPool = ["Wi-Fi", "Valet Parking", "Air Conditioning", "Full Bar", "Catering", "AV Equipment", "Outdoor Seating", "Private Dining", "VIP Area", "Coat Check"]
  
  for (let i = venues.length; i < 70; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const city = cities[Math.floor(Math.random() * cities.length)]
    const street = city.streets[Math.floor(Math.random() * city.streets.length)]
    const capacity = 50 + Math.floor(Math.random() * 200)
    const streetNumber = Math.floor(Math.random() * 9999) + 1
    
    // Get random images for this venue
    const shuffledImages = [...imagePool].sort(() => Math.random() - 0.5)
    const venueImages = shuffledImages.slice(0, 2 + Math.floor(Math.random() * 3)) // 2-4 images per venue
    
    venues.push({
      name: `${city.name} ${type}`,
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
    title: "Ultimate Guide to Planning the Perfect Corporate Holiday Party",
    slug: "ultimate-guide-corporate-holiday-party",
    content: `<h2>Setting the Right Atmosphere</h2>
    <p>Corporate holiday parties are more than just celebrations—they're opportunities to strengthen team bonds and show appreciation for your employees' hard work throughout the year.</p>
    <h2>Venue Selection Tips</h2>
    <ul>
    <li>Choose a venue that reflects your company culture</li>
    <li>Ensure adequate space for mingling and activities</li>
    <li>Consider venues with built-in entertainment options</li>
    <li>Look for flexible spaces that can accommodate different group sizes</li>
    </ul>
    <h2>Essential Elements for Success</h2>
    <p>Don't forget about catering preferences, accessibility, and creating memorable experiences that your team will talk about all year long.</p>`,
    excerpt: "Everything you need to know about planning a corporate holiday party that your employees will love and remember.",
    published: true,
    status: "published",
    tags: ["corporate events", "holiday parties", "team building"],
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop"
  },
  {
    title: "5 Stunning Wedding Venue Ideas That Will Take Your Breath Away",
    slug: "stunning-wedding-venue-ideas",
    content: `<h2>Beyond Traditional Wedding Venues</h2>
    <p>Your wedding day deserves a venue as unique as your love story. Here are five breathtaking venue types that will create unforgettable memories.</p>
    <h2>Historic Mansions & Estates</h2>
    <p>Step into elegance with grand ballrooms, ornate architecture, and sprawling gardens that provide the perfect backdrop for both intimate ceremonies and grand receptions.</p>
    <h2>Waterfront & Beach Locations</h2>
    <p>Exchange vows with the sound of waves as your soundtrack. Waterfront venues offer natural beauty and romantic sunsets that no decoration can match.</p>
    <h2>Urban Rooftop Gardens</h2>
    <p>City skylines create dramatic backdrops while rooftop gardens provide intimacy and charm in the heart of the urban landscape.</p>`,
    excerpt: "Discover five unique wedding venue types that will make your special day absolutely unforgettable.",
    published: true,
    status: "published",
    tags: ["wedding", "venues", "inspiration"],
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=400&fit=crop"
  },
  {
    title: "How to Host an Epic Birthday Celebration Your Guests Will Never Forget",
    slug: "epic-birthday-celebration-guide",
    content: `<h2>Making Birthdays Special at Any Age</h2>
    <p>Whether you're planning a milestone birthday or just want to make someone feel extra special, the right venue and planning can turn any birthday into an epic celebration.</p>
    <h2>Venue Ideas by Age Group</h2>
    <ul>
    <li><strong>Kids (5-12):</strong> Interactive venues with activities, outdoor spaces for games</li>
    <li><strong>Teens (13-17):</strong> Trendy spaces with photo opportunities, music-friendly venues</li>
    <li><strong>Adults (18+):</strong> Restaurants with private dining, rooftop bars, unique experiences</li>
    <li><strong>Milestone Birthdays:</strong> Elegant ballrooms, historic venues, destination locations</li>
    </ul>
    <h2>Personal Touches That Matter</h2>
    <p>Custom decorations, favorite foods, and meaningful activities transform any space into a personal celebration that reflects the birthday person's personality.</p>`,
    excerpt: "Create unforgettable birthday memories with the perfect venue and thoughtful planning tips for any age.",
    published: true,
    status: "published",
    tags: ["birthday parties", "celebration", "party planning"],
    imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=400&fit=crop"
  },
  {
    title: "Small Wedding, Big Impact: Intimate Venue Ideas for 50 Guests or Less",
    slug: "small-wedding-intimate-venues",
    content: `<h2>The Beauty of Intimate Weddings</h2>
    <p>Intimate weddings are more than a trend—they're a return to what matters most: celebrating your love with the people who matter most to you.</p>
    <h2>Perfect Intimate Venue Types</h2>
    <ul>
    <li>Private dining rooms in restaurants</li>
    <li>Boutique hotels with cozy spaces</li>
    <li>Art galleries and small museums</li>
    <li>Garden spaces and conservatories</li>
    <li>Historic homes and bed & breakfasts</li>
    </ul>
    <h2>Maximizing Your Budget</h2>
    <p>With fewer guests, you can invest in higher-quality elements like premium catering, luxury flowers, and personalized details that make every guest feel special.</p>
    <h2>Creating Meaningful Moments</h2>
    <p>Intimate venues allow for personal interactions, heartfelt toasts, and the kind of meaningful connections that larger weddings sometimes miss.</p>`,
    excerpt: "Discover why intimate weddings are perfect and find the ideal small venue for your special day.",
    published: true,
    status: "published",
    tags: ["small weddings", "intimate venues", "wedding planning"],
    imageUrl: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=400&fit=crop"
  },
  {
    title: "Company Anniversary Celebrations: Making Your Business Milestones Memorable",
    slug: "company-anniversary-celebrations",
    content: `<h2>Celebrating Business Success</h2>
    <p>Company anniversaries are perfect opportunities to celebrate achievements, honor employees, and strengthen relationships with clients and partners.</p>
    <h2>Venue Selection for Different Anniversary Types</h2>
    <ul>
    <li><strong>5-10 Years:</strong> Casual venues that reflect growth and potential</li>
    <li><strong>10-25 Years:</strong> Professional spaces that showcase stability and success</li>
    <li><strong>25+ Years:</strong> Prestigious venues that honor legacy and achievement</li>
    </ul>
    <h2>Essential Elements for Success</h2>
    <p>Include company history displays, employee recognition segments, and networking opportunities. Consider venues with flexible spaces for presentations and socializing.</p>
    <h2>Memorable Touches</h2>
    <p>Timeline displays, founder stories, and future vision presentations create emotional connections and inspire continued loyalty from employees and partners.</p>`,
    excerpt: "Learn how to plan meaningful company anniversary celebrations that honor your business journey and inspire future success.",
    published: true,
    status: "published",
    tags: ["corporate events", "anniversaries", "business celebrations"],
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop"
  },
  {
    title: "Sweet 16 to Sweet 60: Age-Appropriate Birthday Venue Ideas",
    slug: "age-appropriate-birthday-venues",
    content: `<h2>Tailoring Celebrations to Life Stages</h2>
    <p>Every age deserves a celebration that feels just right. Here's how to choose venues that match the birthday person's stage of life and interests.</p>
    <h2>Teen Celebrations (13-19)</h2>
    <p>Look for venues with Instagram-worthy backdrops, music-friendly policies, and space for activities like dancing, games, or themed experiences.</p>
    <h2>Young Adult Parties (20-35)</h2>
    <p>Consider trendy restaurants, rooftop bars, escape rooms, or venues that offer unique experiences like cooking classes or wine tastings.</p>
    <h2>Milestone Birthdays (40, 50, 60+)</h2>
    <p>Elegant spaces like private dining rooms, country clubs, or historic venues provide the sophistication that milestone birthdays deserve.</p>
    <h2>Multi-Generational Considerations</h2>
    <p>When multiple generations will attend, choose venues with varied seating options, accessible facilities, and flexible entertainment possibilities.</p>`,
    excerpt: "Find the perfect birthday venue for any age with ideas that match different life stages and preferences.",
    published: true,
    status: "published",
    tags: ["birthday parties", "age-appropriate", "milestone celebrations"],
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop"
  },
  {
    title: "Wedding Reception Venues: Indoor vs Outdoor - Making the Right Choice",
    slug: "indoor-vs-outdoor-wedding-venues",
    content: `<h2>The Great Venue Debate</h2>
    <p>Choosing between indoor and outdoor wedding reception venues is one of the biggest decisions couples face. Each option offers unique advantages and considerations.</p>
    <h2>Indoor Reception Advantages</h2>
    <ul>
    <li>Weather protection and climate control</li>
    <li>Built-in lighting and electrical systems</li>
    <li>Established vendor relationships</li>
    <li>Year-round availability</li>
    <li>Predictable logistics and setup</li>
    </ul>
    <h2>Outdoor Reception Magic</h2>
    <ul>
    <li>Natural beauty and stunning backdrops</li>
    <li>Unique photo opportunities</li>
    <li>More space and flexibility</li>
    <li>Often more budget-friendly</li>
    <li>Connection with nature</li>
    </ul>
    <h2>Hybrid Solutions</h2>
    <p>Consider venues that offer both options or covered outdoor spaces that provide the best of both worlds.</p>`,
    excerpt: "Explore the pros and cons of indoor versus outdoor wedding reception venues to make the perfect choice for your big day.",
    published: true,
    status: "published",
    tags: ["wedding venues", "indoor vs outdoor", "reception planning"],
    imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=400&fit=crop"
  },
  {
    title: "Corporate Team Building Events: Venues That Bring Teams Together",
    slug: "corporate-team-building-venues",
    content: `<h2>Beyond the Conference Room</h2>
    <p>Effective team building requires venues that inspire collaboration, creativity, and connection. The right space can transform your team dynamics.</p>
    <h2>Activity-Based Venues</h2>
    <ul>
    <li>Escape rooms for problem-solving challenges</li>
    <li>Cooking schools for collaborative experiences</li>
    <li>Adventure parks for outdoor team challenges</li>
    <li>Art studios for creative team projects</li>
    </ul>
    <h2>Retreat-Style Locations</h2>
    <p>Consider venues away from the office environment—mountain lodges, lakeside resorts, or countryside venues that remove daily distractions.</p>
    <h2>Urban Alternatives</h2>
    <p>Museums, galleries, and unique city venues offer inspiring environments without requiring travel, making them perfect for shorter team-building sessions.</p>
    <h2>Measuring Success</h2>
    <p>The best team-building venues provide flexibility for both structured activities and informal networking opportunities.</p>`,
    excerpt: "Discover venue types that facilitate effective team building and create stronger workplace relationships.",
    published: true,
    status: "published",
    tags: ["corporate events", "team building", "workplace culture"],
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop"
  },
  {
    title: "Graduation Party Planning: Celebrating Academic Achievements in Style",
    slug: "graduation-party-planning-guide",
    content: `<h2>Honoring Academic Milestones</h2>
    <p>Graduation parties celebrate years of hard work and mark the beginning of new adventures. The right venue sets the tone for this important transition.</p>
    <h2>High School Graduation Venues</h2>
    <ul>
    <li>Community centers for large friend groups</li>
    <li>Restaurants with private rooms for family celebrations</li>
    <li>Parks and outdoor pavilions for casual gatherings</li>
    <li>Country clubs for more formal celebrations</li>
    </ul>
    <h2>College Graduation Considerations</h2>
    <p>College graduations often involve out-of-town family members, so consider venues near hotels or those that offer accommodation packages.</p>
    <h2>Advanced Degree Celebrations</h2>
    <p>Graduate degrees deserve sophisticated venues—private dining rooms, wine bars, or elegant event spaces that reflect professional achievement.</p>
    <h2>Multi-Graduate Celebrations</h2>
    <p>When celebrating multiple graduates, choose venues with flexible spaces that can accommodate different group sizes and celebration styles.</p>`,
    excerpt: "Plan the perfect graduation celebration with venue ideas for every educational milestone and budget.",
    published: true,
    status: "published",
    tags: ["graduation parties", "academic celebrations", "milestone events"],
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800&h=400&fit=crop"
  }
]

// Generate more blog posts
function generateBlogPosts() {
  return blogPostsData
}

async function main() {
  console.log("🌱 Starting comprehensive seed...")

  try {
    // Create or update admin user
    const hashedPassword = await bcrypt.hash("admin123", 12)
    const adminUser = await prisma.user.upsert({
      where: { email: "admin@venuefusion.cz" },
      update: {},
      create: {
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
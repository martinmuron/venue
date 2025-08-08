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
    name: "Grand Ballroom Praha",
    description: "Elegantní ballroom pro velké společenské akce a svatby. Kapacita až 300 hostů s profesionálním osvětlením a zvukem.",
    address: "Náměstí Míru 15, Praha 2",
    capacitySeated: 200,
    capacityStanding: 300,
    venueType: "Ballroom",
    amenities: ["Parkování", "Profesionální zvuk", "Osvětlení", "Catering", "Bar"],
    contactEmail: "info@grandballroom.cz",
    priceMin: 15000,
    priceMax: 35000
  },
  {
    name: "Industrial Loft Karlín",
    description: "Moderní industriální prostor s vysokými stropy a velkými okny. Ideální pro firemní akce a launch party.",
    address: "Křižíkova 34, Praha 8 - Karlín",
    capacitySeated: 80,
    capacityStanding: 150,
    venueType: "Loft",
    amenities: ["Wi-Fi", "Projektor", "Klimatizace", "Parkování"],
    contactEmail: "booking@industrialloft.cz",
    priceMin: 8000,
    priceMax: 18000
  },
  {
    name: "Rooftop Terrace Vinohrady",
    description: "Střešní terasa s výhledem na Prahu. Perfektní pro letní akce a networking eventy.",
    address: "Korunní 96, Praha 2 - Vinohrady",
    capacitySeated: 60,
    capacityStanding: 100,
    venueType: "Terrace",
    amenities: ["Výhled", "Venkovní prostory", "Bar", "Gril"],
    contactEmail: "events@rooftopterrace.cz",
    priceMin: 12000,
    priceMax: 25000
  },
  {
    name: "Art Gallery Smíchov",
    description: "Umělecká galerie s bílými stěnami a moderním designem. Vhodná pro výstavy a kulturní akce.",
    address: "Nádražní 23, Praha 5 - Smíchov",
    capacitySeated: 40,
    capacityStanding: 80,
    venueType: "Gallery",
    amenities: ["Výstavní systém", "Profesionální osvětlení", "Wi-Fi"],
    contactEmail: "gallery@artspace.cz",
    priceMin: 6000,
    priceMax: 15000
  },
  {
    name: "Conference Center Pankrác",
    description: "Moderní konferenční centrum s nejnovější technologií. Ideální pro business meetingy a semináře.",
    address: "Na Pankráci 1724/129, Praha 4",
    capacitySeated: 120,
    capacityStanding: 180,
    venueType: "Conference",
    amenities: ["AV technika", "Wi-Fi", "Catering", "Parkování", "Klimatizace"],
    contactEmail: "booking@confcenter.cz",
    priceMin: 10000,
    priceMax: 20000
  },
  {
    name: "Historic Mansion Hradčany",
    description: "Historická vila z 19. století s krásnou zahradou. Exkluzivní prostory pro svatby a slavnostní akce.",
    address: "Nerudova 47, Praha 1 - Hradčany",
    capacitySeated: 80,
    capacityStanding: 120,
    venueType: "Mansion",
    amenities: ["Zahrada", "Historický interiér", "Parkování", "Catering"],
    contactEmail: "events@mansion.cz",
    priceMin: 20000,
    priceMax: 40000
  },
  {
    name: "Modern Studio Holešovice",
    description: "Světlé studio s profesionálním vybavením pro fotografické a video produkce.",
    address: "Dukelských hrdinů 47, Praha 7 - Holešovice",
    capacitySeated: 30,
    capacityStanding: 50,
    venueType: "Studio",
    amenities: ["Profesionální osvětlení", "Infinity wall", "Wi-Fi", "Parkování"],
    contactEmail: "studio@modernstudio.cz",
    priceMin: 4000,
    priceMax: 10000
  }
]

// Generate more venues programmatically
function generateVenues() {
  const venues = [...venuesData]
  
  const types = ["Restaurant", "Bar", "Club", "Hotel", "Theater", "Museum", "Garden", "Warehouse"]
  const districts = ["Praha 1", "Praha 2", "Praha 3", "Praha 4", "Praha 5", "Praha 6", "Praha 7", "Praha 8", "Praha 9", "Praha 10"]
  const amenitiesPool = ["Wi-Fi", "Parkování", "Klimatizace", "Bar", "Catering", "AV technika", "Terasa", "Zahrada", "VIP prostory", "Garderoba"]
  
  for (let i = venues.length; i < 50; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const district = districts[Math.floor(Math.random() * districts.length)]
    const capacity = 50 + Math.floor(Math.random() * 200)
    
    venues.push({
      name: `${type} ${district.split(' ')[1]} - ${i}`,
      description: `Profesionální ${type.toLowerCase()} v centru ${district}. Moderní vybavení a vynikající služby pro vaše akce.`,
      address: `Ulice ${i}, ${district}`,
      capacitySeated: Math.floor(capacity * 0.7),
      capacityStanding: capacity,
      venueType: type,
      amenities: amenitiesPool.slice(0, 3 + Math.floor(Math.random() * 4)),
      contactEmail: `info@${type.toLowerCase()}${i}.cz`,
      priceMin: 3000 + Math.floor(Math.random() * 10000),
      priceMax: 8000 + Math.floor(Math.random() * 20000)
    })
  }
  
  return venues
}

const eventRequestsData = [
  {
    title: "Firemní vánoční večírek 2024",
    description: "Hledáme prostor pro vánoční večírek naší společnosti. Očekáváme 80-100 hostů.",
    eventType: "Firemní akce",
    guestCount: 90,
    budgetRange: "15000-25000",
    locationPreference: "Praha centrum",
    requirements: "Catering možnosti, parkování, AV technika",
    contactName: "Jana Svobodová",
    contactEmail: "jana.svoboda@firma.cz",
    contactPhone: "+420 777 123 456"
  },
  {
    title: "Svatební oslava - červen 2024",
    description: "Svatební hostina pro 120 hostů. Hledáme prostor s možností venkovních prostor.",
    eventType: "Svatba",
    guestCount: 120,
    budgetRange: "30000-50000",
    locationPreference: "Praha",
    requirements: "Zahrada nebo terasa, catering, parkování pro hosty",
    contactName: "Tomáš Novák",
    contactEmail: "tomas.novak@email.cz"
  },
  {
    title: "Konference IT profesionálů",
    description: "Celodenní konference pro IT specialisty. Potřebujeme moderní vybavení.",
    eventType: "Konference",
    guestCount: 150,
    budgetRange: "25000-40000",
    locationPreference: "Praha",
    requirements: "Projektor, mikrofony, Wi-Fi, catering přestávky",
    contactName: "Pavel Dvořák",
    contactEmail: "pavel.dvorak@it.cz",
    contactPhone: "+420 606 789 123"
  }
]

// Generate more event requests
function generateEventRequests() {
  const requests = [...eventRequestsData]
  
  const eventTypes = ["Firemní akce", "Svatba", "Narozeniny", "Konference", "Workshop", "Networking", "Launch party", "Benefiční akce"]
  const names = ["Jan Novák", "Anna Svobodová", "Pavel Dvořák", "Marie Procházková", "Tomáš Černý", "Eva Nováková"]
  
  for (let i = requests.length; i < 20; i++) {
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    const name = names[Math.floor(Math.random() * names.length)]
    const guestCount = 20 + Math.floor(Math.random() * 180)
    
    requests.push({
      title: `${eventType} - ${new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('cs-CZ')}`,
      description: `Pořádáme ${eventType.toLowerCase()} a hledáme vhodný prostor pro ${guestCount} hostů.`,
      eventType,
      guestCount,
      budgetRange: `${5000 + Math.floor(Math.random() * 15000)}-${15000 + Math.floor(Math.random() * 25000)}`,
      locationPreference: "Praha",
      requirements: "Wi-Fi, catering možnosti, parkování",
      contactName: name,
      contactEmail: `${name.toLowerCase().replace(' ', '.')}@email.cz`,
      contactPhone: Math.random() > 0.5 ? `+420 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}` : undefined
    })
  }
  
  return requests
}

const blogPostsData = [
  {
    title: "Jak vybrat perfektní prostor pro firemní akci",
    slug: "jak-vybrat-prostor-pro-firemni-akci",
    content: `<h2>Základní kritéria pro výběr</h2>
    <p>Při výběru prostoru pro firemní akci je důležité zvážit několik klíčových faktorů:</p>
    <ul>
    <li>Kapacita a rozložení prostoru</li>
    <li>Technické vybavení</li>
    <li>Dostupnost a parkování</li>
    <li>Catering možnosti</li>
    </ul>
    <h2>Tipy pro úspěšnou akci</h2>
    <p>Nezapomeňte na důležité detaily jako je osvětlení, akustika a celková atmosféra prostoru.</p>`,
    excerpt: "Průvodce výběrem ideálního prostoru pro vaši firemní akci. Praktické tipy a doporučení.",
    published: true,
    status: "published",
    tags: ["firemní akce", "tipy", "výběr prostoru"]
  },
  {
    title: "Trendy ve svatebním plánování 2024",
    slug: "trendy-svatebni-planovani-2024",
    content: `<h2>Nejnovější trendy</h2>
    <p>Rok 2024 přináší zajímavé trendy ve svatebním plánování:</p>
    <ul>
    <li>Udržitelné svatby</li>
    <li>Intimní ceremonie</li>
    <li>Venkovní prostory</li>
    <li>Lokální dodavatelé</li>
    </ul>
    <p>Páry si více než kdy dříve vybírají prostory, které odpovídají jejich osobnosti.</p>`,
    excerpt: "Objevte nejnovější trendy ve svatebním plánování a najděte inspiraci pro váš velký den.",
    published: true,
    status: "published",
    tags: ["svatby", "trendy", "plánování"]
  },
  {
    title: "Organizace konferencí: Praktický návod",
    slug: "organizace-konferenci-navod",
    content: `<h2>Příprava konference</h2>
    <p>Úspěšná konference vyžaduje pečlivé plánování a správný výběr prostoru.</p>
    <h3>Klíčové kroky:</h3>
    <ol>
    <li>Definice cílů a cílové skupiny</li>
    <li>Výběr vhodného data a času</li>
    <li>Rezervace prostoru s odpovídajícím vybavením</li>
    <li>Organizace cateringu a přestávek</li>
    </ol>`,
    excerpt: "Kompletní návod pro organizaci úspěšné konference od A do Z.",
    published: true,
    status: "published",
    tags: ["konference", "organizace", "business"]
  }
]

// Generate more blog posts
function generateBlogPosts() {
  const posts = [...blogPostsData]
  
  const topics = [
    "Tipy pro perfektní párty",
    "Jak uspořádat networking event",
    "Výběr cateringu pro akce",
    "Dekorace prostor pro různé příležitosti",
    "Technické vybavení pro events",
    "Jak vyjednat nejlepší cenu za prostor",
    "Sezónní akce a jejich specifika"
  ]
  
  for (let i = posts.length; i < 10; i++) {
    const topic = topics[i - posts.length] || `Event plánování - část ${i}`
    const slug = topic.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
    
    posts.push({
      title: topic,
      slug: `${slug}-${i}`,
      content: `<h2>Úvod</h2><p>V tomto článku se podíváme na ${topic.toLowerCase()}.</p><h2>Hlavní body</h2><p>Praktické tipy a doporučení pro váš další event.</p>`,
      excerpt: `Praktické rady a tipy týkající se ${topic.toLowerCase()}.`,
      published: true,
      status: "published",
      tags: ["eventi", "tipy", "plánování"]
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
        email: "admin@prostormat.cz",
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
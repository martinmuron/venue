import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding test users...')

  // Hash password for all test users
  const hashedPassword = await bcrypt.hash('123456', 12)

  // Create test user (regular user looking for locations)
  const testUser = await prisma.user.upsert({
    where: { email: 'user@user.com' },
    update: {},
    create: {
      email: 'user@user.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'user',
      company: 'Event Planning Co.',
    },
  })

  // Create location manager
  const locationManager = await prisma.user.upsert({
    where: { email: 'manager@user.com' },
    update: {},
    create: {
      email: 'manager@user.com',
      name: 'Location Manager',
      password: hashedPassword,
      role: 'venue_manager',
      company: 'Prague Venues Ltd.',
    },
  })

  // Create test admin user
  const mainAdmin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      name: 'Test Admin',
      password: hashedPassword,
      role: 'admin',
      company: 'VenuePlatform',
    },
  })

  // Create sample venues for the location manager
  const venue1 = await prisma.venue.upsert({
    where: { slug: 'modern-conference-center' },
    update: {},
    create: {
      name: 'Modern Conference Center',
      slug: 'modern-conference-center',
      description: 'Modern conference center in Prague heart with latest technical equipment. Ideal for corporate events, conferences and presentations.',
      address: 'Wenceslas Square 1, Praha 1',
      capacitySeated: 200,
      capacityStanding: 300,
      venueType: 'conference-hall',
      amenities: ['Wi-Fi', 'Projektor', 'Zvukový systém', 'Klimatizace', 'Catering možnosti'],
      contactEmail: 'info@modernconference.cz',
      contactPhone: '+420 123 456 789',
      websiteUrl: 'https://modernconference.cz',
      images: [
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'active',
      managerId: locationManager.id,
    },
  })

  const venue2 = await prisma.venue.upsert({
    where: { slug: 'elegant-ballroom' },
    update: {},
    create: {
      name: 'Elegant Ballroom',
      slug: 'elegant-ballroom',
      description: 'Elegant ballroom with historic touch. Perfect for weddings, balls and formal evenings.',
      address: 'Old Town Square 5, Praha 1',
      capacitySeated: 150,
      capacityStanding: 250,
      venueType: 'ballroom',
      amenities: ['Taneční parket', 'Osvětlení', 'Zvukový systém', 'Bar', 'Šatna'],
      contactEmail: 'bookings@elegantballroom.cz',
      contactPhone: '+420 987 654 321',
      websiteUrl: 'https://elegantballroom.cz',
      images: [
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
        'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',
        'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'active',
      managerId: locationManager.id,
    },
  })

  const venue3 = await prisma.venue.upsert({
    where: { slug: 'rooftop-terrace' },
    update: {},
    create: {
      name: 'Rooftop Terrace',
      slug: 'rooftop-terrace',
      description: 'Rooftop terrace with amazing Prague views. Ideal for summer events, cocktail parties and networking events.',
      address: 'Vinohrady District, Praha 2',
      capacitySeated: 80,
      capacityStanding: 120,
      venueType: 'outdoor-space',
      amenities: ['Výhled na město', 'Bar', 'Gril', 'Vytápění', 'Zastřešení'],
      contactEmail: 'events@rooftopterrace.cz',
      contactPhone: '+420 555 123 456',
      websiteUrl: 'https://rooftopterrace.cz',
      images: [
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'active',
      managerId: locationManager.id,
    },
  })

  // Create sample blog posts
  const blogPost1 = await prisma.blogPost.upsert({
    where: { slug: 'how-to-choose-ideal-space-for-corporate-event' },
    update: {},
    create: {
      title: 'How to Choose Ideal Space for Corporate Event',
      slug: 'how-to-choose-ideal-space-for-corporate-event',
      excerpt: 'Practical guide for choosing the right space for your corporate event. Tips and tricks from professionals.',
      content: `# How to Choose Ideal Space for Corporate Event

Choosing the right space is key to the success of any corporate event. Here are several important factors you should consider:

## 1. Capacity and Layout

Make sure the space accommodates all your guests comfortably. Consider different layout types based on the event character.

## 2. Location and Accessibility

Choose a space that is easily accessible for all participants. Think about parking and public transport.

## 3. Technical Equipment

Check availability of AV technology, Wi-Fi and other necessary equipment.

## 4. Catering Options

Find out if the space offers catering or allows external suppliers.

## 5. Budget

Don't forget about hidden costs like cleaning, security or additional services.`,
      coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      status: 'published',
      authorId: mainAdmin.id,
      tags: '["corporate events", "event planning", "tips"]',
      metaTitle: 'How to Choose Ideal Space for Corporate Event - VenuePlatform',
      metaDescription: 'Practical guide for choosing the right space for your corporate event. Tips and tricks from professionals.',
      publishedAt: new Date(),
    },
  })

  const blogPost2 = await prisma.blogPost.upsert({
    where: { slug: 'corporate-event-organization-trends-2024' },
    update: {},
    create: {
      title: 'Corporate Event Organization Trends 2024',
      slug: 'corporate-event-organization-trends-2024',
      excerpt: 'Discover the latest trends in corporate event organization and get inspired for your next event.',
      content: `# Corporate Event Organization Trends 2024

Year 2024 brings new trends in corporate event organization. Here are the most important ones:

## 1. Hybrid Events

Combination of in-person and online participants becomes standard.

## 2. Sustainability

Eco-friendly events with minimal environmental impact.

## 3. Personalization

Each participant has unique experience tailored to their needs.

## 4. Wellness Activities

Integration of wellness elements into corporate events for better employee well-being.

## 5. Technological Innovations

Use of AR/VR, AI and other technologies for interactive experiences.`,
      coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      status: 'published',
      authorId: mainAdmin.id,
      tags: '["trends", "2024", "corporate events", "innovation"]',
      metaTitle: 'Corporate Event Organization Trends 2024 - VenuePlatform',
      metaDescription: 'Discover the latest trends in corporate event organization and get inspired for your next event.',
      publishedAt: new Date(),
    },
  })

  const blogPost3 = await prisma.blogPost.upsert({
    where: { slug: 'best-wedding-venues-in-prague' },
    update: {},
    create: {
      title: 'Best Wedding Venues in Prague',
      slug: 'best-wedding-venues-in-prague',
      excerpt: 'Guide to the most beautiful wedding venues in Prague. From historic palaces to modern venues.',
      content: `# Best Wedding Venues in Prague

Prague offers countless beautiful places for your dream wedding. Here is a selection of the best:

## 1. Historic Palaces

Experience a fairy-tale wedding in one of Prague's palaces with rich history.

## 2. Modern Hotels

Luxury hotels offer complete wedding services and professional approach.

## 3. Gardens and Parks

For those who prefer outdoor weddings in natural environment.

## 4. Restaurants with Views

Romantic spaces with Prague views for unforgettable evening.

## 5. Unconventional Spaces

Galleries, lofts and other unique spaces for original wedding.`,
      coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
      status: 'published',
      authorId: mainAdmin.id,
      tags: '["weddings", "Prague", "venue", "wedding"]',
      metaTitle: 'Best Wedding Venues in Prague - VenuePlatform',
      metaDescription: 'Guide to the most beautiful wedding venues in Prague. From historic palaces to modern venues.',
      publishedAt: new Date(),
    },
  })

  console.log('✅ Test users created:')
  console.log('- Test User (user@user.com) - Role: user')
  console.log('- Location Manager (manager@user.com) - Role: venue_manager')
  console.log('- Test Admin (admin@test.com) - Role: admin')
  console.log('✅ Sample venues created for location manager')
  console.log('✅ Sample blog posts created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

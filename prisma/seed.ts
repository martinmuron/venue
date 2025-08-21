import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create a sample admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@venueplatform.com' },
    update: {},
    create: {
      email: 'admin@venueplatform.com',
      name: 'Admin',
      password: adminPassword,
      role: 'admin',
    },
  })

  // Create venue managers
  const managerPassword = await bcrypt.hash('manager123', 12)
  
  const manager1 = await prisma.user.upsert({
    where: { email: 'terasa@example.com' },
    update: {},
    create: {
      email: 'terasa@example.com',
      name: 'Restaurant Terasa Manager',
      password: managerPassword,
      role: 'venue_manager',
      phone: '+420 222 333 444',
    },
  })

  const manager2 = await prisma.user.upsert({
    where: { email: 'galerie@example.com' },
    update: {},
    create: {
      email: 'galerie@example.com',
      name: 'Galerie Moderna Manager',
      password: managerPassword,
      role: 'venue_manager',
      phone: '+420 111 222 333',
    },
  })

  const manager3 = await prisma.user.upsert({
    where: { email: 'skybar@example.com' },
    update: {},
    create: {
      email: 'skybar@example.com',
      name: 'SkyBar Prague Manager',
      password: managerPassword,
      role: 'venue_manager',
      phone: '+420 777 888 999',
    },
  })

  // Create managers for the new test venues
  const ribsManager = await prisma.user.upsert({
    where: { email: 'manager@ribsofprague.cz' },
    update: {},
    create: {
      email: 'manager@ribsofprague.cz',
      name: 'Tomáš Novák',
      password: managerPassword,
      role: 'venue_manager',
      phone: '+420 604 123 456',
      company: 'Ribs of Prague s.r.o.'
    },
  })

  const malvazeManager = await prisma.user.upsert({
    where: { email: 'events@umalvaze.cz' },
    update: {},
    create: {
      email: 'events@umalvaze.cz',
      name: 'Marie Svobodová',
      password: managerPassword,
      role: 'venue_manager',
      phone: '+420 777 234 567',
      company: 'U Malvaze Restaurant'
    },
  })

  const medusaManager = await prisma.user.upsert({
    where: { email: 'booking@medusaprague.com' },
    update: {},
    create: {
      email: 'booking@medusaprague.com',
      name: 'Pavel Dvořák',
      password: managerPassword,
      role: 'venue_manager',
      phone: '+420 606 345 678',
      company: 'Medusa Group'
    },
  })

  const popupManager = await prisma.user.upsert({
    where: { email: 'info@popupbar.cz' },
    update: {},
    create: {
      email: 'info@popupbar.cz',
      name: 'Lucie Kratochvílová',
      password: managerPassword,
      role: 'venue_manager',
      phone: '+420 608 456 789',
      company: 'Pop Up Concepts'
    },
  })

  // Create sample venues
  const venue1 = await prisma.venue.upsert({
    where: { slug: 'restaurant-terasa' },
    update: {},
    create: {
      name: 'Restaurant Terasa',
      slug: 'restaurant-terasa',
      description: 'Elegant restaurant with Prague Castle view, ideal for corporate events and formal evenings. We offer exclusive environment with terrace and professional service.',
      address: 'Kampa Island 1, Praha 1',
      capacitySeated: 80,
      capacityStanding: 120,
      venueType: 'restaurant',
      amenities: ['Air Conditioning', 'Projector', 'Sound System', 'WiFi', 'Terrace', 'Parking'],
      contactEmail: 'info@restaurant-terasa.cz',
      contactPhone: '+420 222 333 444',
      images: [
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      status: 'active',
      manager: {
        connect: { id: manager1.id }
      },
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    },
  })

  const venue2 = await prisma.venue.upsert({
    where: { slug: 'galerie-moderna' },
    update: {},
    create: {
      name: 'Galerie Moderna',
      slug: 'galerie-moderna',
      description: 'Modern gallery in Prague center with flexible spaces for conferences, exhibitions and networking events. High ceilings and minimalist design.',
      address: 'Národní 20, Praha 1',
      capacitySeated: 150,
      capacityStanding: 250,
      venueType: 'gallery',
      amenities: ['Multimedia Equipment', 'Catering Options', 'Exhibition System', 'Security System', 'Air Conditioning'],
      contactEmail: 'rezervace@galerie-moderna.cz',
      contactPhone: '+420 111 222 333',
      images: [
        'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      status: 'active',
      manager: {
        connect: { id: manager2.id }
      },
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  })

  const venue3 = await prisma.venue.upsert({
    where: { slug: 'skybar-prague' },
    update: {},
    create: {
      name: 'SkyBar Prague',
      slug: 'skybar-prague',
      description: 'Exclusive rooftop terrace with panoramic Prague views. Perfect for cocktail parties and summer events with unforgettable atmosphere.',
      address: 'Wenceslas Square 14, Praha 1',
      capacitySeated: 60,
      capacityStanding: 100,
      venueType: 'rooftop',
      amenities: ['Bar', 'DJ booth', 'Heating', 'Covered Area', 'VIP Section', 'City View'],
      contactEmail: 'events@skybar-prague.com',
      contactPhone: '+420 777 888 999',
      images: [
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1567281935884-3ba5af2c951d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      status: 'active',
      manager: {
        connect: { id: manager3.id }
      },
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  })

  // Create the new test venues
  const ribsOfPrague = await prisma.venue.upsert({
    where: { slug: 'ribs-of-prague' },
    update: {},
    create: {
      name: 'Ribs of Prague',
      slug: 'ribs-of-prague',
      description: 'Authentic American steakhouse in Prague heart. Rustic atmosphere with quality food and rich whiskey selection. Ideal for corporate parties and celebrations.',
      address: 'Jindřišská 5, Praha 1',
      capacitySeated: 120,
      capacityStanding: 180,
      venueType: 'restaurant',
      amenities: ['Bar', 'Projector', 'Sound System', 'WiFi', 'Air Conditioning', 'Private Lounges'],
      contactEmail: 'events@ribsofprague.cz',
      contactPhone: '+420 604 123 456',
      websiteUrl: 'https://www.ribsofprague.cz',
      images: [
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      status: 'active',
      manager: {
        connect: { id: ribsManager.id }
      },
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  })

  const uMalvaze = await prisma.venue.upsert({
    where: { slug: 'u-malvaze' },
    update: {},
    create: {
      name: 'U Malvaze',
      slug: 'u-malvaze',
      description: 'Historic restaurant in Prague New Town with traditional Czech cuisine and excellent beer. Stylish environment for smaller corporate events and team-building activities.',
      address: 'Národní 7, Praha 1',
      capacitySeated: 65,
      capacityStanding: 90,
      venueType: 'restaurant',
      amenities: ['Historic Interior', 'Beer Culture', 'WiFi', 'Private Room', 'Projector'],
      contactEmail: 'rezervace@umalvaze.cz',
      contactPhone: '+420 777 234 567',
      websiteUrl: 'https://www.umalvaze.cz',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      status: 'draft', // Testing draft status
      manager: {
        connect: { id: malvazeManager.id }
      },
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  })

  const medusaPrague = await prisma.venue.upsert({
    where: { slug: 'medusa-prague' },
    update: {},
    create: {
      name: 'Medusa Prague',
      slug: 'medusa-prague',
      description: 'Modern event space in historic building. Flexible layout with multi-section division options. Perfect for conferences, presentations and networking events.',
      address: 'Purkyňova 2121/7, Praha 2',
      capacitySeated: 200,
      capacityStanding: 350,
      venueType: 'conference',
      amenities: ['Multimediální vybavení', 'Simultánní překlad', 'WiFi', 'Catering možnosti', 'Parkování', 'Klimatizace'],
      contactEmail: 'booking@medusaprague.com',
      contactPhone: '+420 606 345 678',
      websiteUrl: 'https://www.medusaprague.com',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      images: [
        'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      status: 'active',
      manager: {
        connect: { id: medusaManager.id }
      },
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  })

  const popUpBar = await prisma.venue.upsert({
    where: { slug: 'pop-up-bar' },
    update: {},
    create: {
      name: 'Pop Up Bar',
      slug: 'pop-up-bar',
      description: 'Unique pop-up space with changing design. New concept and atmosphere every month. Ideal for creative events, product launches and informal networking.',
      address: 'Vinohrady, Praha 2',
      capacitySeated: 40,
      capacityStanding: 80,
      venueType: 'other',
      amenities: ['Flexibilní design', 'Bar', 'DJ booth', 'Instagram-worthy spot', 'WiFi'],
      contactEmail: 'hello@popupbar.cz',
      contactPhone: '+420 608 456 789',
      images: [
        'https://images.unsplash.com/photo-1567281935884-3ba5af2c951d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      status: 'draft', // Testing another draft status
      manager: {
        connect: { id: popupManager.id }
      },
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  })

  // Create a sample user
  const userPassword = await bcrypt.hash('user123', 12)
  const sampleUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Jan Novák',
      password: userPassword,
      role: 'user',
      company: 'ABC s.r.o.',
      phone: '+420 123 456 789',
    },
  })

  // Create test user
  const testPassword = await bcrypt.hash('12345', 12)
  const testUser = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test User',
      password: testPassword,
      role: 'user',
      company: 'Test Company',
      phone: '+420 775 654 639',
    },
  })

  // Create sample event requests
  await prisma.eventRequest.create({
    data: {
      userId: sampleUser.id,
      title: 'Corporate Christmas Party',
      description: 'Looking for space for our company Christmas party. Expecting around 80 guests, need space with dancing area and catering options.',
      eventType: 'corporate-event',
      eventDate: new Date('2025-12-15'),
      guestCount: 80,
      budgetRange: '$4,000 - $8,000',
      locationPreference: 'Prague 1',
      requirements: 'Parking spaces, dance floor, catering',
      contactName: 'John Smith',
      contactEmail: 'john.smith@abc.com',
      contactPhone: '+420 123 456 789',
      status: 'active',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  })

  await prisma.eventRequest.create({
    data: {
      userId: sampleUser.id,
      title: 'Team Building for 25 People',
      description: 'We need space for full-day team building with workshops and presentations.',
      eventType: 'team-building',
      eventDate: new Date('2025-11-20'),
      guestCount: 25,
      budgetRange: '$2,000 - $4,000',
      locationPreference: 'Prague 2',
      requirements: 'Projector, flipchart, refreshments',
      contactName: 'John Smith',
      contactEmail: 'john.smith@abc.com',
      contactPhone: '+420 123 456 789',
      status: 'active',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  })

  // Create sample venue inquiries for testing admin functionality
  await prisma.venueInquiry.create({
    data: {
      venueId: ribsOfPrague.id,
      userId: sampleUser.id,
      name: 'Jane Beautiful',
      email: 'jane@company.com',
      phone: '+420 777 123 456',
      eventDate: new Date('2024-12-10'),
      guestCount: 50,
      message: 'We are interested in your space for corporate Christmas party. Can you send us an offer?'
    }
  })

  await prisma.venueInquiry.create({
    data: {
      venueId: ribsOfPrague.id,
      name: 'Peter Newman',
      email: 'peter.newman@gmail.com',
      phone: '+420 605 987 654',
      eventDate: new Date('2024-11-25'),
      guestCount: 80,
      message: 'Looking for space for birthday celebration. Do you have availability at the end of November?'
    }
  })

  await prisma.venueInquiry.create({
    data: {
      venueId: medusaPrague.id,
      userId: sampleUser.id,
      name: 'Martin Freedom',
      email: 'martin@tech-startup.com',
      phone: '+420 608 555 444',
      eventDate: new Date('2024-12-05'),
      guestCount: 150,
      message: 'We need space for product launch. Do you have projectors and sound system available?'
    }
  })

  await prisma.venueInquiry.create({
    data: {
      venueId: uMalvaze.id,
      name: 'Eva Mountain',
      email: 'eva.mountain@company.com',
      phone: '+420 777 333 222',
      eventDate: new Date('2024-11-30'),
      guestCount: 30,
      message: 'We are interested in your space for small team building. What catering options do you have?'
    }
  })

  // Create 15 additional test venues to reach total of 20
  const additionalVenues = [
    {
      name: 'Villa Lanna',
      slug: 'villa-lanna',
      description: 'Historic villa with beautiful garden on Kampa Island. Exclusive space for weddings and representative events.',
      address: 'Kampa Island 2, Praha 1',
      capacitySeated: 100,
      capacityStanding: 150,
      venueType: 'villa',
      amenities: ['Zahrada', 'Historický interiér', 'Parkování', 'Catering možnosti', 'WiFi'],
      contactEmail: 'events@villalanna.cz',
      contactPhone: '+420 224 312 456',
      status: 'active',
      manager: {
        connect: { id: manager1.id }
      },
    },
    {
      name: 'Karlín Studios',
      slug: 'karlin-studios',
      description: 'Creative hub in Karlín heart with flexible spaces for workshops and networking.',
      address: 'Křižíkova 34, Praha 8',
      capacitySeated: 80,
      capacityStanding: 120,
      venueType: 'studio',
      amenities: ['Flexibilní prostory', 'Multimediální vybavení', 'WiFi', 'Kuchyňka', 'Terasa'],
      contactEmail: 'hello@karlinstudios.cz',
      contactPhone: '+420 775 123 987',
      status: 'active',
      manager: {
        connect: { id: manager2.id }
      },
    },
    {
      name: 'Boat Albatros',
      slug: 'boat-albatros',
      description: 'Floating restaurant on Vltava River with unique atmosphere for summer events.',
      address: 'Podolské nábřeží, Praha 4',
      capacitySeated: 60,
      capacityStanding: 100,
      venueType: 'boat',
      amenities: ['Paluba', 'Bar', 'Výhled na řeku', 'Catering', 'Klimatizace'],
      contactEmail: 'rezervace@albatros.cz',
      contactPhone: '+420 261 007 650',
      status: 'active',
      manager: {
        connect: { id: manager3.id }
      },
    },
    {
      name: 'Forum Karlín',
      slug: 'forum-karlin-venue',
      description: 'Prestigious concert hall and conference center for large events and conferences.',
      address: 'Thámova 190, Praha 8',
      capacitySeated: 500,
      capacityStanding: 800,
      venueType: 'conference',
      amenities: ['Profesionální zvuk', 'Osvětlení', 'Projekce', 'VIP prostory', 'Parkování'],
      contactEmail: 'events@forumkarlin.cz',
      contactPhone: '+420 225 315 555',
      status: 'active',
      manager: {
        connect: { id: ribsManager.id }
      },
    },
    {
      name: 'Loft 39',
      slug: 'loft-39',
      description: 'Industrial loft with high ceilings and industrial design for creative events.',
      address: 'Holečkova 39, Praha 5',
      capacitySeated: 70,
      capacityStanding: 110,
      venueType: 'loft',
      amenities: ['Vysoké stropy', 'Industriální design', 'WiFi', 'Bar', 'Flexibilní layout'],
      contactEmail: 'info@loft39.cz',
      contactPhone: '+420 602 123 789',
      status: 'active',
      manager: {
        connect: { id: malvazeManager.id }
      },
    },
    {
      name: 'Café Slavia Terrace',
      slug: 'cafe-slavia-terrace',
      description: 'Iconic café with terrace and National Theatre view. Historic atmosphere.',
      address: 'Národní třída 1, Praha 1',
      capacitySeated: 45,
      capacityStanding: 70,
      venueType: 'cafe',
      amenities: ['Historická atmosféra', 'Terasa', 'Výhled na divadlo', 'WiFi', 'Catering'],
      contactEmail: 'events@cafeslavia.cz',
      contactPhone: '+420 224 218 493',
      status: 'active',
      manager: {
        connect: { id: medusaManager.id }
      },
    },
    {
      name: 'Warehouse 7',
      slug: 'warehouse-7',
      description: 'Spacious warehouse converted to event space in Holešovice. Ideal for large events.',
      address: 'Bubenská 7, Praha 7',
      capacitySeated: 300,
      capacityStanding: 500,
      venueType: 'warehouse',
      amenities: ['Velký prostor', 'Flexibilní layout', 'Loading dock', 'Parkování', 'Zvukový systém'],
      contactEmail: 'booking@warehouse7.cz',
      contactPhone: '+420 777 456 123',
      status: 'active',
      manager: {
        connect: { id: popupManager.id }
      },
    },
    {
      name: 'Rooftop Lucerna',
      slug: 'rooftop-lucerna',
      description: 'Rooftop garden in Lucerna Passage with unique Prague views.',
      address: 'Štěpánská 61, Praha 1',
      capacitySeated: 80,
      capacityStanding: 120,
      venueType: 'rooftop',
      amenities: ['Střešní zahrada', 'Bar', 'Výhled na město', 'Vytápění', 'WiFi'],
      contactEmail: 'events@lucerna.cz',
      contactPhone: '+420 224 216 972',
      status: 'active',
      manager: {
        connect: { id: manager1.id }
      },
    },
    {
      name: 'Industrial Hall Smíchov',
      slug: 'industrial-hall-smichov',
      description: 'Former industrial hall transformed into modern event space in Smíchov.',
      address: 'Radlická 180, Praha 5',
      capacitySeated: 200,
      capacityStanding: 350,
      venueType: 'hall',
      amenities: ['Vysoké stropy', 'Flexibilní prostory', 'Parkování', 'Loading bay', 'Multimediální vybavení'],
      contactEmail: 'info@industrialhall.cz',
      contactPhone: '+420 605 234 876',
      status: 'active',
      manager: {
        connect: { id: manager2.id }
      },
    },
    {
      name: 'Villa Winternitz',
      slug: 'villa-winternitz',
      description: 'Functionalist villa with architectural value and beautiful garden.',
      address: 'Na Ořechovce 28, Praha 6',
      capacitySeated: 60,
      capacityStanding: 90,
      venueType: 'villa',
      amenities: ['Architektonická památka', 'Zahrada', 'WiFi', 'Parkování', 'Klimatizace'],
      contactEmail: 'events@villawinternitz.cz',
      contactPhone: '+420 233 378 681',
      status: 'active',
      manager: {
        connect: { id: manager3.id }
      },
    },
    {
      name: 'Brewery Lounge U Fleku',
      slug: 'brewery-lounge-u-fleku',
      description: 'Historic brewery with traditional spaces for authentic Czech events.',
      address: 'Křemencova 11, Praha 1',
      capacitySeated: 120,
      capacityStanding: 180,
      venueType: 'brewery',
      amenities: ['Historické prostory', 'Vlastní pivo', 'Tradiční kuchyně', 'WiFi', 'Živá hudba'],
      contactEmail: 'akce@ufleku.cz',
      contactPhone: '+420 224 934 019',
      status: 'active',
      manager: {
        connect: { id: ribsManager.id }
      },
    },
    {
      name: 'Coworking Space Node5',
      slug: 'coworking-space-node5',
      description: 'Modern coworking with conference rooms for business networking.',
      address: 'Národní 961/25, Praha 1',
      capacitySeated: 50,
      capacityStanding: 80,
      venueType: 'coworking',
      amenities: ['Moderní vybavení', 'WiFi', 'Videokonference', 'Kuchyňka', 'Parkování'],
      contactEmail: 'events@node5.cz',
      contactPhone: '+420 775 987 456',
      status: 'active',
      manager: {
        connect: { id: malvazeManager.id }
      },
    },
    {
      name: 'Garden Restaurant Hergetova Cihelna',
      slug: 'garden-restaurant-hergetova',
      description: 'Romantic garden restaurant with Charles Bridge view.',
      address: 'Cihelná 2b, Praha 1',
      capacitySeated: 90,
      capacityStanding: 140,
      venueType: 'garden',
      amenities: ['Zahrada', 'Výhled na most', 'Terasa', 'Fine dining', 'WiFi', 'Valet parking'],
      contactEmail: 'events@hergetova.cz',
      contactPhone: '+420 257 535 534',
      status: 'active',
      manager: {
        connect: { id: medusaManager.id }
      },
    },
    {
      name: 'Art Gallery Mánes',
      slug: 'art-gallery-manes',
      description: 'Prestigious art gallery with exhibition spaces for cultural events.',
      address: 'Masarykovo nábřeží 250, Praha 1',
      capacitySeated: 100,
      capacityStanding: 150,
      venueType: 'gallery',
      amenities: ['Výstavní prostory', 'Profesionální osvětlení', 'WiFi', 'Catering možnosti', 'Výhled na řeku'],
      contactEmail: 'pronajmy@manes.cz',
      contactPhone: '+420 224 932 832',
      status: 'active',
      manager: {
        connect: { id: popupManager.id }
      },
    },
    {
      name: 'Penthouse Wenceslas',
      slug: 'penthouse-wenceslas',
      description: 'Luxury penthouse on Wenceslas Square with panoramic views.',
      address: 'Václavské náměstí 36, Praha 1',
      capacitySeated: 40,
      capacityStanding: 65,
      venueType: 'penthouse',
      amenities: ['Panoramatický výhled', 'Luxusní interiér', 'Terasa', 'Bar', 'WiFi', 'Klimatizace'],
      contactEmail: 'events@penthousewenceslas.cz',
      contactPhone: '+420 608 123 789',
      status: 'active',
      manager: {
        connect: { id: manager1.id }
      },
    },
  ]

  // Create the additional venues
  for (const venueData of additionalVenues) {
    await prisma.venue.upsert({
      where: { slug: venueData.slug },
      update: {},
      create: {
        ...venueData,
        images: [
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    })
    console.log('Additional venue created:', venueData.name)
  }

  console.log('Database seeded successfully!')
  console.log('Sample users created:')
  console.log('- Admin: admin@venueplatform.com / admin123')
  console.log('- Manager 1: terasa@example.com / manager123')
  console.log('- Manager 2: galerie@example.com / manager123')
  console.log('- Manager 3: skybar@example.com / manager123')
  console.log('- Ribs Manager: manager@ribsofprague.cz / manager123')
  console.log('- Malvaze Manager: events@umalvaze.cz / manager123')
  console.log('- Medusa Manager: booking@medusaprague.com / manager123')
  console.log('- Pop Up Manager: info@popupbar.cz / manager123')
  console.log('- User: user@example.com / user123')
  console.log('- Test User: test@test.com / 12345')
  console.log('')
  console.log('Test venues created:')
  console.log('- Ribs of Prague (active)')
  console.log('- U Malvaze (draft)')
  console.log('- Medusa Prague (active)')
  console.log('- Pop Up Bar (draft)')
  console.log('')
  console.log('Sample inquiries created for testing admin functionality')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
] as const

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

  // Create a sample venue manager
  const managerPassword = await bcrypt.hash('manager123', 12)
  const manager = await prisma.user.upsert({
      where: { email: 'manager@venueplatform.com' },
      update: {},
      create: {
          email: 'manager@venueplatform.com',
          name: 'Venue Manager',
          password: managerPassword,
          role: 'venue_manager',
      },
  })

  // Create 70 placeholder venues
  const venues = []
  for (let i = 0; i < 70; i++) {
    const state = US_STATES[i % US_STATES.length]
    venues.push({
      name: `Venue in ${state} ${i + 1}`,
      slug: `venue-${state.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `This is a placeholder description for a venue in ${state}.`,
      address: `${i + 1} Main St, City, ${state}`,
      capacitySeated: Math.floor(Math.random() * 200) + 50,
      capacityStanding: Math.floor(Math.random() * 300) + 100,
      venueType: 'other',
      amenities: ['WiFi', 'Parking', 'Restrooms'],
      contactEmail: `contact@venue${i + 1}.com`,
      contactPhone: `123-456-789${i % 10}`,
      images: ['https://via.placeholder.com/800x600.png'],
      status: 'active',
      managerId: manager.id,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    })
  }

  for (const venueData of venues) {
    await prisma.venue.create({ data: venueData })
  }

  console.log('Database seeded successfully with 70 US venues!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

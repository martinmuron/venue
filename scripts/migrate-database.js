const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🚀 Starting database migration...')
    
    // Check if EventRequestFavorite table already exists
    try {
      await prisma.$queryRaw`SELECT 1 FROM "venue_event_request_favorites" LIMIT 1`
      console.log('✅ venue_event_request_favorites table already exists')
    } catch (error) {
      console.log('📦 Creating venue_event_request_favorites table...')
      
      // Create the EventRequestFavorite table
      await prisma.$executeRaw`
        CREATE TABLE "venue_event_request_favorites" (
          "id" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "eventRequestId" TEXT NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

          CONSTRAINT "venue_event_request_favorites_pkey" PRIMARY KEY ("id")
        );
      `
      
      // Create unique constraint
      await prisma.$executeRaw`
        CREATE UNIQUE INDEX "venue_event_request_favorites_userId_eventRequestId_key" 
        ON "venue_event_request_favorites"("userId", "eventRequestId");
      `
      
      // Add foreign key constraints
      await prisma.$executeRaw`
        ALTER TABLE "venue_event_request_favorites" ADD CONSTRAINT "venue_event_request_favorites_userId_fkey" 
        FOREIGN KEY ("userId") REFERENCES "venue_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
      `
      
      await prisma.$executeRaw`
        ALTER TABLE "venue_event_request_favorites" ADD CONSTRAINT "venue_event_request_favorites_eventRequestId_fkey" 
        FOREIGN KEY ("eventRequestId") REFERENCES "venue_event_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
      `
      
      console.log('✅ venue_event_request_favorites table created successfully')
    }
    
    console.log('🎉 Database migration completed!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
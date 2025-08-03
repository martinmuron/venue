export type VenueType = 
  | 'restaurant' 
  | 'rooftop' 
  | 'gallery' 
  | 'conference' 
  | 'historical'
  | 'villa'
  | 'palace'
  | 'hotel'
  | 'garden'
  | 'studio'
  | 'loft'
  | 'other'

export type EventType = 
  | 'corporate-event' 
  | 'team-building' 
  | 'wedding' 
  | 'private-event'
  | 'conference'
  | 'workshop'
  | 'celebration'

export type UserRole = 'user' | 'venue_manager' | 'admin'

export type VenueStatus = 'draft' | 'active' | 'expired'

export type EventStatus = 'active' | 'closed' | 'expired'

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due'

export const VENUE_TYPES: Record<VenueType, string> = {
  restaurant: 'Restaurant',
  rooftop: 'Rooftop Terrace',
  gallery: 'Gallery',
  conference: 'Conference Center',
  historical: 'Historical Venue',
  villa: 'Villa',
  palace: 'Palace',
  hotel: 'Hotel',
  garden: 'Garden',
  studio: 'Studio',
  loft: 'Loft',
  other: 'Other'
}

export const EVENT_TYPES: Record<EventType, string> = {
  'corporate-event': 'Corporate Event',
  'team-building': 'Team Building',
  'wedding': 'Wedding',
  'private-event': 'Private Event',
  'conference': 'Conference',
  'workshop': 'Workshop',
  'celebration': 'Celebration'
}

export const US_CITIES = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH",
  "Charlotte, NC", "San Francisco, CA", "Indianapolis, IN", "Seattle, WA", "Denver, CO"
] as const

export const BUDGET_RANGES = [
  'Up to $2,000',
  '$2,000 - $4,000',
  '$4,000 - $8,000',
  '$8,000 - $20,000',
  'Over $20,000'
] as const

export const CAPACITY_RANGES = [
  'Up to 25 people',
  '25 - 50 people',
  '50 - 100 people',
  '100 - 200 people',
  'Over 200 people'
] as const
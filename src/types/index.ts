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

export const PRAGUE_DISTRICTS = [
  "Praha 1", "Praha 2", "Praha 3", "Praha 4", "Praha 5", "Praha 6", "Praha 7", "Praha 8", "Praha 9", "Praha 10",
  "Praha 11", "Praha 12", "Praha 13", "Praha 14", "Praha 15", "Praha 16", "Praha 17", "Praha 18", "Praha 19", "Praha 20",
  "Praha 21", "Praha 22", "Benešov", "Beroun", "Kladno", "Kolín", "Kutná Hora", "Mělník", "Mladá Boleslav", "Nymburk", "Praha-východ", "Praha-západ", "Příbram", "Rakovník"
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

export const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
] as const

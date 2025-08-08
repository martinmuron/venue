import { EVENT_TYPES } from '@/types'
import type { EventType } from '@/types'

interface VenueBroadcastEmailData {
  venueName: string
  venueContactEmail: string
  broadcast: {
    title: string
    description: string
    eventType: string
    eventDate?: Date | null
    guestCount?: number | null
    budgetRange?: string
    locationPreference?: string
    requirements?: string
    contactName: string
    contactEmail: string
    contactPhone?: string
  }
}

export function generateVenueBroadcastEmail(data: VenueBroadcastEmailData) {
  const { venueName, broadcast } = data
  const eventTypeLabel = EVENT_TYPES[broadcast.eventType as EventType] || broadcast.eventType
  
  const subject = `New Event Request: ${broadcast.title}`
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: #000; color: white; padding: 30px; text-align: center; }
        .content { padding: 40px 30px; }
        .event-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { margin: 10px 0; }
        .label { font-weight: 600; color: #495057; }
        .cta-button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; color: #6c757d; font-size: 14px; }
        .highlight { background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px;">Venue Fusion</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">New Event Request</p>
        </div>
        
        <div class="content">
            <h2 style="color: #212529; margin-bottom: 10px;">Hello,</h2>
            
            <p>We have a new event request that might be suitable for your venue <strong>${venueName}</strong>.</p>
            
            <div class="highlight">
                <h3 style="margin: 0 0 10px 0; color: #1976d2;">${broadcast.title}</h3>
                <p style="margin: 0; color: #424242;">${broadcast.description}</p>
            </div>
            
            <div class="event-details">
                <h4 style="margin: 0 0 15px 0; color: #212529;">Event Details:</h4>
                
                <div class="detail-row">
                    <span class="label">Event Type:</span> ${eventTypeLabel}
                </div>
                
                ${broadcast.eventDate ? `
                <div class="detail-row">
                    <span class="label">Event Date:</span> ${new Date(broadcast.eventDate).toLocaleDateString('en-US')}
                </div>
                ` : ''}
                
                ${broadcast.guestCount ? `
                <div class="detail-row">
                    <span class="label">Guest Count:</span> ${broadcast.guestCount}
                </div>
                ` : ''}
                
                ${broadcast.budgetRange ? `
                <div class="detail-row">
                    <span class="label">Budget:</span> ${broadcast.budgetRange}
                </div>
                ` : ''}
                
                ${broadcast.locationPreference ? `
                <div class="detail-row">
                    <span class="label">Location:</span> ${broadcast.locationPreference}
                </div>
                ` : ''}
                
                ${broadcast.requirements ? `
                <div class="detail-row">
                    <span class="label">Requirements:</span> ${broadcast.requirements}
                </div>
                ` : ''}
            </div>
            
            <h4 style="color: #212529; margin: 25px 0 10px 0;">Organizer Contact Information:</h4>
            <div class="detail-row">
                <span class="label">Name:</span> ${broadcast.contactName}
            </div>
            <div class="detail-row">
                <span class="label">Email:</span> <a href="mailto:${broadcast.contactEmail}">${broadcast.contactEmail}</a>
            </div>
            ${broadcast.contactPhone ? `
            <div class="detail-row">
                <span class="label">Phone:</span> <a href="tel:${broadcast.contactPhone}">${broadcast.contactPhone}</a>
            </div>
            ` : ''}
            
            <p style="margin: 30px 0 20px 0;">
                <strong>Interested in this event?</strong> Contact the organizer directly using the provided contact information or log into Venue Fusion to manage your requests.
            </p>
            
            <a href="https://venue-platform.vercel.app/dashboard" class="cta-button">
                Log into Venue Fusion
            </a>
        </div>
        
        <div class="footer">
            <p><strong>Venue Fusion</strong> - Platform for finding event venues</p>
            <p>You received this email because your venue was automatically selected based on the request criteria.</p>
            <p>
                <a href="mailto:info@venuefusion.com" style="color: #007bff;">info@venuefusion.com</a> | 
                <a href="https://venuefusion.com" style="color: #007bff;">venuefusion.com</a>
            </p>
        </div>
    </div>
</body>
</html>`

  const plainText = `
New Event Request via Venue Fusion

Hello,

We have a new event request for your venue ${venueName}.

${broadcast.title}
${broadcast.description}

Event Details:
- Event Type: ${eventTypeLabel}
${broadcast.eventDate ? `- Event Date: ${new Date(broadcast.eventDate).toLocaleDateString('en-US')}` : ''}
${broadcast.guestCount ? `- Guest Count: ${broadcast.guestCount}` : ''}
${broadcast.budgetRange ? `- Budget: ${broadcast.budgetRange}` : ''}
${broadcast.locationPreference ? `- Location: ${broadcast.locationPreference}` : ''}
${broadcast.requirements ? `- Requirements: ${broadcast.requirements}` : ''}

Organizer Contact Information:
- Name: ${broadcast.contactName}
- Email: ${broadcast.contactEmail}
${broadcast.contactPhone ? `- Phone: ${broadcast.contactPhone}` : ''}

Interested in this event? Contact the organizer directly using the provided contact information.

--
Venue Fusion - Platform for finding event venues
venuefusion.com | info@venuefusion.com
`

  return {
    subject,
    html,
    text: plainText
  }
}
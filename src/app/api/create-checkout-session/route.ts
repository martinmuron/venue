import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-07-30.basil",
    })
  : null

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured. Please set STRIPE_SECRET_KEY." },
        { status: 500 }
      )
    }

    const { venueName, userEmail } = await request.json()

    if (!venueName || !userEmail) {
      return NextResponse.json(
        { error: "Venue name and email are required" },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Venue Listing Fee",
              description: `List your venue "${venueName}" on VenueFusion`,
            },
            unit_amount: 9900, // $99.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userEmail,
      metadata: {
        venue_name: venueName,
        user_email: userEmail,
      },
      success_url: `${request.headers.get("origin")}/add-venue/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/add-venue?canceled=true`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error("Stripe error:", error)
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    )
  }
}
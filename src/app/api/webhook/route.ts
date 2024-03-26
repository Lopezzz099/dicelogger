import { stripe } from "@/services/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
  // console.log(1);
  
  const body = await req.text()
  const signature = headers().get("stripe-signature") as string
  // console.log(signature);

  // console.log(headers());
  
  

  let event: Stripe.Event

  try {
    // console.log(2);
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  switch(event.type) {
    case "payment_intent.succeeded":
      console.log("payment_intent.succeeded");      
  }

  return NextResponse.json(null, { status: 200 })
}
  
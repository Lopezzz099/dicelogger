import { auth } from "@/services/firebase";
import { stripe } from "@/services/stripe";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    // console.log(2);
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case "checkout.session.completed":
      const cookie = session.metadata?.firstCookie! + session.metadata?.secondCookie! + session.metadata?.thirdCookie! + session.metadata?.fourthCookie!
      const time = session.metadata?.time!
      console.log(time, cookie);
      
      const res = await fetch(process.env.BACKEND_URL + "/user/subscribe/" + time, {
        method: "POST",
        headers: {
          Cookie: `Session=${cookie}`,
        },
      });
      if (res.ok) {
        console.log(await res.json());
      } else {
        console.log("error");
      }
  }

  return NextResponse.json(null, { status: 200 });
}

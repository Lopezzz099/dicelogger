import { stripe } from "@/services/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// const getDate = () => {
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDate();
//   return { year, month, day };
// };

export type CheckoutReq = {
  priceId: string;
  userId: string;
};

export async function POST(req: Request) {
  const { priceId, userId } = await req.json();

  if (!priceId) {
    return NextResponse.json(
      { message: "priceId is required" },
      { status: 400 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { message: "userId is required" },
      { status: 400 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.URL}/suscription/?status=success`,
    cancel_url: `${process.env.URL}/suscription`,
    customer_email: "test@mail.com",
    metadata: {
      userId
    }
  });


  return NextResponse.json({ url: session.url });
}

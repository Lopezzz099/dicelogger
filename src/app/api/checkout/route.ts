import getUserData from "@/services/getUserData";
import { stripe } from "@/services/stripe";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type CheckoutReq = {
  priceId: string;
  time: number;
};

export async function POST(req: Request) {
  const cookie = cookies().get("Session")?.value

  try {
    const isSubscribed = await getIsSubscribed()
    if (isSubscribed) {
      return NextResponse.json(
        { message: "Already subscribed" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching subscription" },
      { status: 400 }
    );
  }

  const { priceId, time } = await req.json();

  if (!priceId) {
    return NextResponse.json(
      { message: "priceId is required" },
      { status: 400 }
    );
  }

  if (!time) {
    return NextResponse.json(
      { message: "Suscription duration is required" },
      { status: 400 }
    );
  }


  if (!cookie) {
    return NextResponse.json(
      { message: "Cookie is required" },
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
    metadata: {
      time: time.toString(),
      firstCookie: cookie.slice(0, cookie.length / 3),
      secondCookie: cookie.slice(cookie.length / 3, -cookie.length / 3),
      thirdCookie: cookie.slice((cookie.length / 3) * 2 +1, cookie.length)
    },
  });


  return NextResponse.json({ url: session.url });
}

const getIsSubscribed = async () => {
  try {
    const userData = await getUserData(cookies)
    return userData.subscribed
  } catch (error) {
    throw new Error("Error fetching user data")
  }
}

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
    if (!cookie) {
      return NextResponse.json(
        { message: "Cookie is missing" },
        { status: 400 }
      );
    }

    const isSubscribed = await getIsSubscribed(cookie)
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

  const stringArr = divideString(cookie)

  console.log(stringArr);

  if (stringArr.length === 4) {
    console.log("son 4"); 
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
      firstCookie: stringArr[0],
      secondCookie: stringArr[1],
      thirdCookie: stringArr[2],
      fourthCookie: stringArr[3],
    },
  });


  return NextResponse.json({ url: session.url });
}

const getIsSubscribed = async (cookie: string) => {
  try {
    const res = await fetch(process.env.BACKEND_URL + "/user/checkSub", {
      headers: {
        Cookie: `Session=${cookie}`
      }
    })
    if (res.ok) {
      console.log(await res.json());
      return true
    } else {
      return false
    }
  } catch (error) {
    throw new Error("Error fetching user data")
  }
}


const divideString = (originalString: string) => {
  const partLength = Math.ceil(originalString.length / 4);
  const parts: string[] = [];
  
  for (let i = 0; i < originalString.length; i += partLength) {
      parts.push(originalString.slice(i, i + partLength));
  }
  
  return parts;
}
import { NextResponse } from "next/server";
import { CampaignReq } from "../route";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      throw new Error("ID is missing");
    }

    const res = await fetch(`${process.env.BACKEND_URL}/campaign/${params.id}`);

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      throw new Error("Request failed with status " + res.status);
    }
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body: CampaignReq = await req.json();
  const { name, description, image, images, status, notes, dungeonMaster } =
    body;

  if (!params.id) {
    console.log(1);
    return NextResponse.json({ message: "ID is missing" }, { status: 400 });
  }

  if (!name || !description || !image || !status || !dungeonMaster) {
    return NextResponse.json(
      { message: "Required fields must be filled" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      process.env.BACKEND_URL + "/campaign/" + params.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dungeon_master: dungeonMaster,
          name,
          description,
          image,
          notes,
          status,
          images,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      return NextResponse.json(data, { status: 200 });
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      throw new Error("ID is missing");
    }

    const res = await fetch(
      `${process.env.BACKEND_URL}/campaign/${params.id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      return NextResponse.json(
        { message: "Campaign deleted successfully" },
        { status: 200 }
      );
    } else {
      throw new Error("Request failed with status " + res.status);
    }
  } catch (err: any) {
    const errorMessage = err.message;
    console.log(err);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

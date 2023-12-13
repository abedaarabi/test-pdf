import { db } from "@/lib/db";
import { chats, messages } from "@/lib/db/schema";

import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
export const runtime = "edge";

export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  const { chatId } = await req.json();
  console.log({ chatId });

  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    await db.delete(messages).where(eq(messages.chatId, chatId));

    return NextResponse.json("chat deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}

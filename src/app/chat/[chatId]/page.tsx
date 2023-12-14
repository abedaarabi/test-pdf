import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: { chatId: string };
}

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));

  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }
  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  //   const isPro = await checkSubscription();
  return (
    <div className="flex w-full max-h-screen ">
      {/* chat sidebar */}
      <div className="flex-[1] ">
        <ChatSideBar chats={_chats} chatId={parseInt(chatId)} />
      </div>

      <div className="flex items-center justify-center w-full h-full m-auto">
        {/* <div className="w-4/5 h-[90vh] text-gray-300 rounded-lg drop-shadow-xl bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"> */}
        <ChatComponent chatId={parseInt(chatId)} />
        {/* </div> */}
      </div>

      {/* <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
     
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <ChatComponent chatId={parseInt(chatId)} />
        </div> */}
    </div>
  );
};

export default ChatPage;

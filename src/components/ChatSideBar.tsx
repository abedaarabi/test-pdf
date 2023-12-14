"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  MessageCircle,
  PlusCircle,
  ArrowLeftCircle,
  ArrowRightCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Props {
  chats: DrizzleChat[];
  chatId: number;
}

const ChatSideBar = ({ chats, chatId }: Props) => {
  const [isHideSideBar, setIsHideSideBar] = React.useState(true);

  return (
    <div
      className={cn(
        "relative w-full h-full p-4 text-gray-300 bg-teal-600 transition-all duration-200  ease-in-out ",

        {
          "w-[30px] m-auto": isHideSideBar,
        }
      )}
    >
      <Button
        className="absolute right-[15%] top-2"
        variant="ghost"
        size="icon"
        onClick={() => setIsHideSideBar(!isHideSideBar)}
      >
        {isHideSideBar ? (
          <ArrowLeftCircle color="#fff" className="" />
        ) : (
          <ArrowRightCircle color="#fff" />
        )}
      </Button>

      {!isHideSideBar && (
        <div className="mt-8">
          {" "}
          <Link href="/">
            <Button className="w-full border-dashed border-white border bg-purple-400">
              <PlusCircle className="mr-2 w-4 h-4" />
              Create chat
            </Button>
          </Link>
          <div className="flex flex-col gap-2 mt-4">
            {chats.map((chat) => (
              <Link key={chat.id} href={`/chat/${chat.id}`}>
                <div
                  className={cn("rounded-lg p-3 text-white flex items-center", {
                    "bg-teal-400 text-white": chat.id === chatId,
                    "hover:text-gray-950": chat.id !== chatId,
                  })}
                >
                  <MessageCircle className="mr-2" />
                  <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                    {" "}
                    {chat.pdfName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 text-slate-500 flex-wr">
              <Link href={"/"}> Home</Link>
              <Link href={"/"}> Source</Link>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default ChatSideBar;

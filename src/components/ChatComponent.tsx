"use client";
import React, { Ref } from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send, Sparkles, Loader2, ArrowRightCircle } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import ChatForum from "./ChatForum";
import toast from "react-hot-toast";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const [isInput, setIsInput] = React.useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  // const focusRef = React.useCallback((inputElement: any) => {
  //   if (inputElement) {
  //     inputElement.focus();
  //   }
  // }, []);

  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    stop,
    isLoading: msgIsloading,
  } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      <div className="flex-col h-screen w-full">
        {/* header */}
        <div className="sticky top-0 inset-x-0 p-2 bg-teal-600 flex gap-1 items-center h-[5%]">
          <p className="text-base font-mono font-bold text-white ">
            ArteliaGPT..
          </p>
          <Sparkles className="text-yellow-300" />
        </div>
        <div className="m-auto  h-[80%] overflow-auto" id="message-container">
          {/* message list */}
          <MessageList
            messages={messages}
            isLoading={isLoading}
            msgIsloading={msgIsloading}
          />
        </div>
        <div className="bg-[#eaeaeb] h-[15%] flex items-center">
          <ChatForum
            handleSubmit={handleSubmit}
            input={input}
            handleInputChange={handleInputChange}
            msgIsloading={msgIsloading}
          />
        </div>
      </div>
    </>
  );
};

export default ChatComponent;

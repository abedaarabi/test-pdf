"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send, Sparkles } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const focusRef = React.useCallback((inputElement: any) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  console.log({ messages });

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
    <div
      className="relative w-full h-screen overflow-auto "
      id="message-container"
    >
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 h-fit flex gap-1 items-center">
        <h3 className="text-xl font-bold text-white">
          Chat With Project Model
        </h3>
        <Sparkles className="text-yellow-300" />
      </div>

      {/* message list */}
      <MessageList messages={messages} isLoading={isLoading} />

      <form onSubmit={handleSubmit} className=" bottom-0 inset-x-0 ">
        <div className="flex fixed bottom-2 w-full items-center justify-center ">
          <Input
            value={input}
            onChange={handleInputChange}
            ref={focusRef}
            placeholder="Ask any question..."
            className=" bg-white h-16 text-lg text-black w-[90%] relative rounded-lg"
          />
          <Button className="bg-blue-600 h-12 absolute  right-[6%]">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;

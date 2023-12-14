"use client";
import React, { Ref } from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import {
  Send,
  Sparkles,
  Eraser,
  ArrowLeftCircle,
  ArrowRightCircle,
} from "lucide-react";
import MessageList from "./MessageList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import ChatForum from "./ChatForum";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const [isInput, setIsInput] = React.useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery({
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

  const { mutate } = useMutation({
    mutationFn: async () => axios.post("/api/delete-chat", { chatId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] });

      toast.success("chats deleted");
    },
    onError: () => {
      toast.error("something went wrong!");
    },
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
        <div className="sticky top-0 inset-x-0 p-2 bg-teal-600 flex gap-1 items-center h-[7%] justify-between  w-full">
          <div className="flex ml-6 items-center">
         
            <p className="text-base font-mono font-bold text-white ">
              ArteliaGPT..
            </p>
            <Sparkles className="text-yellow-300" />
          </div>
          <Button
            className="mr-6"
            variant="ghost"
            size="icon"
            onClick={() => mutate()}
          >
            <Eraser color="#fff" className="h-5 w-5" />
          </Button>
        </div>
        <div className="m-auto  h-[78%] overflow-auto" id="message-container">
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
            stop={stop}
          />
        </div>
      </div>
    </>
  );
};

export default ChatComponent;

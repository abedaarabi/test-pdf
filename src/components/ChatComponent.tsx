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

  const inputRef = React.useRef<any>();

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

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      className="relative w-full h-screen overflow-auto "
      id="message-container"
    >
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 h-fit flex gap-1 items-center">
        {/* <h3 className="text-xl font-bold text-[#289085]">ArteliaGPT</h3> */}
        <Sparkles className="text-yellow-300" />
      </div>

      {/* message list */}
      <MessageList
        messages={messages}
        isLoading={isLoading}
        msgIsloading={msgIsloading}
      />

      <form onSubmit={handleSubmit} className=" bottom-0 inset-x-0 ">
        <div className="flex fixed bottom-2 w-full items-center justify-center ">
          <Input
            value={input}
            onChange={handleInputChange}
            ref={inputRef}
            placeholder="Ask any question..."
            className=" bg-white h-24 text-base text-black w-[90%] relative rounded-lg bg-opacity-5"
          />
          {!msgIsloading ? (
            <Button
              className="bg-slate-900 h-10 absolute  mt-6 right-[6%] "
              disabled={inputRef.current?.value === ""}
            >
              Send
              <ArrowRightCircle className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="bg-slate-900 h-10 absolute mt-6 right-[6%]"
              onClick={() => stop()}
            >
              Stop generation
              <Loader2 className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;

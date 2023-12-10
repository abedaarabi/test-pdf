import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2, Bot, User } from "lucide-react";
import React from "react";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!messages) return <></>;

  // console.log(messages);

  // const hasCodeBlock = messages[1].content.includes("```");
  // if (hasCodeBlock) {
  //   // If the content has code block, wrap it in a <pre><code> element
  //   const codeContent = messages[1].content.replace(
  //     /```([\s\S]+?)```/g,
  //     "</p><pre><code>$1</code></pre><p>"
  //   );

  //   console.log(codeContent);
  // } else console.log("code not inclouded");

  return (
    <div className="flex flex-col gap-2 px-4 mb-72">
      {messages.map((message) => {
        console.log(message);

        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": message.role === "user",
              "justify-start pr-10": message.role === "assistant",
            })}
          >
            <div
              className={cn(
                "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10 mb-6 text-black",
                {
                  // "bg-sky-400 text-white": message.role === "user",
                  // "bg-gray-400 text-white": message.role === "assistant",
                }
              )}
            >
              {message.role === "assistant" ? (
                <div className="flex items-center gap-1 ">
                  <Bot color="#1e293b" />
                  <p className={"text-black font-medium pt-1"}>
                    {"ArteliaGPT..."}
                  </p>
                </div>
              ) : (
                <div className="flex items-center  gap-1 ">
                  <User color="#1e293b" />
                  <p className={"text-black font-medium pt-2"}>{"You"}</p>
                </div>
              )}
              <p className="text-lg ">{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;

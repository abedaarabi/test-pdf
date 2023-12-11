import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2, Bot, User } from "lucide-react";
import React from "react";
import { CopyBlock } from "react-code-blocks";
type Props = {
  isLoading: boolean;
  msgIsloading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading, msgIsloading }: Props) => {
  const [codeBlock, setCodeBlock] = React.useState("");
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-900" />
      </div>
    );
  }
  if (!messages) return <></>;

  return (
    <div className="flex flex-col gap-2 px-4 mb-72">
      {messages.map((message) => {
        // const hasCodeBlock = message.content.includes("```");
        // if (hasCodeBlock) {
        //   // If the content has code block, wrap it in a <pre><code> element
        //   const codeContent = message?.content.replace(
        //     /```([\s\S]+?)```/g,
        //     "</p><pre><code>$1</code></pre><p>"
        //   );
        //   // setCodeBlock(codeContent);
        // }
        // console.log(codeBlock);

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
                "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10 mb-2 text-black",
                {
                  "bg-white text-stone-950": message.role === "user",
                  "bg-slate-500 text-white": message.role === "assistant",
                }
              )}
            >
              {!message.content && message.role === "assistant" && (
                <Loader2 className="w-6 h-6 animate-spin" />
              )}
              {message.role === "assistant" ? (
                <div className="flex items-center gap-1 ">
                  <Bot color="white" />
                  <p className={"text-white font-base pt-1"}>{"ArteliaGPT"}</p>
                </div>
              ) : (
                <div className="flex items-center   ">
                  <User color="#1e293b" />
                  <p className={"text-slate-800 font-base pt-1"}>{"You"}</p>
                </div>
              )}

              <p className="text-sm ">{message.content}</p>
              {/* {codeBlock && (
                <CopyBlock
                  text={codeBlock}
                  language={"javascript"}
                  showLineNumbers={true}
                />
              )} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;

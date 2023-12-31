// eslint-disable-file no-use-before-define

import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2, Bot, User } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
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
        <Loader2 className="w-6 h-6 animate-spin " />
      </div>
    );
  }
  if (!messages) return <></>;

  return (
    <div className="flex-col gap-2 px-4 mb-6 mt-6 w-[80%] m-auto max-sm:min-w-[100%]">
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
            className={
              // (cn("flex", {
              //   "justify-end pl-10": message.role === "user",
              //   "justify-start pr-10":
              //     message.role === "system" || message.role === "assistant",
              // }),
              "mb-4 "
            }
          >
            <div
              className="max-w-[80%] m-auto max-sm:min-w-[100%]"
              // className={cn(
              //   " px-3 text-sm py-1  ring-1 ring-gray-900/10 mb-2 text-black max-w-[80%]",
              //   {
              //     "bg-white text-stone-950": message.role === "user",
              //     "bg-slate-500 text-white":
              //       message.role === "system" || message.role === "assistant",
              //   }
              // )}
            >
              {!message.content && message.role === "system" && (
                <Loader2 className="w-6 h-6 animate-spin" />
              )}
              {message.role === "system" || message.role === "assistant" ? (
                <div className="flex items-center gap-1 ">
                  <Bot size={32} />
                  <p className={" font-bold pt-2 max-sm:text-sm"}>
                    {"AbedGPT"}
                  </p>
                </div>
              ) : (
                <div className="flex items-center   ">
                  <User size={30} />
                  <p className={" font-bold pt-2 max-sm:text-sm"}>{"You"}</p>
                </div>
              )}

              {/* <p className="text-sm ">{message.content}</p> */}
              {/* <div
                dangerouslySetInnerHTML={{ __html: message.content }}
                className="pl-7 font-mono mb-4 max-sm:text-base"
              /> */}
              {/* <Markdown
                rehypePlugins={[rehypeRaw, remarkGfm]}
                className="pl-7 font-mono mb-4 max-sm:text-base"
              >
                {message.content}
              </Markdown> */}

              <Markdown
                className="pl-8  mb-4 text-base max-sm:text-sm  prose dark:prose-invert"
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                remarkPlugins={[remarkGfm, remarkMath]}
                // eslint-disable-next-line react/no-children-prop
                children={message.content}
                components={{
                  a: LinkRenderer,

                  code(props) {
                    const { children, className, node, ...rest } = props;

                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      //@ts-ignore
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        // eslint-disable-next-line react/no-children-prop
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        style={a11yDark}
                        showLineNumbers
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
function LinkRenderer(props: any) {
  console.log({ props });
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className=" underline font-sans"
    >
      {props.href}
    </a>
  );
}

export default MessageList;

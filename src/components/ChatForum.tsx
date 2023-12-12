"use client";
import React, { Ref } from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send, Sparkles, Loader2, ArrowUpCircle, Loader } from "lucide-react";
type Props = {};

const ChatForum = ({
  handleSubmit,
  input,
  handleInputChange,
  msgIsloading,
}: any) => {
  const inputRef = React.useRef<any>();
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="rounded-lg w-[60%] m-auto relative">
      <form
        onSubmit={handleSubmit}
        className="flex  items-center justify-center gap-2"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
          placeholder="Ask any question..."
          className=" bg-white h-12 text-base text-black w-[80%] "
        />
        {!msgIsloading ? (
          <Button
            className="bg-slate-900 absolute right-[11%]"
            disabled={inputRef.current?.value === ""}
          >
            <ArrowUpCircle className="" />
          </Button>
        ) : (
          <Button
            className="bg-slate-900 absolute right-[12%]"
            onClick={() => stop()}
          >
            Stop
            <Loader className="h-4 w-4 ml-2" />
          </Button>
        )}
      </form>
    </div>
  );
};

export default ChatForum;

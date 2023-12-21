"use client";
import React, { Ref } from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send, Sparkles, Loader2, ArrowUpCircle, Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type Props = {};

const ChatForum = ({
  handleSubmit,
  input,
  handleInputChange,
  msgIsloading,
  stop,
}: any) => {
  const inputRef = React.useRef<any>();
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleKeyDown = (e: any) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === "Enter") {
      // Prevent the default behavior of the Enter key (form submission)
      e.preventDefault();
      // Call the submit function when Enter is pressed
      handleSubmit(e);
    } else if (e.key === "Escape") {
      cancelAction();
    }
  };
  const cancelAction = () => {
    stop();
  };

  return (
    <div className="rounded-lg w-[60%] m-auto relative max-sm:min-w-[90%]">
      <form
        onSubmit={handleSubmit}
        className="flex  items-center justify-center gap-2"
      >
        <Textarea
          onKeyDown={handleKeyDown}
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
          placeholder="Ask any question..."
          className="h-12 text-base  w-[80%]  max-sm:min-w-[100%]"
        />
        {!msgIsloading ? (
          <Button
            className=" absolute right-[12%]  max-sm:right-[1%]"
            disabled={inputRef.current?.value === ""}
            variant={"default"}
          >
            <ArrowUpCircle className="" color="#ffff" />
          </Button>
        ) : (
          <Button
            className="absolute right-[12%] max-sm:right-[1%]"
            onClick={cancelAction}
            variant={"default"}
          >
            Stop
            <Loader2 className="h-4 w-4 ml-2 animate-spin" color="#ffff" />
          </Button>
        )}
      </form>
    </div>
  );
};

export default ChatForum;

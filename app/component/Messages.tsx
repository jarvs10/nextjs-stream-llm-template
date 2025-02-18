import React from "react";
import Markdown from "./markdown";
import { User2, Bot } from "lucide-react";
import { Message } from "ai";

interface Props {
  messages: Message[];
  isLoading: boolean;
}

const RenderMessages = ({ messages, isLoading }: Props) => {
  return (
    <div
      id="chatbox"
      className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap"
    >
      {messages.map((m, index) => {
        return (
          <div
            key={index}
            className={`p-4 shadow-md rounded-md ml-10 relative ${
              m.role === "user" ? "bg-white text-black" : "text-white"
            }`}
          >
            <Markdown text={m.content} />
            {m.role === "user" ? (
              <User2 className="absolute bg-white top-2 -left-10 border rounded-full p-1 shadow-lg" />
            ) : (
              <Bot
                className={`absolute bg-white top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#0842A0] ${
                  isLoading && index === messages.length - 1
                    ? "animate-bounce"
                    : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RenderMessages;

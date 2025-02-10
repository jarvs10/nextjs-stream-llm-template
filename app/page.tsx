"use client";
import { useChat } from "ai/react";
import { Bot, Loader2, Send, User2 } from "lucide-react";
import Markdown from "./component/markdown";

export default function Home() {
  
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  } = useChat({
    api: "api/llm-response",
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-12 text-black">
      {/* form element */}
      {RenderForm()}
      {RenderMessages()}
      {/* rendering messages */}
    </main>
  );

  // inner render functions
  function RenderForm() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              prompt: input,
            },
          });
        }}
        className="w-full flex flex-row gap-2 justify-center items-center h-full"
      >
        <input
          type="text"
          placeholder={isLoading ? "Generating . . ." : "ask something . . . "}
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          className="border-b rounded-md overflow-hidden border-dashed outline-none w-[850px] px-4 py-2 focus:placeholder-transparent disabled:bg-transparent"
        />
        <button
          type="submit"
          className="rounded-full shadow-md border flex flex-row bg-white hover:bg-sky-600"
        >
          {isLoading ? (
            <Loader2
              onClick={stop}
              className="p-3 h-10 w-10 stroke-stone-800 animate-spin"
            />
          ) : (
            <Send className="p-3 h-10 w-10" />
          )}
        </button>
      </form>
    );
  }

  function RenderMessages() {
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
  }
}

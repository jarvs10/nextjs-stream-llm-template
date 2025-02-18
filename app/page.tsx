"use client";
import { useChat } from "ai/react";
import RenderForm from "./component/Form";
import RenderMessages from "./component/Messages";

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
      <RenderForm 
        isLoading={isLoading} 
        input={input} 
        handleInputChange={handleInputChange} 
        handleSubmit={handleSubmit} 
        stop={stop}
      />

      <RenderMessages 
        messages={messages} 
        isLoading={isLoading}
      />
    </main>
  );

}

import { Loader2, Send } from 'lucide-react';
import React from 'react'

interface RenderFormProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, data: any) => void;
  isLoading: boolean;
  stop: () => void;
}

const RenderForm = ({input, handleInputChange, handleSubmit, isLoading,stop}: RenderFormProps ) => {
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
  )
}

export default RenderForm

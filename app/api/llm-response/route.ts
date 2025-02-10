import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from 'ai';

export async function POST(req: Request, res: Response) {
  const messages = await req.json();
  const prompt = messages.data.prompt;

  const openai =createOpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
    // baseURL: 'https://api.together.xyz/v1/',
  });

  const result = await streamText({
    // model: openai('llama-3.3-70b-versatile'),
    // model: openai('meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo'),
    model: openai("deepseek-r1-distill-llama-70b"),
    prompt,
  });

  return result.toDataStreamResponse();
}

import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { NextResponse } from "next/server";
// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = "edge";

const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
   "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const maxDuration = 30;

export async function POST(req: Request) {
   const { messages } = await req.json();

   const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: "You are a helpful assistant providing information about an apartment complex",
      messages: convertToCoreMessages(messages),
   });

   return result.toDataStreamResponse({ headers: corsHeaders });
}

export async function OPTIONS(request: Request) {
   return NextResponse.json({}, { headers: corsHeaders });
}

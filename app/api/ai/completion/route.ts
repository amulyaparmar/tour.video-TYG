import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, generateText } from "ai";
import { NextResponse } from "next/server";
// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = "edge";

const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
   "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const maxDuration = 90;

export async function POST(req: Request) {
   const { prompt } = await req.json();

   const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: prompt,
   });
   return NextResponse.json({ response: text }, { headers: corsHeaders });
}

export async function OPTIONS(request: Request) {
   return NextResponse.json({}, { headers: corsHeaders });
}

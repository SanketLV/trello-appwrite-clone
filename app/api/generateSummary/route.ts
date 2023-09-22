import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  //* todos in the body of the POST req

  const { todos } = await request.json();
  console.log(todos);

  //* Communicate with OpenAI GPT
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", //* change to 'GPT_4' if you have access to it
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responding, welcome the user always as Mr.Sanket and say welcome to the Sanket Todo App! Limit the response to 300 characters`,
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data; ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  // const { data } = response;

  // console.log("DATA IS: ", data);
  // console.log("DATA IS: ", response);
  // console.log(response.choices[0].message);

  return NextResponse.json(response.choices[0].message);
}

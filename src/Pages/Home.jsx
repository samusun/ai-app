import React, { useState } from "react";
import { Textarea, Button } from "@mantine/core";
import { Configuration, OpenAIApi } from "openai";

export default function Home() {
  const [input, setInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  // const configuration = new Configuration({
  //     apiKey: "process.env.OPENAI_API_KEY",
  // });
  // const openai = new OpenAIApi(configuration);
  // const response = await openai.listEngines();

  // make a fetch request to the api and get a response back
  // set the response to the state variable aiResponse

  const getAiResponse = async (request) => {
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: request,
        temperature: 0,
        max_tokens: 70,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAiResponse(data.choices[0].text);
      });
  };

  return (
    <div className="h-screen bg-gray-800 flex items-center justify-center">
      <div className="w-8/12 space-y-2">
        <div className="min-h-24 bg-gray-100">{aiResponse} </div>
        <Textarea
          autosize
          placeholder="Write your message here"
          value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
        />
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          onClick={() => getAiResponse(input)}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Textarea, Button } from "@mantine/core";
// import { Configuration, OpenAIApi } from "openai";
import { useQuery } from "react-query";
import axios from "axios";
import OnboardingContext from "../Context/OnboardingContext";

export default function Home() {
  const [input, setInput] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const { state, dispatch } = useContext(OnboardingContext);
  const [disabled, setDisabled] = useState(false);

  // const configuration = new Configuration({
  //     apiKey: "process.env.OPENAI_API_KEY",
  // });
  // const openai = new OpenAIApi(configuration);
  // const response = await openai.listEngines();

  // make a fetch request to the api and get a response back
  // set the response to the state variable aiResponse

  const fetchAiResponse = useCallback(async () => {
    if (input !== "") {
      setDisabled(true);
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: input,
          temperature: 0.5,
          max_tokens: 70,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      return response.data.choices[0].text;
    }
  }, [input]);

  const { status, data, error, refetch } = useQuery(
    "aiResponse",
    fetchAiResponse
  );

  useEffect(() => {
    if (status === "success" && data) {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= data.length) {
          setDisplayedText(data.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    }
    setInput("");
    setDisabled(false);
  }, [status, data]);
  // if (status === 'loading') {
  //   return <div>Loading...</div>
  // }

  // if (status === 'error') {
  //   return <div>Error: {error.message}</div>
  // }
  const handleEnter = (event) => {
    if (event.key === "Enter" && !disabled) {
      refetch();
    }
  };
  return (
    <div className="h-screen bg-gray-800 flex items-center justify-center">
      <div className="w-8/12 space-y-2">
        <div className="min-h-24 bg-gray-100">{displayedText} </div>
        <Textarea
          autosize
          placeholder="Write your message here"
          value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
          onKeyPress={handleEnter}
        />
        <Button
          disabled={disabled}
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          onClick={() => refetch()}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

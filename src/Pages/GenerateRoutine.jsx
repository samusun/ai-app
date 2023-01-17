import React, { useCallback, useContext, useEffect, useState } from "react";
import { Textarea, Button } from "@mantine/core";
// import { Configuration, OpenAIApi } from "openai";
import { useQuery } from "react-query";
import axios from "axios";
import OnboardingContext from "../Context/OnboardingContext";

export default function GenerateRoutine() {
  const [input, setInput] = useState("");
  const [routine, setRoutine] = useState([]);
  const { state, dispatch } = useContext(OnboardingContext);
  const [disabled, setDisabled] = useState(false);

  const fetchAiResponse = useCallback(async () => {
    if (input !== "") {
      setDisabled(true);
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: input,
          temperature: 0.5,
          max_tokens: 500,
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
      let cleanResponse = data;
      const startIndex = cleanResponse.indexOf("!!!");
      cleanResponse = cleanResponse.substring(startIndex);
      let cleanResponse2 = cleanResponse;
      const endIndex = cleanResponse2.indexOf("} ]\n\n[\n");
      cleanResponse2 = cleanResponse2.substring(0, endIndex);

      setRoutine(JSON.parse(cleanResponse));
      console.log(routine);
      console.log("type of routine: ", typeof routine);
      console.log("type of routine: ", typeof { routine });
    }
    setInput("");
    setDisabled(false);
  }, [status, data]);

  //   useEffect(() => {
  //     if (status === "success" && data) {
  //       const schedule = data.map((item) => {
  //         <div>
  //           <h1>{item.day}</h1>
  //           {item.exercises.map((exercise) => {
  //             return <p>{exercise}</p>;
  //           })}
  //         </div>;
  //       });
  //       setRoutine(schedule);
  //     }
  //     setInput("");
  //     setDisabled(false);
  //   }, [status, data]);

  const handleEnter = (event) => {
    if (event.key === "Enter" && !disabled) {
      refetch();
    }
  };
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="w-8/12 space-y-2">
        <div className="min-h-24 bg-gray-100">
          {routine.length > 4 &&
            routine.map((day, index) => {
              return (
                <div key={`day${index}`}>
                  <h3>{day.day}</h3>
                  {day.exercises.map((exercise, i) => {
                    return <p key={i}>{exercise}</p>;
                  })}
                </div>
              );
            })}{" "}
        </div>
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

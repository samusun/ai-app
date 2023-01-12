import React, { useContext, useState } from "react";
import OnboardingContext from "../Context/OnboardingContext";
import { Button, NumberInput, Textarea } from "@mantine/core";

export default function Onboarding() {
  const { state, dispatch } = useContext(OnboardingContext);
  const [input, setInput] = useState("");
  console.log(state);

  const steps = [
    {
      step: 0,
      titel: "Let's find your new routine",
      undertitle:
        "TIPS: The more specific you are in the following questions - the more tailor made the AI will make your workout routine",
      id: "Onboarding",
      input: null,
      buttonText: "Let's go",
    },
    {
      step: 1,
      titel: "What is your goal?",
      id: "Goal",
      input: null,
      buttonText: "Next",
    },
    {
      step: 2,
      titel: "Your physiqe right now?",
      undertitle: "",
      id: "Physiqe",
      input: null,
      buttonText: "Next",
    },
    {
      step: 3,
      titel: "When do you wanna reach this?",
      undertitle: "",
      id: "Deadline",
      input: null,
      buttonText: "Next",
    },
    {
      step: 4,
      titel: "Days per week?",
      undertitle: "How many days per week do you wanna workout?",
      id: "DaysPerWeek",
      input: null,
      buttonText: "Next",
    },
    {
      step: 5,
      titel: "Age",
      undertitle: "How old are you buddy?",
      id: "Age",
      input: null,
      buttonText: "Finish",
    },
  ];

  const handleNextStep = () => {
    dispatch({
      type: "SET_INPUT",
      input: input,
      id: steps[state.step].id,
    });
    setInput("");
  };

  return (
    <div className="flex flex-col justify-center align-center">
      <h1>Onboarding</h1>
      <h2>{steps[state.step].titel}</h2>
      <h4>{steps[state.step].undertitle}</h4>
      {state.step !== 0 && (
        <Textarea
          autosize
          placeholder={steps[state.step].id}
          value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
        />
      )}
      <div>
        {state.step > 0 && (
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 105 }}
            onClick={() =>
              dispatch({
                type: "PREV_STEP",
              })
            }
          >
            Back
          </Button>
        )}
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          onClick={() => handleNextStep()}
        >
          {steps[state.step].buttonText}
        </Button>
      </div>

      <p>{state.step}/4</p>
    </div>
  );
}

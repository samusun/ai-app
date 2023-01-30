import React, { useContext, useState } from "react";
import OnboardingContext from "../Context/OnboardingContext";
import { Button, NumberInput, Slider, Textarea } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconArrowBack, IconArrowBearLeft } from "@tabler/icons";

export default function Onboarding() {
  const { state, dispatch } = useContext(OnboardingContext);
  const [input, setInput] = useState("");
  const [sliderInput, setSliderInput] = useState(3);
  const navigate = useNavigate();
  console.log(state);

  const steps = [
    {
      step: 0,
      titel: "Let's find your new routine",
      undertitle:
        "The following questions will help us to find the best routine for you",
      id: "Onboarding",
      input: null,
      options: ["Let's go"],
    },
    {
      step: 1,
      titel: "Where do you currently work out?",
      id: "location",
      options: ["Commercial Gym", "Home Gym", "Outside"],
      input: null,
      buttonText: "Next",
    },
    {
      step: 2,
      titel: "What's your current fitness goal?",
      undertitle: "",
      options: [
        "Lose Weight",
        "Gain Muscle",
        "Get Stronger",
        "Get shredded",
        "Improve overall fitness",
      ],
      id: "Goal",
      input: null,
      buttonText: "Next",
    },
    {
      step: 3,
      titel: "How many days a week would you like to workout?",
      undertitle: "",
      options: [],
      slider: true,
      stepsFrom: 1,
      stepsTo: 7,
      id: "DaysAWeek",
      input: null,
      buttonText: "Next",
    },

    {
      step: 4,
      titel: "When was the last time you worked out regularly?",
      undertitle: "",
      options: ["Years Ago", "Months Ago", "Weeks Ago", "I train regularly"],
      id: "LastWorkout",
      input: null,
      lastQuestion: true,
      buttonText: "Finish",
    },
    {
      step: 5,
      titel:
        "Good job! Your personal trainer would like to meet you and ask the last complementary questions in the chat",
      undertitle: "",
      options: [],
      id: "Last Step",
      input: null,
      lastStep: true,
    },
  ];

  // const handleNextStep = () => {
  //   if (state.step === 5) {
  //     navigate("/");
  //   } else {
  //     dispatch({
  //       type: "SET_INPUT",
  //       input: input,
  //       id: steps[state.step].id,
  //     });
  //     setInput("");
  //   }
  // };

  const MARKS = [
    { value: 1, label: "1 day" },
    { value: 2, label: "2 days" },
    { value: 3, label: "3 days" },
    { value: 4, label: "4 days" },
    { value: 5, label: "5 days" },
  ];
  return (
    <div className="h-screen bg-gray-800 flex flex-col items-center justify-center text-slate-200">
      {state.step > 0 && (
        <IconArrowBack
          className="absolute top-5 left-5"
          size={30}
          color="yellow"
          onClick={() =>
            dispatch({
              type: "PREV_STEP",
            })
          }
        />
      )}
      <div className=" flex flex-col justify-center items-center w-11/12">
        <h1>Onboarding</h1>
        <h2>{steps[state.step].titel}</h2>
        <h4>{steps[state.step].undertitle}</h4>
        {steps[state.step].options.map((option) => (
          <Button
            key={option}
            className="mb-4 w-5/6"
            variant="outline"
            color="gray"
            onClick={() =>
              dispatch({
                type: "SET_INPUT",
                input: option,
                id: steps[state.step].id,
              })
            }
          >
            {option}
          </Button>
        ))}
        {steps[state.step].slider && (
          <>
            <Slider
              onChangeEnd={setSliderInput}
              className="w-4/5"
              label={(val) => MARKS.find((mark) => mark.value === val).label}
              defaultValue={3}
              min={1}
              labelAlwaysOn
              max={5}
              color="dark"
              marks={MARKS}
              styles={{ markLabel: { display: "none" } }}
            />
            <Button
              className="mt-4 w-3/6"
              variant="outline"
              color="gray"
              onClick={() =>
                dispatch({
                  type: "SET_INPUT",
                  input: sliderInput,
                  id: steps[state.step].id,
                })
              }
            >
              Next
            </Button>
          </>
        )}
        {steps[state.step].lastStep && (
          <Button
            className="mt-4 w-3/6"
            variant="outline"
            color="gray"
            onClick={() => navigate("/chat")}
          >
            Go To Chat
          </Button>
        )}
        {/* // <Textarea
          //   autosize
          //   placeholder={steps[state.step].id}
          //   value={input}
          //   onChange={(event) => setInput(event.currentTarget.value)}
          //   minRows={2}
          //   required
          //   className="w-full pb-5"
          // /> */}
        <p>
          {state.step}/{steps.length - 1}
        </p>
      </div>
    </div>
  );
}

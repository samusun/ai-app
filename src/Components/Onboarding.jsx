import React, { useContext, useState } from "react";
import OnboardingContext from "../Context/OnboardingContext";
import {
  Button,
  TextInput,
  NumberInput,
  Slider,
  Textarea,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconArrowBack, IconArrowBearLeft } from "@tabler/icons";

export default function Onboarding() {
  const { state, dispatch } = useContext(OnboardingContext);
  const [input, setInput] = useState("");
  const [sliderInput, setSliderInput] = useState(3);
  const [name, setName] = useState("");
  const navigate = useNavigate();

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
      titel: "What should i call you?",
      id: "name",
      options: [],
      textfield: true,
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
      titel: "How would you describe your current fitness level?",
      id: "fitness_level",
      options: ["Beginner", "Intermediate", "Advanced", "Elite"],
      input: null,
      buttonText: "Next",
    },

    {
      step: 4,
      titel: "What's your favorite type of workout?",
      id: "workout_type",
      options: [
        "Cardio",
        "Weightlifting",
        "Yoga",
        "High-Intensity Interval Training (HIIT)",
      ],
      input: null,
      buttonText: "Next",
    },
    {
      step: 5,
      titel: "Where do you currently work out?",
      id: "location",
      options: ["Commercial Gym", "Home Gym", "Outside"],
      input: null,
      buttonText: "Next",
    },
    {
      step: 6,
      titel: "How many days a week would you like to workout?",
      id: "Days_per_week",
      undertitle: "",
      options: [],
      slider: true,
      stepsFrom: 1,
      stepsTo: 7,
      input: null,
      buttonText: "Next",
      min: 1,
      max: 7,
      default: 3,
      marks: [
        { value: 1, label: "1 day" },
        { value: 2, label: "2 days" },
        { value: 3, label: "3 days" },
        { value: 4, label: "4 days" },
        { value: 5, label: "5 days" },
        { value: 6, label: "6 days" },
        { value: 7, label: "7 days" },
      ],
      label: (val) =>
        steps[state.step].marks.find((mark) => mark.value === val).label,
    },

    {
      step: 7,
      titel: "What is your height?",
      id: "height",
      undertitle: "",
      options: [],
      slider: true,
      min: 100,
      max: 230,
      default: 150,

      metric: "cm",
      input: null,
      buttonText: "Next",
      label: (val) => `${val} cm`,
    },
    {
      step: 8,
      titel: "What is your weight?",
      id: "weight",
      undertitle: "",
      options: [],
      slider: true,
      min: 30,
      max: 200,
      default: 70,

      metric: "kg",
      input: null,
      buttonText: "Next",
      label: (val) => `${val} kg`,
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

  // Make to JSON: console.log(JSON.stringify(state));

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
              steps[state.step].step === 0
                ? dispatch({
                    type: "NEXT_STEP",
                  })
                : dispatch({
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
              label={(val) => steps[state.step].label(val)}
              defaultValue={steps[state.step].default}
              labelAlwaysOn
              min={steps[state.step].min}
              max={steps[state.step].max}
              color="light"
              marks={steps[state.step].marks}
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

        {steps[state.step].textfield && (
          <>
            <TextInput
              onChange={(event) => setName(event.currentTarget.value)}
              className="w-4/5"
              color="light"
            />
            <Button
              className="mt-4 w-3/6"
              variant="outline"
              color="gray"
              onClick={() =>
                dispatch({
                  type: "SET_INPUT",
                  input: name,
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

        <p>
          {state.step}/{steps.length - 1}
        </p>
      </div>
    </div>
  );
}

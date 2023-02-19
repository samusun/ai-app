import React, { useContext, useState } from "react";
import OnboardingContext from "../Context/OnboardingContext";
import {
  Button,
  TextInput,
  NumberInput,
  Slider,
  Textarea,
  Image,
  Progress,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  IconArrowAutofitLeft,
  IconArrowBack,
  IconArrowLeft,
  IconArrowBearLeft,
} from "@tabler/icons";

import maskot from "../Assets/maskot.svg";
import scepticMaskot from "../Assets/scepticMaskot.svg";

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
      image: maskot,
      id: "Onboarding",
      input: null,
      options: ["Let's go"],
    },

    {
      step: 1,
      titel: "What should i call you?",
      id: "name",
      image: scepticMaskot,
      options: [],
      textfield: true,
      buttonText: "Next",
    },

    {
      step: 2,
      titel: "What's your current fitness goal?",
      image: scepticMaskot,
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
      image: scepticMaskot,
      id: "fitness_level",
      options: ["Beginner", "Intermediate", "Advanced", "Elite"],
      input: null,
      buttonText: "Next",
    },

    {
      step: 4,
      titel: "What's your favorite type of workout?",
      image: maskot,
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
      image: scepticMaskot,
      id: "location",
      options: ["Commercial Gym", "Home Gym", "Outside"],
      input: null,
      buttonText: "Next",
    },
    {
      step: 6,
      titel: "How many days a week would you like to workout?",
      image: maskot,
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
        steps[state.step].marks?.find((mark) => mark.value === val).label,
    },

    {
      step: 7,
      titel: "What is your height?",
      image: scepticMaskot,
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
      image: scepticMaskot,
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
      image: maskot,
      titel: "Good job! Now let's start your journey to a better you",
      undertitle: "",
      options: [],
      id: "Last Step",
      input: null,
      lastStep: true,
    },
  ];

  const handleEnter = (event, id) => {
    if (event.key === "Enter") {
      dispatch({
        type: "SET_INPUT",
        input: sliderInput,
        id: id,
      });
    }
  };

  // Make to JSON: console.log(JSON.stringify(state));
  console.log();
  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      {state.step > 0 && (
        <div className="absolute top-10 ">
          <div className="flex flex-row items-center">
            <IconArrowLeft
              className="mr-6"
              size={30}
              color="gray"
              onClick={() =>
                dispatch({
                  type: "PREV_STEP",
                })
              }
            />
            <Progress
              className="w-60"
              color="lime"
              radius="xl"
              size="xl"
              value={((state.step + 1) / steps.length) * 100}
            />
            <IconArrowLeft className="ml-10" size={30} color="white" />
          </div>
        </div>
      )}
      <div className=" flex flex-col justify-center items-center w-11/12">
        <div className="flex flex-row">
          <Image
            width={150}
            fit="contain"
            src={steps[state.step].image}
            alt="dumbbells"
          />
          <div className="flex items-center p-4 mx-4 my-2 rounded-lg bg-white border border-black relative">
            <div className="absolute left-0 top-1/2 w-4 h-4 bg-white transform -translate-y-1/2 -translate-x-2.5 rotate-45 border-l border-t border-black"></div>
            <h2 className="text-base font-medium text-gray-900">
              {steps[state.step].titel}
            </h2>
            <div className="absolute left-0 top-0 bottom-0 w-4 h-full rounded-full bg-white border border-black -ml-2"></div>
          </div>
        </div>
        <h4>{steps[state.step].undertitle}</h4>
        {steps[state.step].options.map((option) => (
          <Button
            key={option}
            className="mb-4 w-5/6"
            variant="outline"
            radius="xl"
            color="green"
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
              color="green"
              radius="xl"
              marks={steps[state.step].marks}
              styles={{ markLabel: { display: "none" } }}
            />
            <Button
              className="mt-4 w-3/6"
              variant="outline"
              color="green"
              radius="xl"
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
              onKeyPress={(event) => handleEnter(event, steps[state.step].id)}
            />
            <Button
              className="mt-4 w-3/6"
              variant="outline"
              color="green"
              radius="xl"
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
            color="green"
            radius="xl"
            onClick={() => navigate("/home")}
          >
            Start Journey
          </Button>
        )}
      </div>
    </div>
  );
}

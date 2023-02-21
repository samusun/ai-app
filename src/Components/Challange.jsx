import React, { useState } from "react";

import { Button, Image, Progress, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons";
import maskotFlying from "../Assets/maskotFlying.svg";

import maskot from "../Assets/maskot.svg";
import scepticMaskot from "../Assets/scepticMaskot.svg";
import Confetti from "react-confetti";
import { useEffect } from "react";
import gem from "../Assets/gem.svg";

export default function Challange(day) {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      step: 0,
      instruction: "Prepare for your daily challange",
      image: maskot,
      buttonText: "Let's go",
    },

    {
      step: 1,
      title: "Challange 1",
      instruction: "Shake your ass like you mean it",
      image: scepticMaskot,
      buttonText: "Shake is done",
    },

    {
      step: 2,
      title: "Challange 2",
      instruction: "Find a staircase, and walk up",
      image: scepticMaskot,
      buttonText: "Done",
    },
    {
      step: 3,
      done: true,
      instruction: "Good job!",
      image: maskotFlying,
      buttonText: "Done",
    },
  ];

  const [showConfetti, setShowConfetti] = useState(false);

  const handleCelebrate = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000);
  };

  useEffect(() => {
    progress === steps.length - 1 && handleCelebrate();
  }, [progress]);

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      {showConfetti && <Confetti />}
      {progress > 0 && (
        <div className="absolute top-10 ">
          <div className="flex flex-row items-center">
            <IconArrowLeft
              className="mr-6"
              size={30}
              color="gray"
              onClick={() => setProgress(progress - 1)}
            />
            <Progress
              className="w-60"
              color="lime"
              radius="xl"
              size="xl"
              value={(progress / (steps.length - 1)) * 100}
            />
            <div className="flex flex-row items-center ml-5">
              <Image height={30} src={gem} alt="gem" />
              <Text className="font-bold text-lg ml-2">5</Text>
            </div>
          </div>
          <Title> {steps[progress].title}</Title>
        </div>
      )}
      <div className=" flex flex-col items-center justify-between h-96 w-11/12">
        <div className="flex flex-row ">
          <Image
            width={100}
            fit="contain"
            src={steps[progress].image}
            alt="dumbbells"
          />

          <h2 className="font-large text-gray-900">
            {steps[progress].instruction}
          </h2>
        </div>

        {!steps[progress].done && (
          <Button
            key={steps[progress].step}
            className="mb-4 w-5/6"
            variant="outline"
            radius="xl"
            color="green"
            onClick={() => setProgress(progress + 1)}
          >
            {steps[progress].buttonText}
          </Button>
        )}

        {steps[progress].step == steps.length - 1 && (
          <Button
            className="mt-4 w-3/6"
            variant="outline"
            color="green"
            radius="xl"
            onClick={() => navigate("/home")}
          >
            DONE
          </Button>
        )}
      </div>
    </div>
  );
}

import { Button, Image } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import maskotWelcome from "../Assets/maskotWelcome.svg";
import OnboardingContext from "../Context/OnboardingContext";
import Duolingo from "./Duolingo";

export default function Start() {
  const navigate = useNavigate();
  const { state } = useContext(OnboardingContext);

  if (state.step === 9) {
    return <Duolingo />;
  }
  return (
    <div className="min-h-screen flex bg-white items-center justify-center">
      <div className="flex flex-col jutsify-center m-5 items-center ">
        <Image src={maskotWelcome} alt="dumbbells" />
        <Button
          onClick={() => navigate("/onboarding")}
          radius="xl"
          size="xl"
          color="lime"
          rightIcon={<IconArrowRight size={24} />}
        >
          Start The Journey
        </Button>
        <Button
          className="mt-4"
          onClick={() => navigate("/home")}
          radius="xl"
          size="xl"
          color="blue"
          rightIcon={<IconArrowRight size={24} />}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

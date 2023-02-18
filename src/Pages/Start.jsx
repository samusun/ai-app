import { Button, Image, Text, Title } from "@mantine/core";
import { IconArrowRight, IconArrowRightCircle } from "@tabler/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import maskotWelcome from "../Assets/maskotWelcome.svg";

export default function Start() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-white items-center justify-center">
      <div className="flex flex-col h-60 jutsify-center m-5 items-center ">
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
      </div>
    </div>
  );
}

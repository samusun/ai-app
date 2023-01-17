import { Button, Text, Title } from "@mantine/core";
import { IconArrowRight, IconArrowRightCircle } from "@tabler/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col h-60 jutsify-center m-5 items-center space-y-4">
        <Title className="text-white">Get Fit Today</Title>
        <Text ta="center" className="text-white">
          Improve your workout using free AI based tools
        </Text>
        <Button
          onClick={() => navigate("/chat")}
          radius="xl"
          size="lg"
          rightIcon={<IconArrowRight size={24} />}
        >
          Start The Journey{" "}
        </Button>
      </div>
    </div>
  );
}

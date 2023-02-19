import { Image, Progress, Text } from "@mantine/core";
import { IconCircle, IconArrow, IconArrowDown } from "@tabler/icons";
import React, { useState } from "react";
import dumbbells from "../Assets/dumbbells.svg";
import fire from "../Assets/fire.svg";
import gem from "../Assets/gem.svg";
import star from "../Assets/star.svg";

const MainHeader = () => {
  return (
    <div className="pt-5 px-3 bg-black pb-4">
      <div className="flex flex-row w-full justify-between">
        <Image height={30} width={30} src={dumbbells} alt="dumbbells" />
        <div className="flex flex-row items-center">
          <Image height={30} src={fire} alt="dumbbells" />
          <Text className="font-bold text-lg ml-3">5</Text>
        </div>
        <div className="flex flex-row items-center">
          <Image height={30} src={gem} alt="dumbbells" />
          <Text className="font-bold text-lg ml-3">5</Text>
        </div>
        <div className="flex flex-row items-center">
          <Image height={30} src={star} alt="dumbbells" />
          <Text className="font-bold text-lg ml-3">5</Text>
        </div>
      </div>
      <Progress className="mt-5" color="red" radius="xl" size="xl" value={70} />
    </div>
  );
};

export default MainHeader;

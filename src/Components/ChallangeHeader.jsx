import { Image, Progress, Text } from "@mantine/core";
import React, { useState } from "react";

import gem from "../Assets/gem.svg";

const ChallangeHeader = () => {
  return (
    <div className="pt-5 px-3 bg-black pb-4">
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row items-center">
          <Image height={30} src={gem} alt="dumbbells" />
          <Text className="font-bold text-lg ml-3">5</Text>
        </div>
      </div>
      <Progress className="mt-5" color="red" radius="xl" size="xl" value={70} />
    </div>
  );
};

export default ChallangeHeader;

import {
  Box,
  Button,
  Group,
  Modal,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Accordion,
  AppShell,
  Navbar,
  Header,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import OnboardingContext from "../Context/OnboardingContext";
import situp from "../Assets/gif/situp_360.gif";
import HyperVideo from "../Assets/gif/Hyperextension_Hips.mp4";
import { IconEye } from "@tabler/icons";
import YouTube from "react-youtube";

const Routines = () => {
  const { state, dispatch } = useContext(OnboardingContext);
  const [opened, setOpened] = useState(false);
  const [selectedExcercise, setSelectedExcercise] = useState({});
  const excercises = [
    {
      name: "Situp",
      description: "Think about this and that",
      type: "gif",
      link: situp,
    },
    {
      name: "Push up",
      description: "Push up is good for abs",
      type: "youtube",
      link: "2g811Eo7K8U",
    },
    {
      name: "Pull up",
      description: "Think about: Breathing in when going up",
      type: "video",
      link: HyperVideo,
    },
  ];

  const daysArray = ["M", "T", "W", "T", "F", "S", "S"];
  const handleClick = (excercise) => {
    setOpened(true);
    setSelectedExcercise(excercise);
  };
  const list = excercises.map((excercise, i) => (
    <Accordion.Item
      key={excercise.name}
      // onClick={() => handleClick(excercise)}
      variant="separated"
      // color="grape"
      // className="mb-2 w-40 text-white"

      value={excercise.name}
    >
      <Accordion.Control>{excercise.name}</Accordion.Control>
      <Accordion.Panel>
        Colors, fonts, shadows and many other parts are customizable to fit your
        design needs
      </Accordion.Panel>
    </Accordion.Item>
  ));
  return (
    <>
      {/* <Modal
          size="sm"
          opened={opened}
          // title={selectedExcercise.name}
          onClose={() => setOpened(false)}
          withCloseButton={true}
          style={{ height: "70vh", overflow: "hidden" }}
          closeOnClickOutside
          closeOnEscape
        >
          {selectedExcercise.type === "youtube" && (
            <YouTube
              className="w-full h-full object-fit-contain"
              videoId={selectedExcercise.link}
              onReady={(event) => event.target.playVideo()}
            />
          )}
          {selectedExcercise.type === "video" && (
            <video
              className="object-cover"
              style={{ maxWidth: "100%", maxHeight: "100vh" }}
              autoPlay
              loop
              controls
            >
              <source src={selectedExcercise.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {selectedExcercise.type === "gif" && (
            <img
              className="object-cover"
              src={selectedExcercise.link}
              alt={selectedExcercise.name}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          )}
          <p>{selectedExcercise.description}</p>
        </Modal> */}

      <Title className="text-white">Routines</Title>
      <h2 className="text-white mb-5">Monday</h2>

      <Accordion defaultValue="customization">{list}</Accordion>
    </>
  );
};
export default Routines;

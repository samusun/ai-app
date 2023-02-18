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
  Checkbox,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import OnboardingContext from "../Context/OnboardingContext";
import situp from "../Assets/gif/situp_360.gif";
import HyperVideo from "../Assets/gif/Hyperextension_Hips.mp4";
import { IconEye, IconClock } from "@tabler/icons";
import YouTube from "react-youtube";
import crunch from "../Assets/gif/crunch.png";
import DateHeader from "../Components/DateHeader";

const Routines = () => {
  const { state, dispatch } = useContext(OnboardingContext);
  const [opened, setOpened] = useState(false);
  const [selectedExcercise, setSelectedExcercise] = useState({});
  const [chosenDay, setChosenDay] = useState("Monday");

  const gymWeek = {
    Monday: [
      {
        label: "Warm Up",
        time: 20,
        data: [
          {
            name: "Jumping Jacks",
            description: "Think about this and that",
            type: "gif",
            animation: situp,
            link: situp,
            setsReps: "2sets x 8-12 reps",
            PartOfTotaltime: 5,
          },
          {
            name: "Pull up",
            description: "Think about: Breathing in when going up",
            type: "video",
            animation: HyperVideo,
            link: HyperVideo,
            setsReps: "2sets x 4-5 reps",
            PartOfTotaltime: 5,
          },
          {
            name: "Bicycle",
            description: "Push up is good for abs",
            type: "gif",
            animation: situp,
            link: situp,
            setsReps: "10min x 70% of max",
            PartOfTotaltime: 10,
          },
        ],
      },
      {
        label: "Training",
        time: 25,
        data: [
          {
            name: "Push Up",
            description: "Think about this and that",
            type: "gif",
            animation: situp,
            link: situp,
            setsReps: "2sets x 8-12 reps",
            PartOfTotaltime: 10,
          },
          {
            name: "Bicep Pump",
            description: "Push up is good for abs",
            type: "gif",
            animation: situp,
            link: situp,
            setsReps: "2sets x 8-12 reps",
            PartOfTotaltime: 15,
          },
        ],
      },
      {
        label: "Cool Down",
        time: 17,
        data: [
          {
            name: "Bicep Curl",
            description: "Think about this and that",
            type: "gif",
            animation: situp,
            link: situp,
            setsReps: "2sets x 8-12 reps",
            PartOfTotaltime: 7,
          },
          {
            name: "Stretch",
            description: "Push up is good for abs",
            type: "gif",
            animation: situp,
            link: situp,
            setsReps: "2sets x 8-12 reps",
            PartOfTotaltime: 10,
          },
        ],
      },
    ],
    Tuesday: [
      {
        label: "Warm Up",
        time: 15,
        data: [
          {
            name: "Row",
            description: "Think about this and that",
            type: "gif",
            animation: situp,
            link: situp,
            setsReps: "2sets x 8-12 reps",
            PartOfTotaltime: 10,
          },
          {
            name: "Pull up",
            description: "Think about: Breathing in when going up",
            type: "video",
            animation: HyperVideo,
            link: HyperVideo,
            setsReps: "2sets x 4-5 reps",
            PartOfTotaltime: 5,
          },
        ],
      },
      {
        label: "Training",
        time: 25,
        data: [
          {
            name: "Bench",
            description: "Think about this and that",
            type: "gif",
            animation: situp,
            link: situp,
            setsReps: "2sets x 8-12 reps",
            PartOfTotaltime: 10,
          },
          {
            name: "Bicep Pump",
            description: "Push up is good for abs",
            type: "gif",
            animation: situp,
            link: situp,
            setsReps: "2sets x 8-12 reps",
            PartOfTotaltime: 15,
          },
        ],
      },
      {
        label: "Cool Down",
        time: 17,
        data: [
          {
            name: "Bicep Curl",
            description: "Think about this and that",
            type: "gif",
            animation: situp,
            link: situp,
            setsReps: "2sets x 8-12 reps",
            PartOfTotaltime: 7,
          },
          {
            name: "Stretch",
            description: "Push up is good for abs",
            type: "gif",
            animation: situp,
            link: situp,
            setsReps: "2sets x 8-12 reps",
            PartOfTotaltime: 10,
          },
        ],
      },
    ],
  };
  // const excercises = [
  //   {
  //     name: "Situp",
  //     description: "Think about this and that",
  //     type: "gif",
  //     link: situp,
  //   },
  //   {
  //     name: "Push up",
  //     description: "Push up is good for abs",
  //     type: "youtube",
  //     link: "2g811Eo7K8U",
  //   },
  //   {
  //     name: "Pull up",
  //     description: "Think about: Breathing in when going up",
  //     type: "video",
  //     link: HyperVideo,
  //   },
  // ];
  // Get the current date
  var date = new Date();

  // Create an empty array to store the dates of the current week

  const daysArray = [
    { dayCode: "M", dayValue: "Monday" },
    { dayCode: "T", dayValue: "Tuesday" },
    { dayCode: "W", dayValue: "Wednesday" },
    { dayCode: "T", dayValue: "Thursday" },
    { dayCode: "F", dayValue: "Friday" },
    { dayCode: "S", dayValue: "Saturday" },
    { dayCode: "S", dayValue: "Sunday" },
  ];
  const handleClick = (excercise) => {
    setOpened(true);
    setSelectedExcercise(excercise);
  };

  const list = gymWeek[chosenDay].map((block, i) => (
    <Accordion.Item
      key={block.label + i}
      // onClick={() => handleClick(excercise)}
      variant="separated"
      // color="grape"
      className=" text-white "
      value={block.label}
    >
      <div className="flex flex-row justify-around items-center">
        <Checkbox className="ml-3" />
        <Accordion.Control className=" text-white">
          <Group noWrap>
            <div className="w-2/6">{block.label}</div>
            <div className="ml-5 flex  flex-row items-center justify-center">
              <IconClock size={20} stroke={1.5} color="white" />
              {block.time}min
            </div>
          </Group>
        </Accordion.Control>
      </div>

      <Accordion.Panel>
        {block.data.map((excercise) => (
          <Group
            key={excercise.name + i}
            className="flex flex-row items-center justify-between mb-2"
            noWrap

            // onClick={() => handleClick(excercise)}
          >
            <div className="flex flex-row items-center justify-between">
              <Checkbox className="" />
              <div className="ml-2 mr-0">
                <h4 className="mb-0">{excercise.name}</h4>
                <p className="mt-0 text-yellow-400">{excercise.setsReps}</p>
              </div>
            </div>
            <div className=" flex flex-row items-center justify-center">
              <IconClock size={20} stroke={1.5} color="white" />
              <p className="w-10">{excercise.PartOfTotaltime}</p>
              <img
                className="ml-3"
                src={crunch}
                alt="1"
                style={{ maxWidth: "16vw", maxHeight: "16vh" }}
                onClick={() => handleClick(excercise)}
              />
            </div>
          </Group>
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  ));
  console.log(chosenDay);
  return (
    <div className="bg-black h-screen">
      <Modal
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
      </Modal>

      <Title className="text-white mt-5 mb-20">Todays Workout</Title>
      {/* <h2 className="text-white mb-5">{chosenDay}</h2> */}

      <Accordion
        className="px-2 text-white"
        variant="separated"
        defaultValue="customization"
        styles={{
          item: {
            backgroundColor: "#393D47",
            color: "#fff",
            border: "1px solid #ededed",
            "&[data-active]": {
              backgroundColor: "#393D47",
            },
          },
        }}
      >
        {list}
      </Accordion>
    </div>
  );
};
export default Routines;

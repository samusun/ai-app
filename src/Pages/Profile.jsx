import { useState, useContext } from "react";
// import { UserContext } from "./Context/UserContext";
import aiAvatar from "../Assets/aiAvatar.svg";

import {
  Box,
  Flex,
  Image,
  Text,
  Header,
  Input,
  FormControl,
  FormLabel,
  Button,
  Title,
} from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import OnboardingContext from "../Context/OnboardingContext";
import Signup from "./Signup";
import { IconLogout } from "@tabler/icons";

const Profile = () => {
  const theme = useMantineTheme();
  const { state, dispatch } = useContext(OnboardingContext);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAdress, setNewAdress] = useState("");

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return !state.loggedIn ? (
    <Signup />
  ) : (
    <div className="h-screen m-20">
      <div className="flex flex-col justify-center items-center ">
        <Image
          height={120}
          width={120}
          rounded="full"
          src={aiAvatar}
          alt="Profile"
          mr="5"
        />
        <Title fontWeight="medium" mb="2">
          {state.user.name}
        </Title>
        <Button
          variant="outline"
          onClick={() => {
            setEditing(!editing);
          }}
        >
          Edit Profile
        </Button>
      </div>

      {editing && (
        <div className="flex flex-col justify-center items-center">
          <div>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="John"
            />
            <Input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="John@gmail.com"
            />
            <Input
              value={newAdress}
              onChange={(e) => setNewAdress(e.target.value)}
              placeholder="Coolstreet 44"
            />
          </div>
          <Button
            variantColor="green"
            onClick={() => {
              //   setUser({ ...user, name: newName });
              setEditing(false);
            }}
          >
            Save Changes
          </Button>
        </div>
      )}

      <div className="flex justify-center items-center flex-col mt-20">
        <Text fontWeight="medium" mb="2">
          {state.user.email}
        </Text>
        {/* <Text fontWeight="medium" mb="2">
          Phone: 040456
          {state.user.phone}
        </Text>
        <Text fontWeight="medium" mb="2">
          Address: Coolstreet 44
          {state.user.address}
        </Text> */}
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    </div>
  );
};

export default Profile;

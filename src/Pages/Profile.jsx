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
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const Profile = () => {
  const theme = useMantineTheme();
  const { state, dispatch } = useContext(OnboardingContext);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAdress, setNewAdress] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await Auth.signIn(email, password);
    } catch (error) {
      setLoginError(error.message);
    }
  };

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  console.log();

  return !Auth?.user?.username ? (
    <div className="h-screen m-20">
      <div className="flex flex-col justify-center items-center ">
        <h1>Sign In</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {<p>{loginError}</p>}
        <Button className="mt-4" onClick={handleSignIn}>
          Sign In
        </Button>
        <p className="mb-1">Not a user yet?</p>
        <Button onClick={() => navigate("/signup")}>Sign up</Button>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    </div>
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
          {/* {state.user.name} */}
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
          {/* {state.user.email} */}
        </Text>
        {/* <Text fontWeight="medium" mb="2">
          Phone: 040456
          {state.user.phone}
        </Text>
        <Text fontWeight="medium" mb="2">
          Address: Coolstreet 44
          {state.user.address}
        </Text> */}
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
    </div>
  );
};

export default Profile;

import { graphqlOperation } from "@aws-amplify/api";
import { Button, PasswordInput, TextInput, Title } from "@mantine/core";
import { API, Auth } from "aws-amplify";

import React, { useContext, useState } from "react";
import OnboardingContext from "../Context/OnboardingContext";
import { listTodos } from "../graphql/queries";

function Signup() {
  const { state, dispatch } = useContext(OnboardingContext);
  const [responseError, setResponseError] = useState("");
  const [signupState, setSignupState] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    confirmEmail: false,
    verificationCode: "",
  });

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username: signupState.email,
        password: signupState.password,
        attributes: {
          name: signupState.name,
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log(user);
      setResponseError("User created successfully");
      setSignupState({ ...signupState, confirmEmail: true });
    } catch (error) {
      setResponseError(error.message);
    }
  }

  //workout.auth.us-east-1.amazoncognito.com
  // Re route back to https://main.d3lovymiw54b4j.amplifyapp.com/signin after signin
  // const fetchUsers = async () => {
  //   try {
  //     const todosData = await API.graphql(graphqlOperation(listTodos));
  //     const todosList = todosData.data.listTodos.items;
  //     console.log("song list", todosList);
  //   } catch (error) {
  //     console.log("error on fetching data", error);
  //   }
  // };

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupState({ ...signupState, [name]: value });
  };

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let usernameError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    if (!signupState.name) {
      nameError = "Name is required.";
    }

    if (
      !signupState.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupState.email)
    ) {
      emailError = "Invalid email address.";
    }

    if (
      !signupState.password ||
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(signupState.password)
    ) {
      passwordError =
        "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, and one number.";
    }

    if (signupState.password !== signupState.confirmPassword) {
      confirmPasswordError = "Passwords do not match.";
    }
    if (signupState.password !== signupState.confirmPassword) {
      confirmPasswordError = "Passwords do not match.";
    }

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        name: nameError,
        email: emailError,
        username: usernameError,
        password: passwordError,
        confirmPasswordError,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      signUp();
    }
  };

  async function confirmSignUp(verificationCode) {
    try {
      await Auth.confirmSignUp(signupState.email, verificationCode);
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      {!signupState.confirmEmail && (
        <>
          <Title className="text-white mb-10">Sign up</Title>

          <form
            className="flex justify-center flex-col"
            onSubmit={handleSubmit}
          >
            <div>
              <TextInput
                withAsterisk
                placeholder="Your name"
                name="name"
                value={signupState.name}
                onChange={handleChange}
              />
              <p className=" mt-1 text-red-400">{errors.name}</p>
            </div>

            <div>
              <TextInput
                withAsterisk
                name="email"
                placeholder="Email"
                value={signupState.email}
                onChange={handleChange}
              />
              <p className=" mt-1 text-red-400">{errors.email}</p>
            </div>
            <div>
              <PasswordInput
                withAsterisk
                name="password"
                placeholder="Password"
                value={signupState.password}
                onChange={handleChange}
              />
              <p className=" mt-1 text-red-400">{errors.password}</p>
            </div>
            <div>
              <PasswordInput
                withAsterisk
                name="confirmPassword"
                placeholder="Confirm password"
                value={signupState.confirmPassword}
                onChange={handleChange}
              />
              <p className=" mt-1 text-red-400">{errors.confirmPassword}</p>
            </div>
            <Button onClick={() => signUp(signupState)}>Submit</Button>

            <p>{responseError}</p>
          </form>
        </>
      )}
      {signupState.confirmEmail && (
        <>
          <Title className="text-white">Confirm your email</Title>
          <h4 className="text-white mb-5">A verification email is sent</h4>
          <form
            className="flex justify-center flex-col"
            onSubmit={handleSubmit}
          >
            <div>
              <TextInput
                withAsterisk
                placeholder="Verification Code"
                name="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <Button onClick={() => confirmSignUp(verificationCode)}>
              Submit
            </Button>
            <p>{responseError}</p>
          </form>
        </>
      )}
    </div>
  );
}

export default Signup;

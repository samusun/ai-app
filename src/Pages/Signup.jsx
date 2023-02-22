import { Button, PasswordInput, TextInput, Title } from "@mantine/core";
import Amplify, { API } from "aws-amplify";

import React, { useContext, useState } from "react";
import OnboardingContext from "../Context/OnboardingContext";

function Signup() {
  const { state, dispatch } = useContext(OnboardingContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const fetchUsers = async () => {
    try {
      const todosData = await API.graphql(graphqlOperation(listTodos));
      const TodosList = todosData.data.listTodos.items;
      console.log("song list", songList);
    } catch (error) {
      console.log("error on fetching data", error);
    }
  };

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    if (!formData.name) {
      nameError = "Name is required.";
    }

    if (!formData.email.includes("@")) {
      emailError = "Invalid email address.";
    }

    if (formData.password.length < 6) {
      passwordError = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      confirmPasswordError = "Passwords do not match.";
    }

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        name: nameError,
        email: emailError,
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
      dispatch({ type: "SIGNUP", payload: formData });
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <Title className="text-white">Sign up</Title>
      <h4 className="text-white mb-5">Signup to keep your progress</h4>
      <form className="flex justify-center flex-col" onSubmit={handleSubmit}>
        <div>
          <TextInput
            withAsterisk
            placeholder="Your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <p className=" mt-1 text-red-400">{errors.name}</p>
        </div>

        <div>
          <TextInput
            withAsterisk
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <p className=" mt-1 text-red-400">{errors.email}</p>
        </div>
        <div>
          <PasswordInput
            withAsterisk
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className=" mt-1 text-red-400">{errors.password}</p>
        </div>
        <div>
          <PasswordInput
            withAsterisk
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <p className=" mt-1 text-red-400">{errors.confirmPassword}</p>
        </div>
        <Button onClick={() => fetchUsers()}>Submit</Button>
      </form>
    </div>
  );
}

export default Signup;

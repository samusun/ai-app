import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { List, Input, Textarea, Tooltip, ThemeIcon } from "@mantine/core";
import { useQuery } from "react-query";
import { IconCircleCheck, IconCircleDashed, IconSend } from "@tabler/icons";
import aiAvatar from "../Assets/aiAvatar.png";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (response.text) {
      setMessages([...messages, { user: "bot", text: response.text }]);
    }
  }, [response]);

  const handleSubmit = useCallback(async () => {
    if (input !== "") {
      setDisabled(true);
      setMessages([...messages, { user: "me", text: input }]);
      const res = await axios
        .post(
          "https://api.openai.com/v1/completions",
          {
            model: "text-davinci-003",
            prompt: input,
            temperature: 0.1,
            max_tokens: 70,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            },
          }
        )
        .then((res) => {
          setResponse({ text: res.data.choices[0].text });
          setInput("");
          setDisabled(false);
        });
    }
  }, [input, messages]);

  const { status, data, error, refetch } = useQuery("aiResponse", handleSubmit);

  const aiIcon = (
    <ThemeIcon color="teal" size={24} radius="xl">
      <IconCircleCheck size={16} />
    </ThemeIcon>
    // <img src={aiAvatar} alt="aiAvatar" className="w-15 h-15" />
  );

  const userIcon = (
    <ThemeIcon color="blue" size={24} radius="xl">
      <IconCircleDashed size={16} />
    </ThemeIcon>
  );

  const handleEnter = (event) => {
    if (event.key === "Enter" && !disabled) {
      updateChat();
    }
  };
  const updateChat = useCallback(() => {
    setMessages([...messages, { user: "me", text: input }]);
    handleSubmit();
    setInput("");
    setDisabled(true);
  }, [input]);
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="h-full ">
      <div
        ref={divRef}
        className="absolute top-0 left-0 right-0 max-h-[36rem] overflow-y-scroll m-5"
      >
        {messages.map((item) => (
          <div
            className="mb-3"
            style={{ textAlign: item.user === "bot" ? "left" : "right" }}
          >
            {item.user === "bot" ? aiIcon : null} {item.text}{" "}
            {item.user === "me" ? userIcon : null}
          </div>
        ))}
      </div>

      <Textarea
        className="absolute bottom-20 left-0 w-full z-10"
        autosize
        placeholder="Write your message here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        minRows={2}
        disabled={disabled}
        onKeyPress={handleEnter}
        rightSection={
          <Tooltip
            label="This is public"
            position="top-end"
            withArrow
            onClick={() => handleSubmit()}
          >
            <div>
              <IconSend size={18} style={{ display: "block", opacity: 0.5 }} />
            </div>
          </Tooltip>
        }
      />
    </div>
  );
};

export default Home;

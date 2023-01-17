import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import axios from "axios";
import { List, Input, Textarea, Tooltip, ThemeIcon } from "@mantine/core";
import { useQuery } from "react-query";
import { IconCircleCheck, IconCircleDashed, IconSend } from "@tabler/icons";
import OnboardingContext from "../Context/OnboardingContext";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { state, dispatch } = useContext(OnboardingContext);

  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [response, setResponse] = useState({});

  useEffect(() => {
    state.loggedIn
      ? setInput(
          "You are a personal trainer called JJ who welcomes your friend back, asking him random questions about his workout"
        )
      : setInput(
          "You are a personal trainer called JJ who is taking an anamnesis before creating a personalized workout routine. You start the meeting with welcoming me"
        );
    setTimeout(refetch, 50);
  }, []);

  useEffect(() => {
    if (response.text) {
      setMessages([...messages, { user: "bot", text: response.text }]);
    }
  }, [response]);

  const handleSubmit = useCallback(async () => {
    if (input !== "") {
      disabled && setMessages([...messages, { user: "me", text: input }]);
      setDisabled(true);
      const res = await axios
        .post(
          "https://api.openai.com/v1/completions",
          {
            model: "text-davinci-003",
            prompt: `${input}. Always end your responses with atleast one question.`,
            temperature: 0.9,

            max_tokens: 100,
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

export default Chat;

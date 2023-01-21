import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";

import { Input, List, Textarea, ThemeIcon, Tooltip } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed, IconSend } from "@tabler/icons";
import { Configuration, OpenAIApi } from "openai";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const divRef = useRef(null);
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(false);

  const initialPromt =
    "user: You are a personal trainer called JJ who is taking an anamnesis before creating a personalized workout routine. You start the meeting with welcoming me. And you always end with a question relevant for the anamnesis";
  const [conversationHistory, setConversationHistory] = useState(
    `${initialPromt} \n`
  );

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handle_input = async (input) => {
    // Update the conversation history

    setMessages((prevState) => [...prevState, { user: "me", text: input }]);

    // Generate a response using GPT-3
    const message = await get_response(conversationHistory);
    // Update the conversation history
    // setDisabled(false);
    setMessages((prevState) => [...prevState, { user: "bot", text: message }]);
    setDisabled(false);
  };

  // console.log("conversationHistory", conversationHistory);
  const get_response = async () => {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${conversationHistory} user: ${input} \n JJ:`,
      max_tokens: 100,
      temperature: 0.7,
    });
    setConversationHistory(
      conversationHistory +
        `user: ${input} \n JJ: ${completion.data.choices[0].text} \n`
    );
    setInput("");
    return completion.data.choices[0].text;
  };

  const handleEnter = (event) => {
    if (event.key === "Enter" && !disabled) {
      handle_input(input);
    }
    setDisabled(true);
  };
  const chatSettings = {
    ai: {
      textAlign: "left",
      marginRight: "30px",
      color: "black",
      background:
        "linear-gradient(281deg, rgba(105,140,255,1) 0%, rgba(146,136,255,1) 100%)",
      borderRadius: "6px 6px 6px 0px",
      icon: (
        <ThemeIcon color="teal" size={24} radius="xl">
          <IconCircleCheck size={16} />
        </ThemeIcon>
      ),
    },
    me: {
      textAlign: "right",
      color: "white",
      marginLeft: "30px",
      background:
        "linear-gradient(280deg, rgba(0,191,16,1) 0%, rgba(106,204,70,1) 100%)",
      borderRadius: "3px 3px 0% 3px",
      icon: (
        <ThemeIcon color="blue" size={24} radius="xl">
          <IconCircleDashed size={16} />
        </ThemeIcon>
      ),
    },
  };

  const handleRequest = (input) => {
    setDisabled(true);
    handle_input(input);
  };

  useEffect(() => {
    const completion = openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: `${conversationHistory} user: ${input}`,
        max_tokens: 100,
        temperature: 0.7,
      })
      .then((response) => {
        setConversationHistory(
          conversationHistory +
            `user: ${input} \n response: ${response.data.choices[0].text} \n`
        );
        setInput("");
        setMessages((prevState) => [
          ...prevState,
          { user: "bot", text: response.data.choices[0].text },
        ]);
      });
  }, []);

  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [messages]);
  return (
    <div className="h-full bg-black">
      <div
        ref={divRef}
        className="absolute top-0 left-0 right-0 max-h-[36rem] overflow-y-scroll m-5"
      >
        {messages.map((item) => (
          <div
            className="mb-3 p-2"
            style={item.user === "bot" ? chatSettings.ai : chatSettings.me}
          >
            {/* {item.user === "bot" ? aiIcon : null}  */}
            {item.text}
            {/* {item.user === "me" ? userIcon : null} */}
          </div>
        ))}
      </div>
      <Textarea
        className="absolute bottom-20 px-3 left-0 right-0 "
        autosize
        placeholder="Write your message here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        minRows={2}
        disabled={disabled}
        onKeyPress={() => handleEnter}
        rightSection={
          <Tooltip
            label="This is public"
            position="top-end"
            withArrow
            onClick={() => {
              handleRequest(input);
            }}
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

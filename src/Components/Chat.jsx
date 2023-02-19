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

  const openaiCalled = useRef(false);

  const DEFAULT_PARAMS = {
    model: "text-davinci-002",
    temperature: 1,
    max_tokens: 256,
    top_p: 0.9,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  const initialPromt =
    "Write something super funny about workout, then welcome me to the chat, ask if i have any questions for a funny chat like you";
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
  };

  // console.log("conversationHistory", conversationHistory);
  const get_response = async () => {
    const completion = await openai.createCompletion({
      ...DEFAULT_PARAMS,
      prompt: `${conversationHistory} user: ${input} \n JJ:`,
    });
    setConversationHistory(
      conversationHistory +
        `user: ${input} \n JJ: ${completion.data.choices[0].text} \n`
    );
    setInput("");
    return completion.data.choices[0].text;
  };

  const handleEnter = (event) => {
    console.log(event.key);

    if (event.key === "Enter") {
      handleRequest(input);
    }
  };
  const chatSettings = {
    ai: {
      textAlign: "left",
      marginRight: "30px",
      color: "black",
      background:
        "linear-gradient(281deg, rgba(105,140,255,1) 0%, rgba(146,136,255,1) 100%)",
      borderRadius: "12px 12px 12px 0px",
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
      borderRadius: "12px 12px 0% 12px",
      icon: (
        <ThemeIcon color="blue" size={24} radius="xl">
          <IconCircleDashed size={16} />
        </ThemeIcon>
      ),
    },
  };

  const handleRequest = (input) => {
    console.log("convo history", conversationHistory);
    console.log("messages", messages);

    handle_input(input);
  };

  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [messages]);

  let completion;
  useEffect(() => {
    !openaiCalled.current &&
      (completion = openai
        .createCompletion({
          ...DEFAULT_PARAMS,
          prompt: `${conversationHistory}`,
        })
        .then((response) => {
          setConversationHistory(
            conversationHistory + `AI: ${response.data?.choices[0].text} \n`
          );
          setMessages((prevState) => [
            ...prevState,
            { user: "bot", text: response.data.choices[0].text },
          ]);
        }));
    openaiCalled.current = true;
  }, []);

  return (
    <div className="h-full bg-black">
      <div
        ref={divRef}
        className="absolute top-28 left-0 right-0 max-h-[36rem] overflow-y-scroll m-5"
      >
        {messages.map((item, i) => (
          <div
            className="mb-3 p-2"
            key={i}
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
        onKeyPress={(event) => handleEnter(event)}
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
              <IconSend
                className="z-30"
                size={18}
                style={{ display: "block", opacity: 0.5 }}
              />
            </div>
          </Tooltip>
        }
      />
    </div>
  );
};

export default Chat;

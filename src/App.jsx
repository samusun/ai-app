import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { useReducer, useState } from "react";
import OnboardingContext from "./Context/OnboardingContext";
import { initialValues, onboardingReducer } from "./reducers/onboardingReducer";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  AppShell,
  Footer,
  Header,
  NavLink,
  useMantineTheme,
} from "@mantine/core";
import {
  IconActivity,
  IconHome2,
  IconUserCircle,
  IconMessage,
} from "@tabler/icons";
import Start from "./Pages/Start";
import Chat from "./Components/Chat";
import Profile from "./Pages/Profile";
import Routines from "./Pages/Routines";
import Onboarding from "./Components/Onboarding";
import Duolingo from "./Pages/Duolingo";
import { useEffect } from "react";
import MainHeader from "./Components/MainHeader";
import Challange from "./Components/Challange";

const queryClient = new QueryClient();
export default function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [state, dispatch] = useReducer(onboardingReducer, initialValues);
  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;

  const navigateAndClose = (path) => {
    navigate(path);
    setOpened(false);
  };
  useEffect(() => {
    document.documentElement.classList.add("bg-black");
    return () => {
      document.documentElement.classList.remove("bg-black");
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <OnboardingContext.Provider value={{ state: state, dispatch: dispatch }}>
        {currentUrl === "/" ? (
          <Start />
        ) : currentUrl === "/onboarding" ? (
          <Onboarding />
        ) : currentUrl === "/challange" ? (
          <Challange />
        ) : (
          <AppShell
            padding="0"
            className="bg-black text-white "
            header={
              <Header className="p-0">
                <MainHeader />
              </Header>
            }
            footer={
              <Footer
                height={60}
                p="md"
                color="black"
                className="flex flex-row bg-black"
              >
                <NavLink
                  icon={<IconHome2 size={30} stroke={1.5} color="white" />}
                  onClick={() => navigateAndClose("/home")}
                  className="footer-link"
                />
                <NavLink
                  icon={<IconMessage size={30} stroke={1.5} color="white" />}
                  onClick={() => navigateAndClose("/chat")}
                  className="footer-link"
                />
                <NavLink
                  icon={<IconActivity size={30} stroke={1.5} color="white" />}
                  onClick={() => navigateAndClose("/routines")}
                  className="footer-link"
                />
                <NavLink
                  icon={<IconUserCircle size={30} stroke={1.5} color="white" />}
                  onClick={() => navigateAndClose("/profile")}
                  className="footer-link"
                />
              </Footer>
            }
          >
            <Routes>
              <Route exact path="/" element={<Start />} />
              <Route exact path="/onboarding" element={<Onboarding />} />
              <Route exact path="/chat" element={<Chat />} />
              <Route exact path="/home" element={<Duolingo />} />
              <Route exact path="/challange" element={<Challange />} />
              <Route exact path="/routines" element={<Routines />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </AppShell>
        )}
      </OnboardingContext.Provider>
    </QueryClientProvider>
  );
}

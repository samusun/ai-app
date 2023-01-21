import "./App.css";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { useReducer, useState } from "react";
import OnboardingContext from "./Context/OnboardingContext";
import { initialValues, onboardingReducer } from "./reducers/onboardingReducer";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  AppShell,
  Burger,
  Button,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  IconActivity,
  IconChevronRight,
  IconGauge,
  IconHome2,
  IconUserCircle,
  IconBrandHipchat,
  IconMessage,
} from "@tabler/icons";
import Signup from "./Pages/Signup";
import GenerateRoutine from "./Pages/GenerateRoutine";
import AiOnboarding from "./Components/Chat";
import Start from "./Pages/Start";
import Chat from "./Components/Chat";
import Profile from "./Pages/Profile";
import Routines from "./Pages/Routines";

// import MyNavbar from "./Components/MyNavbar";
// Navbar

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

  return (
    <QueryClientProvider client={queryClient}>
      <OnboardingContext.Provider value={{ state: state, dispatch: dispatch }}>
        {currentUrl === "/" ? (
          <Start />
        ) : (
          <AppShell
            padding="0"
            footer={
              <Footer
                height={60}
                p="md"
                color="black"
                className="flex flex-row bg-black"
              >
                <NavLink
                  icon={<IconHome2 size={30} stroke={1.5} color="white" />}
                  onClick={() => navigateAndClose("/")}
                />
                <NavLink
                  icon={<IconMessage size={30} stroke={1.5} color="white" />}
                  onClick={() => navigateAndClose("/chat")}
                />

                <NavLink
                  icon={<IconActivity size={30} stroke={1.5} color="white" />}
                  onClick={() => navigateAndClose("/routines")}
                />

                <NavLink
                  icon={<IconUserCircle size={30} stroke={1.5} color="white" />}
                  onClick={() => navigateAndClose("/profile")}
                />
              </Footer>
            }
          >
            <Routes>
              <Route exact path="/" element={<Start />} />
              <Route exact path="/chat" element={<Chat />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/routines" element={<Routines />} />
            </Routes>
          </AppShell>
        )}
      </OnboardingContext.Provider>
    </QueryClientProvider>
  );
}

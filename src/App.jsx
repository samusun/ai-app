import "./App.css";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { useReducer, useState } from "react";
import OnboardingContext from "./Context/OnboardingContext";
import { initialValues, onboardingReducer } from "./reducers/onboardingReducer";
import Onboarding from "./Components/Onboarding";

import { Route, Routes, useNavigate } from "react-router-dom";

import {
  AppShell,
  Burger,
  Button,
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
} from "@tabler/icons";
import Signup from "./Pages/Signup";

// import MyNavbar from "./Components/MyNavbar";
// Navbar

const queryClient = new QueryClient();

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [state, dispatch] = useReducer(onboardingReducer, initialValues);
  const navigate = useNavigate();
  const navigateAndClose = (path) => {
    navigate(path);
    setOpened(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <OnboardingContext.Provider value={{ state: state, dispatch: dispatch }}>
        <AppShell
          padding="0"
          // navbarOffsetBreakpoint="lg"
          // asideOffsetBreakpoint="lg"
          navbar={
            <Navbar
              className="bg-gray-300"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 300 }}
            >
              {/* <Box sx={{ width: 240 }}> */}
              <NavLink
                label="Home"
                icon={<IconHome2 size={16} stroke={1.5} />}
                onClick={() => navigateAndClose("/")}
              />
              <NavLink
                label="Onboarding"
                icon={<IconGauge size={16} stroke={1.5} />}
                onClick={() => navigateAndClose("/onboarding")}
              />

              <NavLink
                label="Profile"
                icon={<IconUserCircle size={16} stroke={1.5} />}
                onClick={() => navigateAndClose("/profile")}
                disabled
              />

              <NavLink
                label="Todays workout"
                icon={<IconActivity size={16} stroke={1.5} />}
                rightSection={<IconChevronRight size={12} stroke={1.5} />}
                // variant="subtle"

                active
              />
              <NavLink
                label="Previous Workouts"
                icon={<IconActivity size={16} stroke={1.5} />}
                rightSection={<IconChevronRight size={12} stroke={1.5} />}
                active
              />
            </Navbar>
          }
          // aside={
          //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          //     <Aside hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          //       <Text>Here we place menu</Text>
          //     </Aside>
          //   </MediaQuery>
          // }

          header={
            <Header height={{ base: 50, md: 70 }}>
              <div className="flex justify-between items-center h-full">
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <Title className="text-gray-600">Gym Buddy</Title>
                <Button
                  onClick={() => navigate("/signup")}
                  color="green"
                  className="mr-2"
                >
                  Signup
                </Button>
              </div>
            </Header>
          }
        >
          <IconBrandHipchat
            size={50}
            stroke={1.5}
            className="absolute -bottom-0 right-2 hover:bg-gray-700 transition duration-200 ease-in-out transform hover:scale-110"
            color="green"
          />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/onboarding" element={<Onboarding />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </AppShell>
      </OnboardingContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

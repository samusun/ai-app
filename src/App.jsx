import "./App.css";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { useReducer, useState } from "react";
import OnboardingContext from "./Context/OnboardingContext";
import { initialValues, onboardingReducer } from "./reducers/onboardingReducer";
import Onboarding from "./Components/Onboarding";

import {
  createBrowserRouter,
  Link,
  Router,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from "react-router-dom";

import {
  AppShell,
  Aside,
  Badge,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconActivity,
  IconChevronRight,
  IconCircleOff,
  IconGauge,
  IconHome2,
} from "@tabler/icons";

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
                label="Saved workouts"
                icon={<IconCircleOff size={16} stroke={1.5} />}
                disabled
              />
              <NavLink
                label="With description"
                description="Additional information"
                icon={
                  <Badge
                    size="xs"
                    variant="filled"
                    color="red"
                    sx={{ width: 16, height: 16, padding: 0 }}
                  >
                    3
                  </Badge>
                }
              />
              <NavLink
                label="Todays workout"
                icon={<IconActivity size={16} stroke={1.5} />}
                rightSection={<IconChevronRight size={12} stroke={1.5} />}
                variant="subtle"
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <Text>Gym Buddy</Text>
              </div>
            </Header>
          }
          footer={<Footer height={30}>Optional footer</Footer>}
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/onboarding" element={<Onboarding />} />
            {/* <Route exact path="/upcoming/:user" element={<Upcoming/>}/>
          <Route exact path="/record/:user" element={<Record/>}/>
          <Route path="*" element={<NotFound/>}/> */}
          </Routes>
        </AppShell>
      </OnboardingContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

{
  /* <AppShell
padding="0"
navbar={<MyNavbar />}
header={<Header height={30}>GymBuddy</Header>}
styles={(theme) => ({
  main: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
  },
})}
>

</AppShell> */
}

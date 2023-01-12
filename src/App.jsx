import "./App.css";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { useReducer, useState } from "react";
import OnboardingContext from "./Context/OnboardingContext";
import { initialValues, onboardingReducer } from "./reducers/onboardingReducer";
import Onboarding from "./Components/Onboarding";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AppShell,
  Aside,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";

// import MyNavbar from "./Components/MyNavbar";
// Navbar

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
]);

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [state, dispatch] = useReducer(onboardingReducer, initialValues);

  return (
    <QueryClientProvider client={queryClient}>
      <OnboardingContext.Provider value={{ state: state, dispatch: dispatch }}>
        <AppShell
          styles={{
            main: {
              background:
                theme.colorScheme === "darkTheme"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <Navbar
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 300 }}
            >
              <Text>Application navbar</Text>
            </Navbar>
          }
          // aside={
          //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          //     <Aside hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          //       <Text>Here we place menu</Text>
          //     </Aside>
          //   </MediaQuery>
          // }
          footer={<Footer height={60}>Optional footer</Footer>}
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
        >
          <RouterProvider router={router} />
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

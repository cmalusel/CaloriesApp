import React, { useState, useContext } from "react";
import { Moon, Sun } from "grommet-icons";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  grommet,
  Grommet,
  Header,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  ResponsiveContext,
  Text,
} from "grommet";
import { deepMerge } from "grommet/utils";
import SelectComponent from "./component/SelectComponent";

const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: "#1c1717",
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
  },
});

const AppBar = (props) => (
  <Header
    background="dark-2"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="small"
    {...props}
  />
);



const App = () => {
  const [dark, setDark] = useState(true);

  return (
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
      <Page>
        <AppBar>
          <Text size="large">Calories Counter</Text>
          <Button
            a11yTitle={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            icon={dark ? <Moon /> : <Sun />}
            onClick={() => setDark(!dark)}
            tip={{
              content: (
                <Box
                  pad="small"
                  round="small"
                  background={dark ? "dark-1" : "light-3"}
                >
                  {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </Box>
              ),
              plain: true,
            }}
          />
        </AppBar>
        <PageContent >
          <Box align={'start'} margin={{top: "large"}}>
            <SelectComponent/>
          </Box>

        </PageContent>
      </Page>
    </Grommet>
  );
};

export default App;

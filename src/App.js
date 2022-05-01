import React, { useState } from "react";
import type { Node } from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import getTheme from "./theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Player from "./screens/Player/Player";
const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  const [theme, setTheme] = useState(getTheme("dark"));
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Player" component={Player} />
          {/* <Stack.Screen name="Songs" component={Songs} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import type { Node } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { ThemeProvider } from "./theme/ThemeProvider";
import getTheme from "./theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Player from "./Player";
const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  const [theme, setTheme] = useState(getTheme("dark"));
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Player" component={Player} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

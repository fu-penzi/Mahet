import React, { useState } from "react";
import type { Node } from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import getTheme from "./theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import Player from "./screens/Player/Player";
import Songs from "./screens/Songs/Songs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();
const App: () => Node = () => {
  const [theme, setTheme] = useState(getTheme("dark"));
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerTintColor: theme.color.text,
            headerStyle: {
              height: route.name === "Player" ? 0 : 50,
              backgroundColor: "rgba(27, 27, 27, 0.85)",
            },
            tabBarStyle: {
              backgroundColor: theme.color.backgroundSecondary,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Player") {
                iconName = "play";
              }
              if (route.name === "Songs") {
                iconName = "music-box-multiple";
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.color.primary,
            tabBarInactiveTintColor: theme.color.textSecondary,
          })}>
          <Tab.Screen name="Player" component={Player} />
          <Tab.Screen name="Songs" component={Songs} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

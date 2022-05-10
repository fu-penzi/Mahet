import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Image } from "react-native";
import PlayerControls from "./PlayerControls";
import TextPar from "../../shared/Components/TextPar";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../theme/ThemeProvider";
export default function Player(): JSX.Element {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["rgba(27,27,27,0.51)", theme.color.background]}
        style={styles.contentWrapper}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={styles.trackImageWrap}>
            <Image
              style={styles.trackImage}
              source={require("maheta/resources/images/pexels-photo-580679.webp")}
            />
          </View>
          <View>
            <TextPar style={{ textAlign: "center" }} fontSize={30}>
              Lost Sanctuary
            </TextPar>
            <TextPar secondary style={{ textAlign: "center" }} fontSize={20}>
              Adrian Von Ziegler
            </TextPar>
          </View>
          <PlayerControls />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    padding: 30,
    paddingTop: 20,
  },
  highlight: {
    fontWeight: "700",
  },
  trackImageWrap: {
    height: 250,
    elevation: 5,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#000000",
    borderRadius: 5,
    overflow: "hidden",
  },
  trackImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    aspectRatio: 1.1 / 1,
    maxWidth: "100%",
  },
  playButton: {
    padding: 50,
    elevation: 30,
  },
});

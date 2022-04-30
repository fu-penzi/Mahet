/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import type { Node } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
} from "react-native-track-player";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Slider } from "@miblanchard/react-native-slider";
import { ThemeProvider } from "./theme/ThemeProvider";
import getTheme from "./theme/theme";

const setupIfNecessary = async () => {
  try {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      return;
    }
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });

    await TrackPlayer.add({
      url: "https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-equinox.mp3",
      title: "Equinox",
      artist: "Purple Cat",
      artwork: "https://picsum.photos/id/1016/200/300",
      album: "",
      duration: 140,
    });
    // TrackPlayer.setRepeatMode(RepeatMode.Queue);
  } catch (e) {
    console.log(e);
    // to-do handle error
  }
};

const togglePlayback = async (playbackState: State) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    // TODO: Perhaps present an error or restart the playlist?
  } else {
    if (playbackState !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};
const ControlButton = props => {
  const shadow = props.dropShadow
    ? {
        shadowOpacity: 0.36,
        textShadowRadius: 6.68,
        textShadowOffset: { width: 0, height: 5 },
      }
    : {};

  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon
        name={props.icon}
        // style={{...shadow}}
        size={props.size}
        color={props.color}
      />
    </TouchableOpacity>
  );
};
const App: () => Node = () => {
  const [theme, setTheme] = useState(getTheme("dark"));
  const playbackState = usePlaybackState();
  const [slider, setSlider] = useState(0);
  useEffect(() => {
    setupIfNecessary();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} /> */}
        <StatusBar barStyle="light-content" />

        <LinearGradient
          colors={["rgba(27,27,27,0.51)", theme.colors.background]}
          style={[styles.contentWrapper, { color: theme.colors.font }]}>
          {/* <PlayerControls /> */}
          <View
            style={{
              alignSelf: "center",
              elevation: 5,
            }}>
            <Image
              style={styles.trackCover}
              source={require("../resources/images/pexels-photo-580679.webp")}
            />
          </View>
          <View style={{ marginTop: 50 }}>
            <Slider
              thumbTintColor={theme.colors.primary}
              minimumTrackTintColor={theme.colors.primary}
              thumbStyle={{ elevation: 5 }}
              value={slider}
              step={1}
              maximumValue={0}
              maximumValue={100000}
              onValueChange={value => setSlider(value)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 20,
            }}>
            <ControlButton
              icon="skip-previous"
              color={theme.colors.font}
              size={72}
            />
            <ControlButton
              onPress={() => togglePlayback(playbackState)}
              icon="play-circle"
              color={theme.colors.primary}
              size={108}
              dropShadow
            />
            <ControlButton
              icon="skip-next"
              color={theme.colors.font}
              size={72}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    // backgroundColor: colors.background,
    padding: 30,
    justifyContent: "center",
  },
  highlight: {
    fontWeight: "700",
  },
  trackCover: {
    width: 320,
    height: 250,
  },
  playButton: {
    padding: 50,
    elevation: 30,
  },
});

export default App;

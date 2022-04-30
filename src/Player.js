<<<<<<< HEAD
=======
/* eslint-disable react-native/no-inline-styles */
>>>>>>> 4a11323eb2134a6f9a8520f6859616f7e9c95413
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
<<<<<<< HEAD
import { ThemeProvider, useTheme } from "./theme/ThemeProvider";
import getTheme from "./theme/theme";
import PlayerControls from "./PlayerControls";
import TextPar from "./shared/TextPar";
import LinearGradient from "react-native-linear-gradient";
=======
import LinearGradient from "react-native-linear-gradient";
import { ThemeProvider } from "./theme/ThemeProvider";
import getTheme from "./theme/theme";
import PlayerControls from "./PlayerControls";
import TextPar from "./shared/TextPar";
import { useTheme } from "@react-navigation/native";
>>>>>>> 4a11323eb2134a6f9a8520f6859616f7e9c95413
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
export default function Player(props) {
  const theme = useTheme();
  const playbackState = usePlaybackState();
  useEffect(() => {
    setupIfNecessary();
  }, []);
  const togglePlayback = async () => {
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["rgba(27,27,27,0.51)", theme.colors.background]}
        style={styles.contentWrapper}>
        <View
          style={{
            alignSelf: "center",
            elevation: 5,
          }}>
          <Image
            style={styles.trackCover}
            source={require("../resources/images/pexels-photo-580679.webp")}
          />
          <View style={{ marginTop: 30 }}>
            <TextPar style={{ textAlign: "center", fontSize: 30 }}>
              Lost Sanctuary
            </TextPar>
            <TextPar disabled style={{ textAlign: "center", fontSize: 20 }}>
              Adrian Von Ziegler
            </TextPar>
          </View>
        </View>
        <PlayerControls togglePlayback={togglePlayback} />
      </LinearGradient>
    </SafeAreaView>
  );
}

Player.propTypes = {};

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

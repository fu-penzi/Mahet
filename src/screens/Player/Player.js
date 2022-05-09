import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { SafeAreaView, StatusBar, StyleSheet, View, Image } from "react-native";
import TrackPlayer, { Capability } from "react-native-track-player";
import PlayerControls from "./PlayerControls";
import TextPar from "../../shared/Components/TextPar";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../theme/ThemeProvider";
import getPermissions from "../../shared/getPermissions";
import getMusicFiles from "./getMusicFiles";
const addToQueue = async songs => {
  console.log("Adding tracks to queue", songs);
  if (!Array.isArray(songs)) {
    return;
  }
  //
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    return;
  }
  //
  songs.forEach(element => {
    TrackPlayer.add({
      url: element.uri,
      title: element.title,
      artist: element.artist,
      album: element.albumName,
      duration: element.duration,
      // artwork: "https://picsum.photos/id/1016/200/300",
    });
  });
};
export default function Player() {
  const theme = useTheme();
  useEffect(() => {
    const setupIfNecessary = async () => {
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
    };
    setupIfNecessary().catch(err => console.error(err));
  }, []);
  useEffect(() => {
    getPermissions()
      .then(areGranted => {
        if (areGranted) {
          console.log("Permissions granted");
          return getMusicFiles();
        }
      })
      .then(res => addToQueue(res))
      .catch(err => console.error(err));
  }, []);

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

Player.propTypes = {};

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

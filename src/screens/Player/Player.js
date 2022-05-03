import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SafeAreaView, StatusBar, StyleSheet, View, Image } from "react-native";
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
} from "react-native-track-player";
import PlayerControls from "./PlayerControls";
import TextPar from "../../shared/Components/TextPar";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../theme/ThemeProvider";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import * as RNFS from "react-native-fs";
// import MusicMetadataWrapper from "react-native-music-metadata";
const requestPermissions = async () => {
  request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
    check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)",
            );
            break;
          case RESULTS.DENIED:
            console.log(
              "The permission has not been requested / is denied but requestable",
            );
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            console.log("The permission is granted");
            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch(error => {
        // …
      });
  });
};
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

    await requestPermissions();
    // try {
    //   const metadata = await parseFile(
    //     `file://${RNFS.DownloadDirectoryPath}/206.mp3`,
    //   );
    //   // console.log(util.inspect(metadata, { showHidden: false, depth: null }));
    // } catch (error) {
    //   console.error(error.message);
    // }

    TrackPlayer.add({
      url: `file://${RNFS.DownloadDirectoryPath}/206.mp3`,
      title: "Equinox",
      artist: "Purple Cat",
      artwork: "https://picsum.photos/id/1016/200/300",
      album: "",
      duration: 143,
    });

    // await TrackPlayer.add({
    //   url: "https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-equinox.mp3",
    //   // url: "file:////storage/emulated/0/Download/206.mp3",
    //   title: "Equinox",
    //   artist: "Purple Cat",
    //   artwork: "https://picsum.photos/id/1016/200/300",
    //   album: "",
    //   duration: 140,
    // });
    // TrackPlayer.setRepeatMode(RepeatMode.Queue);
  } catch (e) {
    console.log(e);
  }
};
export default function Player() {
  const theme = useTheme();
  const [playing, setPlaying] = useState(false);
  const playbackState = usePlaybackState();
  useEffect(() => {
    setupIfNecessary();
    RNFS.readDir(RNFS.DownloadDirectoryPath).then(files => console.log(files));
    // MusicMetadataWrapper.getMetadata([
    //   `file://${RNFS.DownloadDirectoryPath}/206.mp3`,
    // ])
    //   .then(tracks => {
    //     tracks.forEach(track => {
    //       console.log(`${track.title} by ${track.artist}`);
    //     });
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }, []);
  const togglePlaying = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      throw new Error("Tekst dolny");
      // TODO: Perhaps present an error or restart the playlist?
    } else {
      if (playbackState !== State.Playing && !playing) {
        await TrackPlayer.play();
      } else if (playing) {
        await TrackPlayer.pause();
      }
    }
    setPlaying(state => !state);
  };
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
          <PlayerControls togglePlayback={togglePlaying} playing={playing} />
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

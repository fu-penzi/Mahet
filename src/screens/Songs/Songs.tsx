import React, { useState } from "react";
import { StatusBar, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../mock/images";
import usePassTheme from "../../hooks/usePassTheme";
import Song from "src/screens/Songs/Song";
import { useData } from "src/providers/DataProvider";
import TrackPlayer from "react-native-track-player";
import { usePlayerControl } from "src/providers/PlayerControlProvider";
export default function Songs() {
  const [trackInQueue, setTrackInQueue] = useState<number>();
  const styles = usePassTheme(makeStyles);
  const tracks = useData();
  const { playing, togglePlaying } = usePlayerControl();
  const playSongs = async (idx: number) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack === null || trackInQueue === undefined) {
      tracks?.forEach(track => {
        TrackPlayer.add(track);
      });
    }
    if (trackInQueue === idx) {
      togglePlaying();
    } else {
      if (!playing) {
        togglePlaying();
      }
      TrackPlayer.skip(idx).then(() => setTrackInQueue(idx));
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.contentWrapper}>
        <View>
          {tracks &&
            tracks.map((track, i) => (
              <Song
                key={i}
                title={track.title}
                artist={track.artist ? track.artist : ""}
                image={images[i]}
                playing={i === trackInQueue}
                onPress={() => playSongs(i)}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const makeStyles = (theme: any) =>
  StyleSheet.create({
    contentWrapper: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.color.background,
    },
    trackImageWrap: {
      height: 50,
      elevation: 5,
      alignItems: "center",
      backgroundColor: "#000000",
      marginRight: 10,
    },
    trackImage: {
      flex: 1,
      width: undefined,
      height: undefined,
      aspectRatio: 1 / 1,
      resizeMode: "cover",
      maxWidth: "100%",
    },
  });

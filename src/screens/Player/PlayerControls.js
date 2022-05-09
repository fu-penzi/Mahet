import React, { useState } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Slider } from "@miblanchard/react-native-slider";
import TextPar from "../../shared/Components/TextPar";
import { useTheme } from "../../theme/ThemeProvider";
import ControlButton from "../../shared/Components/ControlButton";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
function PlayerControls() {
  const { color } = useTheme();
  const [slider, setSlider] = useState(0);
  const [playing, setPlaying] = useState(false);
  const playbackState = usePlaybackState();

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
  const handleSkip = async () => {
    await TrackPlayer.skipToNext().catch(e =>
      console.log("Already last track in queue"),
    );
  };
  const handlePrev = async () => {
    await TrackPlayer.skipToPrevious().catch(e =>
      console.log("Already fist track in queue"),
    );
  };
  const handleToggleRepeat = async () => {
    // TrackPlayer.setRepeatMode(RepeatMode.Queue);
  };
  return (
    <View>
      <View>
        <Slider
          thumbTintColor={color.primary}
          minimumTrackTintColor={color.primary}
          thumbStyle={{ elevation: 5, width: 13, height: 13 }}
          value={slider}
          step={1}
          minimumValue={0}
          maximumValue={100000}
          onValueChange={value => setSlider(value)}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextPar style={{ marginTop: -10 }}>2:40</TextPar>
          <TextPar style={{ marginTop: -10 }}>5:50</TextPar>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <ControlButton icon="shuffle" />
        {/* <ControlButton icon="shuffle-variant" /> */}
        {/* <ControlButton icon="shuffle-disabled" /> */}
        <ControlButton icon="skip-previous" onPress={handlePrev} />
        <ControlButton
          onPress={togglePlaying}
          circular
          icon={playing ? "pause" : "play"}
          dropShadow
        />
        <ControlButton icon="skip-next" onPress={handleSkip} />
        <ControlButton icon="repeat" />
        {/* <ControlButton icon="repeat-once" /> */}
      </View>
    </View>
  );
}
PlayerControls.propTypes = {};
const styles = {
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
export default PlayerControls;

import React, { useState } from "react";
import { View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import TextPar from "../../shared/Components/TextPar";
import { useTheme } from "../../theme/ThemeProvider";
import ControlButton from "../../shared/Components/ControlButton";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { usePlayerControl } from "src/providers/PlayerControlProvider";
function PlayerControls() {
  const { color } = useTheme();
  const { playing, togglePlaying } = usePlayerControl();
  const { position, duration } = useProgress(100);
  const [sliderHold, setSliderHold] = useState(false);
  const [sliderValue, setSliderValue] = useState();
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
  const handleSlidingComplete = async value => {
    // TODO: write my own timer
    await TrackPlayer.seekTo(value[0]);
    setTimeout(() => setSliderHold(false), 1000);
  };
  let pos = sliderHold ? sliderValue : position;
  let posMin = Math.floor(pos / 60);
  let posSec = `${Math.floor(pos - posMin * 60)}`.padStart(2, "0");
  let durMin = Math.floor(duration / 60);
  let durSec = `${Math.floor(duration - durMin * 60)}`.padStart(2, "0");
  return (
    <View>
      <View>
        <Slider
          thumbTintColor={color.primary}
          minimumTrackTintColor={color.primary}
          thumbStyle={{ elevation: 5, width: 13, height: 13 }}
          value={pos}
          step={1}
          minimumValue={0}
          maximumValue={duration}
          onValueChange={value => setSliderValue(value[0])}
          onSlidingStart={() => setSliderHold(true)}
          onSlidingComplete={handleSlidingComplete}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextPar style={{ marginTop: -10 }}>
            {posMin}
            {":"}
            {posSec}
          </TextPar>
          <TextPar style={{ marginTop: -10 }}>
            {durMin}
            {":"}
            {durSec}
          </TextPar>
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
const styles = {
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
export default PlayerControls;

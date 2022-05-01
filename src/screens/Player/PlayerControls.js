import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Slider } from "@miblanchard/react-native-slider";
import TextPar from "../../shared/Components/TextPar";
import { useTheme } from "../../theme/ThemeProvider";
import ControlButton from "../../shared/Components/ControlButton";
import usePassTheme from "../../shared/usePassTheme";

function PlayerControls({ togglePlayback }) {
  const { color } = useTheme();
  const [slider, setSlider] = useState(0);
  return (
    <View>
      <View>
        <Slider
          thumbTintColor={color.primary}
          minimumTrackTintColor={color.primary}
          thumbStyle={{ elevation: 5, width: 13, height: 13 }}
          value={slider}
          step={1}
          maximumValue={0}
          maximumValue={100000}
          onValueChange={value => setSlider(value)}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextPar style={{ marginTop: -10 }}>2:40</TextPar>
          <TextPar style={{ marginTop: -10 }}>5:50</TextPar>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <ControlButton icon="skip-previous" />
        <ControlButton
          //   onPress={togglePlayback}
          circular
          icon="play"
          dropShadow
        />
        <ControlButton icon="skip-next" />
      </View>
    </View>
  );
}
PlayerControls.propTypes = {};
const styles = {
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5,
  },
};
export default PlayerControls;

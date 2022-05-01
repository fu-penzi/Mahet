import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Slider } from "@miblanchard/react-native-slider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "./theme/ThemeProvider";
import TextPar from "./shared/TextPar";

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
        // style={{ ...shadow }}
        size={props.size}
        color={props.color}
      />
    </TouchableOpacity>
  );
};
function PlayerControls({ togglePlayback }) {
  const { colors } = useTheme();
  const [slider, setSlider] = useState(0);
  return (
    <View>
      <View>
        <Slider
          thumbTintColor={colors.primary}
          minimumTrackTintColor={colors.primary}
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          marginTop: 5,
        }}>
        <ControlButton icon="skip-previous" color={colors.text} size={48} />
        <ControlButton
          //   onPress={togglePlayback}
          icon="play-circle"
          color={colors.primary}
          size={88}
          dropShadow
        />
        <ControlButton icon="skip-next" color={colors.text} size={48} />
      </View>
    </View>
  );
}

PlayerControls.propTypes = {};

export default PlayerControls;

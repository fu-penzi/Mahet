import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { useTheme } from "../theme/ThemeProvider";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

function TextPar(props) {
  const { fontScale } = useWindowDimensions();
  const { colors } = useTheme();
  return (
    <Text
      style={[
        {
          color: props.disabled ? colors.textDisabled : colors.text,
          fontSize: props.fontSize
            ? props.fontSize / fontScale
            : 16 / fontScale,
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
}
TextPar.propTypes = {};

export default TextPar;

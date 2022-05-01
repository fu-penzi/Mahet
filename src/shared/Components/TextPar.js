import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { useTheme } from "../../theme/ThemeProvider";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

function TextPar(props) {
  const { fontScale } = useWindowDimensions();
  const { color } = useTheme();
  var textColor = props.secondary ? color.textSecondary : color.text;
  if (props.color) {
    textColor = color[props.color];
  }
  return (
    <Text
      style={[
        {
          color: textColor,
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

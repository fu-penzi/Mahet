import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { useTheme } from "../theme/ThemeProvider";

function TextPar(props) {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        {
          color: props.disabled ? colors.textDisabled : colors.text,
          fontSize: 16,
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
}
TextPar.propTypes = {};

export default TextPar;

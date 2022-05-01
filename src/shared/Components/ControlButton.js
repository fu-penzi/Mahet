import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../theme/ThemeProvider";
import usePassTheme from "../usePassTheme";

export default function ControlButton(props) {
  const { color, size } = useTheme();
  const styles = usePassTheme(makeStyles);
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={[
        props.dropShadow ? styles.shadow : {},
        props.circular ? styles.circular : {},
      ]}
      onPress={props.onPress}>
      <Icon
        name={props.icon}
        // style={{ ...shadow }}
        size={props.size ? size.icon[props.size] : size.icon.medium}
        color={color.text}
      />
    </TouchableOpacity>
  );
}
ControlButton.propTypes = {
  dropShadow: PropTypes.bool,
  circular: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
const makeStyles = theme =>
  StyleSheet.create({
    shadow: {
      shadowOpacity: 0.25,
      textShadowRadius: 3.84,
      textShadowOffset: { width: 0, height: 2 },
    },
    circular: {
      borderRadius: 100,
      backgroundColor: theme.color.primary,
      padding: 12,
    },
  });

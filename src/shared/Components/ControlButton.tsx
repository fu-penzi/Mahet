import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../theme/ThemeProvider";
import usePassTheme from "../../hooks/usePassTheme";

export default function ControlButton(props: ControlButtonProps): JSX.Element {
  const [isOn, setIsOn] = useState(false);
  const { color, size } = useTheme();
  const styles = usePassTheme(makeStyles);
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={props.circular ? styles.circular : {}}
      onPress={props.onPress ? props.onPress : () => setIsOn(state => !state)}>
      <Icon
        name={props.icon}
        size={props.size ? size.icon[props.size] : size.icon.medium}
        color={isOn ? color.primary : color.text}
      />
    </TouchableOpacity>
  );
}
interface ControlButtonProps {
  circular?: boolean;
  size?: "small" | "medium" | "large";
  icon: string;
  onPress: () => any;
  // dropShadow:boolean
}
const makeStyles = (theme: any) =>
  StyleSheet.create({
    circular: {
      borderRadius: 100,
      backgroundColor: theme.color.primary,
      padding: 12,
    },
  });

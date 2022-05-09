import React from "react";
import { Text, useWindowDimensions } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
type Props = {
  children?: React.ReactNode;
  secondary?: boolean;
  style?: object;
  fontSize?: number;
  color?: string;
};
function TextPar(props: Props): JSX.Element {
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
export default TextPar;

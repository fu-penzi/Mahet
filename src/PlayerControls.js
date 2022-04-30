// import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import PropTypes from "prop-types";
// const ControlButton = props => {
//   const shadow = props.dropShadow
//     ? {
//         shadowOpacity: 0.36,
//         textShadowRadius: 6.68,
//         textShadowOffset: { width: 0, height: 5 },
//       }
//     : {};

//   return (
//     <TouchableOpacity onPress={props.onPress}>
//       <Icon
//         name={props.icon}
//         // style={{...shadow}}
//         size={props.size}
//         color={props.color}
//       />
//     </TouchableOpacity>
//   );
// };
// function PlayerControls(props) {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         alignItems: "center",
//         alignSelf: "center",
//         marginTop: 20,
//       }}>
//       <ControlButton icon="skip-previous" color={theme.colors.font} size={72} />
//       <ControlButton
//         onPress={() => togglePlayback(playbackState)}
//         icon="play-circle"
//         color={theme.colors.primary}
//         size={108}
//         dropShadow
//       />
//       <ControlButton icon="skip-next" color={theme.colors.font} size={72} />
//     </View>
//   );
// }

// PlayerControls.propTypes = {};

// export default PlayerControls;

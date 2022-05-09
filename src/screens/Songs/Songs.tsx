import React from "react";
import { StatusBar, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../mock/images";
import usePassTheme from "../../hooks/usePassTheme";
import Song from "src/screens/Songs/Song";

export default function Songs() {
  const styles = usePassTheme(makeStyles);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.contentWrapper}>
        <View>
          {images.concat(images).map((v, i) => (
            <Song
              key={i}
              title="Moonsong"
              author="Adrian von Ziegler"
              image={v}
              playing={i === 2}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const makeStyles = (theme: any) =>
  StyleSheet.create({
    contentWrapper: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.color.background,
    },
    trackImageWrap: {
      height: 50,
      elevation: 5,
      alignItems: "center",
      backgroundColor: "#000000",
      marginRight: 10,
    },
    trackImage: {
      flex: 1,
      width: undefined,
      height: undefined,
      aspectRatio: 1 / 1,
      resizeMode: "cover",
      maxWidth: "100%",
    },
  });

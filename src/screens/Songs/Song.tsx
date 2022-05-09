import React from "react";
import { Image, StyleSheet, View } from "react-native";
import usePassTheme from "src/hooks/usePassTheme";
import TextPar from "src/shared/Components/TextPar";

export default function Song({ title, author, image, playing }: Song) {
  const styles = usePassTheme(makeStyles);
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
      <View style={styles.trackImageWrap}>
        <Image style={styles.trackImage} source={image} />
      </View>
      <View>
        {playing ? (
          <>
            <TextPar color="primary">{title}</TextPar>
            <TextPar color="primaryDark">{author}</TextPar>
          </>
        ) : (
          <>
            <TextPar>{title}</TextPar>
            <TextPar secondary>{author}</TextPar>
          </>
        )}
      </View>
    </View>
  );
}
interface Song {
  title: string;
  author: string;
  image: number;
  playing: boolean;
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

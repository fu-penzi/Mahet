import React from "react";
import { StatusBar, View, StyleSheet, Image, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import usePassTheme from "../../shared/usePassTheme";
import TextPar from "../../shared/Components/TextPar";
import { images } from "../../mock/images";

function Song({ title, author, image, playing }) {
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
Song.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.number,
  playing: PropTypes.bool,
};

export default function Songs(props) {
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

Songs.propTypes = {};
const makeStyles = theme =>
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
      maxWidth: "100%",
    },
  });

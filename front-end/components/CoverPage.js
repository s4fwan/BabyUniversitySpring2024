import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import BackButton from "../BookPages/BackButton";
import CoverImage from "../assets/svg/coverImage.svg";
import { useFonts } from "expo-font";
const CoverPage = () => {
  let [fontsLoaded] = useFonts({
    "KulimPark-Bold": require("../assets/fonts/KulimPark-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null; 
  }
  return (
    <View style={styles.container}>
      <BackButton />
      <SafeAreaView style={styles.container}>
        <View style={styles.purpleColumn}></View>
        <View style={styles.yellowColumn}></View>
        <View style={styles.imageContainer}>
          <Text style={styles.title}>QUANTUM{"\n"}PHYSICS</Text>
          <Text style={styles.title2}>for{"\n"}babies</Text>
          <Text style={styles.author}>Chris Ferrie</Text>
          <CoverImage width={300} height={300} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "auto",
    flexDirection: "row",
  },
  purpleColumn: {
    flex: 1,
    backgroundColor: "#B791C2",
  },
  yellowColumn: {
    flex: 9,
    backgroundColor: "#FDDF5D",
  },
  imageContainer: {
    position: "absolute",
    left: "25%",
    top: "60%",
  },
  title: {
    fontFamily: "KulimPark-Bold",
    color: "#E15D50",
    fontSize: "45",
    marginTop: -250,
  },
  title2: {
    fontFamily: "KulimPark-Bold",
    color: "#32B1B7",
    fontSize: "45",
  },
  author: {
    fontFamily: "KulimPark-Bold",
    color: "black",
    position: "absolute",
    top: "90%",
    left: "20%",
    fontSize: "20",
  },
});

export default CoverPage;
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { useFonts, Itim_400Regular } from "@expo-google-fonts/itim";
import intersect from "../assets/img/Intersect.png";
import back from "../assets/img/back.png";
import BrowseBooks from "../assets/img/BrowseBook.png";
import ActivityTracking from "../assets/img/ActivityTracking.png";
import MenuButton from "../components/MenuButton";

//dimensions for CSS to scale with
const BASE_WIDTH = 1194;
const BASE_HEIGHT = 834;

// Get current screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const scaleWidth = screenWidth / BASE_WIDTH;
const scaleHeight = screenHeight / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight); // Choose the smaller scale factor to maintain aspect ratio

// Helper function to scale sizes
const scaleSize = (size) => size * scale;

const PinEntryScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({ Itim_400Regular });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }


  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.BackButton} onPress={handleGoBack}> */}
        {/* <Image source={back} /> */}
        <MenuButton userMode="parents" isBrowsingBook={false} />
      {/* </TouchableOpacity> */}
      <View style={styles.titleWrap}>
        <Text style={styles.titleStroke}>Parents Mode</Text>
        <Text style={styles.title}>Parents Mode</Text>
      </View>
      <View style={styles.functions}>
        <TouchableOpacity onPress={() => navigation.navigate("Bedroom", {currentMode:"parents", isBrowsingBook:true})}>
          <Image source={BrowseBooks} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("TrackingActivity")}>
          <Image source={ActivityTracking} />
        </TouchableOpacity>
      </View>

      <Image source={intersect} style={styles.backgroundImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFEFB",
  },
  BackButton: {
    position: "absolute",
    top: scaleSize(40),
    left: scaleSize(20),
    width: scaleSize(50),
    height: scaleSize(50),
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  errorText: {
    fontSize: scaleSize(20),
    color: "red",
    marginBottom: scaleSize(20),
    bottom: scaleSize(110),
  },
  functions: {
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  titleWrap: {
    marginTop: scaleSize(50),
    marginBottom: scaleSize(150),
  },
  titleStroke: {
    fontSize: scaleSize(100),
    color: "black",
    position: "absolute",
    textShadowColor: "black",
    textShadowOffset: { width: scaleSize(5), height: scaleSize(5) },
    textShadowRadius: scaleSize(10),
    fontFamily: "McLaren",
    fontWeight: "bold",
  },
  title: {
    color: "#B36003",
    fontFamily: "McLaren",
    fontSize: scaleSize(100),
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaleSize(40),
  },
  button: {
    backgroundColor: "#AD620E",
    flexShrink: 1,
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(50),
    borderRadius: scaleSize(20),
    alignItems: "center",
    marginBottom: scaleSize(20),
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: scaleSize(20),
  },
});

export default PinEntryScreen;

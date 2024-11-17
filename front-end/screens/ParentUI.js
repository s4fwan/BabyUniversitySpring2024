import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
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
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFEFB",
  },
  BackButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 50,
    height: 50,
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  errorText: {
    fontSize: 20,
    color: "red",
    marginBottom: 20,
    bottom: 110,
  },
  functions: {
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  titleWrap: {
    marginTop: 50,
    marginBottom: 150,
  },
  titleStroke: {
    fontSize: 100,
    color: "black",
    position: "absolute",
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    fontFamily: "McLaren",
    fontWeight: "bold",
  },
  title: {
    color: "#B36003",
    fontFamily: "McLaren",
    fontSize: 100,
    fontWeight: "bold",
  },

  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#AD620E",
    flexShrink: 1,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default PinEntryScreen;

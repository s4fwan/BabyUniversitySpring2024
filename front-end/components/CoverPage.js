import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView,TouchableOpacity, Image } from "react-native";
import CoverImage from "../assets/img/CoverPage.svg";
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
const CoverPage = ({ isActive, currentMode }) => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "KulimPark-Bold": require("../assets/fonts/KulimPark-Bold.ttf"),
  });
  const [playReadAloud, setPlayReadAloud] = useState(false);
  const soundRef = useRef(null);
  useEffect(() => {
    async function checkSettings() {
      try {
        const readAloudVal = await AsyncStorage.getItem("readAloudVal");
        console.log(readAloudVal);
        if (readAloudVal) setPlayReadAloud(readAloudVal === "true");
      } catch (error) {
        console.error("Error fetching readAloudVal:", error);
      }
    }
    checkSettings();
  }, []);
  useEffect(() => {
    async function loadSound() {
      try {
        const { sound } = await Audio.Sound.createAsync({
          uri: "https://storage.googleapis.com/tavola-italiano-res/sound/BookAudioPage0.mp3",
        });
        soundRef.current = sound;
        if (isActive && playReadAloud) {
          await sound.playAsync();
        }
      } catch (error) {
        console.error("Error loading sound: ", error);
      }
    }

    loadSound();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (isActive && soundRef.current && playReadAloud) {
      soundRef.current.playAsync();
    } else if (!isActive && soundRef.current) {
      soundRef.current.pauseAsync();
    }
  }, [isActive]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.BackButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require("../assets/img/back.png")} />
      </TouchableOpacity> */}

      <CoverImage style={styles.coverImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "auto",
    flexDirection: "row",
    backgroundImage: CoverImage,
    // backgroundColor:"red",
  },
  coverImage:{
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    position: "absolute",
    left: "25%",
    top: "60%",
  },
  BackButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 1,
  },
});

export default CoverPage;

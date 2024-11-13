import React, { useEffect, useRef } from "react";
import { View, StyleSheet, SafeAreaView,TouchableOpacity, Image } from "react-native";
import CoverImage from "../assets/img/CoverPage.svg";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";

const CoverPage = ({ isActive, currentMode }) => {
  const [fontsLoaded] = useFonts({
    "KulimPark-Bold": require("../assets/fonts/KulimPark-Bold.ttf"),
  });

  const soundRef = useRef(null);

  useEffect(() => {
    async function loadSound() {
      try {
        const { sound } = await Audio.Sound.createAsync({
          uri: "https://storage.googleapis.com/tavola-italiano-res/sound/BookAudioPage0.mp3",
        });
        soundRef.current = sound;
        if (isActive) {
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
    if (isActive && soundRef.current) {
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
      <TouchableOpacity
        style={styles.BackButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require("../assets/img/back.png")} />
      </TouchableOpacity>

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

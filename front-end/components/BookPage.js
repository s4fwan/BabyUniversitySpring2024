import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import BackButton from "../BookPages/BackButton";
import { Audio } from 'expo-av';

const BookPage = ({ page, isActive }) => {
  const soundRef = useRef(null);
  const imageAnimationRef = useRef(null);
  const highlightTextRef = useRef(null);



  useEffect(() => {
    async function loadSound() {
      try {
        const { sound } = await Audio.Sound.createAsync({
          uri: page.sound, 
        });
        soundRef.current = sound;
      } catch (error) {
        console.log("Failed to load sound:", error);
      }
    }
  
    loadSound();
      return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync(); 
      }
    };
  }, []);

  useEffect(() => {
    async function handleSoundPlayback() {
      if (isActive) {
        if (soundRef.current) {
          await soundRef.current.setPositionAsync(0); 
          await soundRef.current.playAsync(); 
        }
        if (imageAnimationRef.current) {
          imageAnimationRef.current.play();
        }
        if (highlightTextRef.current) {
          highlightTextRef.current.play();
        }
      } else {
        if (soundRef.current) {
          await soundRef.current.pauseAsync(); 
        }
        if (imageAnimationRef.current) {
          imageAnimationRef.current.reset();
        }
        if (highlightTextRef.current) {
          highlightTextRef.current.reset();
        }
      }
    }

    handleSoundPlayback();
  }, [isActive]);

  const handlePress = () => {
    if (imageAnimationRef.current) {
      imageAnimationRef.current.reset();
      imageAnimationRef.current.play();
    }
    if (highlightTextRef.current) {
      highlightTextRef.current.reset();
      highlightTextRef.current.play();
    }
    if (soundRef.current) {
      soundRef.current.setPositionAsync(0);
      soundRef.current.playAsync();
    }else{
      console.log("soundRef is not loaded");
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <TouchableOpacity onPress={handlePress}>
        <LottieView
          ref={imageAnimationRef}
          source={page.animation.image}
          loop={false}
          autoPlay={false}
          style={{ width: 300, height: 300 }}
        />
      </TouchableOpacity>
      {page.animation.highlightText ? (
        <TouchableOpacity>
          <LottieView
            ref={highlightTextRef}
            source={page.animation.highlightText}
            loop={false}
            autoPlay={false}
            style={{ width: 500, height: 100 }}
          />
        </TouchableOpacity>
      ) : (
        <Text style={styles.text}>{page.animation.description}</Text>
      )}
    </View>
  );
};

BookPage.propTypes = {
  page: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.any.isRequired,
    highlightText: PropTypes.any.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#f3f4f5",
    width: "100%",
    height: "100%",
  },
  text: {
    position: "absolute",
    zIndex: 100,
    bottom: 20,
    fontWeight: "700",
    marginTop: 100,
    color: "black",
    fontSize: 50,
  },
});

export default BookPage;

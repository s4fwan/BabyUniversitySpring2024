import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";


const BookPage = ({ page, isActive, goToNextPage, pageInfo }) => {
  const navigation = useNavigation();
  const soundRef = useRef(null);
  const imageAnimationRef = useRef(null);
  const highlightTextRef = useRef(null);
  const [playReadAloud, setPlayReadAloud] = useState(false);
  const [playSoundEffect, setPlaySoundEffect] = useState(false);
  useEffect(() => {
    async function loadSound() {
      const readAloudVal = await AsyncStorage.getItem("readAloudVal");
      const soundEffectVal = await AsyncStorage.getItem("soundEffectVal");
      if (readAloudVal) setPlayReadAloud(readAloudVal === "true");
      if (soundEffectVal) setPlaySoundEffect(soundEffectVal);
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

        if (soundRef.current && playReadAloud) {
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
    if (soundRef.current && playReadAloud) {
      soundRef.current.setPositionAsync(0);
      soundRef.current.playAsync();
    } else {
      console.log("soundRef is not loaded");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.BackButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require("../assets/img/back.png")} />
      </TouchableOpacity>

      {/* <View style={styles.dropdownWrapper}>
        <SelectDropdown
          data={pageInfo}
          onSelect={(selectedItem, index) => {
            goToNextPage(index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || `Page Selection`}
                </Text>
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D17E21" }),
                }}
              >
                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View> */}

      <TouchableOpacity onPress={handlePress}>
        <LottieView
          ref={imageAnimationRef}
          source={page.animation.image}
          loop={false}
          autoPlay={false}
          style={{ width: 500, height: 500 }}
        />
      </TouchableOpacity>
      {page.animation.highlightText ? (
        <TouchableOpacity>
          <LottieView
            ref={highlightTextRef}
            source={page.animation.highlightText}
            loop={false}
            autoPlay={false}
            style={{ width: 700, height: 100 }}
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
  BackButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 50,
    height: 50,
  },

  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#D17E21",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    // backgroundColor: "rgba(209, 126, 33, 0.3)",
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownWrapper: {
    width: "80%",
    alignItems: "flex-end",
  },
});

export default BookPage;

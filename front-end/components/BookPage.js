import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import BackButton from "../BookPages/BackButton";

const BookPage = ({ page, isActive }) => {
  const imageAnimationRef = useRef(null);
  const highlightTextRef = useRef(null);

  useEffect(() => {
    if (isActive && imageAnimationRef.current) {
      imageAnimationRef.current.play();
    } else if (imageAnimationRef.current) {
      imageAnimationRef.current.reset();
    }
    if (isActive && highlightTextRef.current) {
      highlightTextRef.current.play();
    } else if (highlightTextRef.current) {
      highlightTextRef.current.reset();
    }
  }, [isActive]);

  const handlePress = () => {
    if (imageAnimationRef.current) {
      imageAnimationRef.current.reset();
      imageAnimationRef.current.play();
    }
    if(highlightTextRef.current) {
      highlightTextRef.current.reset();
      highlightTextRef.current.play();
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <TouchableOpacity onPress={handlePress}>
        <LottieView
          ref={imageAnimationRef}
          source={page.image}
          loop={false}
          autoPlay={false}
          style={{ width: 300, height: 300 }}
        />
      </TouchableOpacity>
        {page.highlightText ? (
          <TouchableOpacity>
          <LottieView
            ref={highlightTextRef}
            source={page.highlightText}
            loop={false}
            autoPlay={false}
            style={{ width: 500, height: 100 }}
          />
        </TouchableOpacity>
        ) : (
          <Text style={styles.text}>{page.description}</Text>
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

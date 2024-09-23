// BackButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BackButton = () => {
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      await AsyncStorage.removeItem("bookId");
      navigation.navigate("Bedroom");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Exit Book</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 80, // Adjust as needed
    left: 50, // Adjust as needed
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: "green",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default BackButton;

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
import { auth } from "../firebase";
import ParentUI from "./ParentUI";
import { useFonts, Itim_400Regular } from "@expo-google-fonts/itim";
import intersect from "../assets/img/Intersect.png";
import back from "../assets/img/back.png";

const PinEntryScreen = ({ navigation }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handlePinChange = (enteredPin) => {
    setPin(enteredPin);
  };

  function handlePinSubmit() {
    navigation.navigate("ParentUI");
    // axios
    //   .get("http://localhost:3000/checkpin", {
    //     params: {
    //       email: userEmail,
    //       pin: pin,
    //     },
    //   })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       console.log(response.data.message);
    //       navigation.navigate("ParentUI");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error.response?.data?.message || error.message);
    //     setError("Incorrect PIN. Please try again.");
    //   });
  };

 
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.BackButton} onPress={handleGoBack}>
        <Image source={back} />
      </TouchableOpacity>
      <Text style={styles.errorText}>{error}</Text>
      <View style={styles.titleWrap}>
        <Text style={styles.titleStroke}>Parents Mode</Text>
        <Text style={styles.title}>Parents Mode</Text>
      </View>
      <Text style={styles.subtitle}>Please enter your PIN</Text>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          value={pin}
          onChangeText={handlePinChange}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
        />
      </View>
      <Text
        style={{
          marginTop:10,
          fontSize: 24,
          color: "#835717",
          fontWeight: "bold",
        }}
      >
        Forgot Pin
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePinSubmit}>
          <Text style={styles.buttonText}>Switch to Parents Mode</Text>
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

  input: {
    width: "80%",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    bottom: 330,
  },
  titleWrap: {
    marginTop: 100,
    marginBottom: 20,
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
  subtitle: {
    fontFamily: "McLaren",
    fontSize: 30,
    marginBottom: 100,
  },
  inputWrap: {
    flexShrink: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    width: 400,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 18,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "orange",
    borderRadius: 20,
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

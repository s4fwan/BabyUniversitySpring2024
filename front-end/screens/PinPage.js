import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import intersect from "../assets/img/Intersect.png";
import back from "../assets/img/back.png";

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
  const [pin, setPin] = useState("");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  const handlePinChange = (enteredPin) => {
    setPin(enteredPin);
  };

  useEffect(() => {
    async function fetchUserId() {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    }

    fetchUserId();
  }, []);

  async function handlePinSubmit() {
    try {
      await axios.post(`${process.env.BASE_API_URL}/users/check-pin`, {
        id: userId,
        pin,
      });
      navigation.navigate("ParentUI");
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      setError("Incorrect PIN. Please try again.");
    }

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
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.BackButton} onPress={handleGoBack}>
        <Image source={back} />
      </TouchableOpacity>

      <View style={styles.titleWrap}>
        <Text style={styles.titleStroke}>Parents Mode</Text>
        <Text style={styles.title}>Parents Mode</Text>
      </View>
      <Text style={styles.subtitle}>Please enter your PIN</Text>
      <Text style={styles.errorText}>{error}</Text>

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
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPin")}>
      <Text
        style={{
          marginTop: 10,
          fontSize: 24,
          color: "#835717",
          fontWeight: "bold",
        }}
      >
        Forgot Pin
      </Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    padding: scaleSize(10),
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: scaleSize(20),
    textAlign: "center",
    fontSize: scaleSize(24),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleSize(14),
    bottom: scaleSize(330),
  },
  titleWrap: {
    marginTop: scaleSize(100),
    marginBottom: scaleSize(20),
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
  subtitle: {
    fontFamily: "McLaren",
    fontSize: scaleSize(30),
    marginBottom: scaleSize(100),
  },
  inputWrap: {
    flexShrink: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    width: scaleSize(400),
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(15),
    fontSize: scaleSize(18),
    backgroundColor: "white",
    borderWidth: scaleSize(2),
    borderColor: "orange",
    borderRadius: scaleSize(20),
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

import React, { useState } from "react";
import axios from "axios";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import intersect from "../assets/img/Intersect.png";

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

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const ForgotPin = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const handleForgotPin = async () => {
    const newErrors = {};

    if (!email) newErrors.email = "Enter a valid email";
    else if (!validateEmail(email)) newErrors.email = "Enter a valid email";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const requestUrl = `${process.env.BASE_API_URL}/otp/generate-otp`;
        const requestBody = { email:email.toLowerCase() };
        console.log(requestBody)
        await axios.post(requestUrl, requestBody);
        console.log(requestBody);
        navigation.replace("OTPVerification", { email:email.toLowerCase() });
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrors({ general: error.response.data.message });
        } else {
          setErrors({ general: "An unexpected error occurred" });
        }
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={styles.BackButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../assets/img/back.png")} />
        </TouchableOpacity>
        <View style={styles.titleWrap}>
          <Text style={styles.titleStroke}>Forgot Pin</Text>
          <Text style={styles.title}>Forgot Pin</Text>
        </View>
        <Text style={styles.subtitle}>Enter your email for an OTP</Text>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        {errors.general && (
          <Text style={styles.errorText}>{errors.general}</Text>
        )}
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Email:</Text>
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleForgotPin} style={styles.button}>
            <Text style={styles.buttonText}>Request Code</Text>
          </TouchableOpacity>
        </View>

        <Image source={intersect} style={styles.backgroundImage} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    marginTop: 0,
  },
  header: {
    fontSize: scaleSize(50),
    fontFamily: "Itim_400Regular",
    color: "#3F3CB4",
    marginVertical: scaleSize(20),
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scaleSize(10),
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFEFB",
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
    marginBottom: scaleSize(80),
  },
  inputContainer: {
    width: "100%",
  },
  labelWrap: {
    alignItems: "flex-end",
    width: scaleSize(80),
  },
  inputWrap: {
    flexShrink: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  inputRow: {
    width: "fit-content",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    marginTop: scaleSize(20),
    marginHorizontal: "auto",
    transform: [{ translateX: scaleSize(-30) }],
  },
  label: {
    marginRight: scaleSize(10),
    textAlign: "right",
    fontSize: scaleSize(20),
    fontWeight: "bold",
  },
  input: {
    width: scaleSize(300),
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(15),
    fontSize: scaleSize(18),
    backgroundColor: "white",
    borderWidth: scaleSize(2),
    borderColor: "orange",
    borderRadius: scaleSize(20),
  },
  buttonContainer: {
    marginTop: scaleSize(40),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#AD620E",
    flexShrink: 1,
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(100),
    borderRadius: scaleSize(20),
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: scaleSize(20),
  },
  errorText: {
    fontSize: scaleSize(18),
    color: "red",
    fontWeight: "bold",
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  BackButton: {
    position: "absolute",
    top: scaleSize(40),
    left: scaleSize(20),
    width: scaleSize(50),
    height: scaleSize(50),
  },
});
export default ForgotPin;

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
import { useRoute } from "@react-navigation/native";

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

const validateOTP = (otp) => /^[A-Za-z0-9]{6}$/.test(otp);

const OTPVerification = () => {
  const [otp, setOTP] = useState("");
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const route = useRoute();
  const { email } = route.params;
  

  const handleResendOTP = async () => {
    try {
      const requestUrl = `${process.env.BASE_API_URL}/otp/generate-otp`;
      const requestBody = { email };
      await axios.post(requestUrl, requestBody);
    } catch (error) {
      setErrors({ general: error.message });
    }
  }

  const handleOTPVerification = async () => {
    const newErrors = {};
    if (!otp) newErrors.otp = "Enter a valid OTP";
    else if (!validateOTP(otp)) newErrors.otp = "Enter a valid OTP";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const requestUrl = `${process.env.BASE_API_URL}/otp/verify-otp`;
        const requestBody = { email, otp };
        const response = await axios.post(requestUrl, requestBody);
        if (response.data.success) navigation.replace("ResetPin",{email,otp});
        else setErrors({ general: response.data.message });
      } catch (error) {
        setErrors({ general: error.message });
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={styles.BackButton} onPress={()=>navigation.goBack()}>
        <Image source={require("../assets/img/back.png")} />
      </TouchableOpacity>
        <View style={styles.titleWrap}>
          <Text style={styles.titleStroke}>Forgot Pin</Text>
          <Text style={styles.title}>Forgot Pin</Text>
        </View>
        <Text style={styles.subtitle}>Enter the OTP sent to your email</Text>
        {errors.general && (
          <Text style={styles.errorText}>{errors.general}</Text>
        )}
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>OTP:</Text>
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Enter an OTP"
                value={otp}
                onChangeText={(otp) => setOTP(otp)}
              />

              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleOTPVerification} style={styles.button}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signInWrap}>
          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={styles.signInLink}>Resend code?</Text>
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
  },
  inputContainer: {
    width: "100%",
    marginTop: scaleSize(40),
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
    marginTop: scaleSize(20),
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  signInWrap: {
    marginTop: scaleSize(20),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  signInText: {
    color: "835717",
    fontSize: scaleSize(20),
  },
  signInLink: {
    color: "#835717",
    marginLeft: scaleSize(10),
    fontWeight: "bold",
    fontSize: scaleSize(20),
  },
  BackButton: {
    position: "absolute",
    top: scaleSize(40),
    left: scaleSize(20),
    width: scaleSize(50),
    height: scaleSize(50),
  },
});

export default OTPVerification;

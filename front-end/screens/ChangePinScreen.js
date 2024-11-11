import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "@env";
import intersect from "../assets/img/Intersect.png";
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
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const validatePin = (pin) => /^\d{4}$/.test(pin);

const ChangePinScreen = () => {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const handleChangePin = async () => {
    const newErrors = {};

    if (!validatePin(oldPin))
      newErrors.oldPin = "Please enter a valid old pin (4 digits).";

    if (!validatePin(newPin))
      newErrors.newPin = "Please enter a valid new pin (4 digits).";

    if (newPin !== confirmPin)
      newErrors.confirmPin = "Confirm pin does not match new pin.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const userId = await AsyncStorage.getItem("userId");
        console.log({ userId, oldPin, newPin });
        const response = await axios.put(`${BASE_API_URL}/users/change-pin`, { userId, oldPin, newPin });
        Alert.alert(
          "Success",
          "Your PIN has been changed successfully!",
          [
            {
              text: "OK",
              onPress: () => navigation.replace("Bedroom"),
            }
          ]
        );
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
          <Text style={styles.titleStroke}>Change PIN</Text>
          <Text style={styles.title}>Change PIN</Text>
        </View>
        <Text style={styles.subtitle}>Change your PIN</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Old PIN:</Text>
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Enter your old PIN"
                value={oldPin}
                onChangeText={(pin) => setOldPin(pin)}
              />
              
              {errors.oldPin && (
                <Text style={styles.errorText}>{errors.oldPin}</Text>
              )}
            </View>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>New PIN:</Text>
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Enter your new PIN"
                value={newPin}
                onChangeText={(pin) => setNewPin(pin)}
              />
              {errors.newPin && (
                <Text style={styles.errorText}>{errors.newPin}</Text>
              )}
            </View>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Confirm New PIN:</Text>
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Confirm New PIN"
                secureTextEntry
                value={confirmPin}
                onChangeText={(pin) => setConfirmPin(pin)}
              />
              {errors.confirmPin && <Text style={styles.errorText}>{errors.confirmPin}</Text>}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleChangePin} style={styles.button}>
            <Text style={styles.buttonText}>Reset your PIN</Text>
          </TouchableOpacity>
        </View>
        {errors.general && (
          <Text style={styles.errorText}>{errors.general}</Text>
        )}
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
    marginTop: scaleSize(80),
  },
  labelWrap: {
    alignItems: "flex-end",
    width: scaleSize(180),
  },
  inputWrap: {
    flexShrink: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  inputRow: {
    width: "100%",
    justifyContent: "center",
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
    position: "absolute",
    left: scaleSize(310),
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
  signInWrap: {
    marginTop: scaleSize(20),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  signInText: {
    color: "#835717",
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

export default ChangePinScreen;

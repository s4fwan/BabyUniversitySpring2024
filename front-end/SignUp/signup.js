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
import phyDoodleShapes from "../assets/BgImage/doodle.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
const validateName = (name) => /^[A-Za-z]+$/.test(name);
const validatePin = (pin) => /^\d{4}$/.test(pin);

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const handleSignup = async () => {
    const newErrors = {};

    if (!email) newErrors.email = "Enter a valid email";
    else if (!validateEmail(email)) newErrors.email = "Enter a valid email";

    if (!name) newErrors.name = "Enter a valid name";
    else if (!validateName(name))
      newErrors.name = "Enter a valid name";

    if (!pin) newErrors.pin = "Enter a valid pin";
    else if (!validatePin(pin))
      newErrors.pin = "Enter a valid pin";

    setErrors(newErrors);
    console.log(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const requestUrl = `${process.env.BASE_API_URL}/users/sign-up`;
        const requestBody = { email, pin, username: name };
        console.log(requestBody);
        const response = await axios.post(requestUrl, requestBody);
        await AsyncStorage.setItem("userId", response.data.userId);
        await AsyncStorage.setItem("username", response.data.username);
        navigation.replace("Bedroom",{currentMode: "kids"});
      } catch (error) {
        if(error.response)
          setErrors({ general: error.response.data.message });
      }
    }
  };

  const handleSignin = () => {
    navigation.navigate("Login");
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.titleWrap}>
          <Text style={styles.titleStroke}>Sign Up</Text>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <Text style={styles.subtitle}>Create a new account</Text>
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
              
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Name:</Text>
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Create Pin:</Text>
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Enter a four digit pin"
                secureTextEntry
                value={pin}
                onChangeText={(text) => setPin(text)}
              />
              {errors.pin && <Text style={styles.errorText}>{errors.pin}</Text>}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignup} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {errors.general && (
          <Text style={styles.errorText}>{errors.general}</Text>
        )}
        <View style={styles.signInWrap}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleSignin}>
            <Text style={styles.signInLink}>Sign In</Text>
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
    marginTop: scaleSize(80),
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
    // position: "absolute",
    // left:310,
    marginTop:20,
    fontSize: 18,
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
    color: "835717",
    fontSize: scaleSize(20),
  },
  signInLink: {
    color: "#835717",
    marginLeft: scaleSize(10),
    fontWeight: "bold",
    fontSize: scaleSize(20),
  },
});

export default SignupScreen;

//BASE_API_URL=https://shrouded-depths-36068-b1b61255eb07.herokuapp.com/api/v1

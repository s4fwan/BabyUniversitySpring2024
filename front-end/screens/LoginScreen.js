import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_API_URL } from "@env";
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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const navigation = useNavigation();

  const [loaded] = Font.useFonts({
    McLaren: require("../assets/fonts/McLaren.ttf"),
  });
 
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          navigation.navigate("Bedroom", { currentMode: "kids" });
        }
      } catch (e) {
        console.log(e);
      }
    };
   
    checkLogin();
  }, []);
  if (!loaded) {
    return null;
  }
  const handleSignup = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin =  () => {
    console.log(`${BASE_API_URL}/users/sign-in`);
    setIsLoginClicked(true);
    axios
      .post(`${BASE_API_URL}/users/sign-in`, { email, pin })
      .then(async (response) => {
        if (response.status === 200) {
          await AsyncStorage.setItem("userId", response.data.userId);
          await AsyncStorage.setItem("username", response.data.username);
          console.log("Logged in with user", response.data.userEmail);
          navigation.navigate("Bedroom", { currentMode: "kids" });
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while logging in");
      })
      .finally(() => setIsLoginClicked(false));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* <View style={styles.ballAnimationContainer}>
        <UIBallAnimation />
      </View> */}
      <Image source={require("../assets/img/logo.png")} style={styles.logo} />

      <View style={styles.titleWrap}>
        <Text style={styles.titleStroke}>Baby University</Text>
        <Text style={styles.title}>Baby University</Text>
      </View>
      <Text style={styles.subtitle}>Welcome back!</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <View style={styles.labelWrap}>
            <Text style={styles.label}>Email:</Text>
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.labelWrap}>
            <Text style={styles.label}>Pin:</Text>
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Enter your pin"
              secureTextEntry
              value={pin}
              onChangeText={(text) => setPin(text)}
            />
            <TouchableOpacity onPress={()=>navigation.navigate("ForgotPin")}>
            <Text
              style={{
                position: "absolute",
                //right: scaleSize(-120),
                left: scaleSize(20),
                fontSize: scaleSize(24),
                color: "#835717",
                fontWeight: "bold",
              }}
            >
              Forgot Pin
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
          disabled={isLoginClicked}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpWrap}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Image source={intersect} style={styles.backgroundImage} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFEFB",
  },
  logo: {
    marginTop: scaleSize(30),
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
  },
  labelWrap: {
    alignItems: "flex-end",
    width: scaleSize(70),
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaleSize(40),
  },
  button: {
    backgroundColor: "#AD620E",
    flexShrink: 1,
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(100),
    borderRadius: scaleSize(20),
    alignItems: "center",
    marginBottom: scaleSize(20),
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: scaleSize(20),
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  signUpWrap: {
    marginTop: scaleSize(20),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  signUpText: {
    color: "#835717",
    fontSize: scaleSize(20),
  },
  signUpLink: {
    color: "#835717",
    marginLeft: scaleSize(10),
    fontWeight: "bold",
    fontSize: scaleSize(20),
  },
});

export default LoginScreen;
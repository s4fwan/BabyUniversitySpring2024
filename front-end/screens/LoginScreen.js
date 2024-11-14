import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import {
  Text,
  View,
  TextInput,
  
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import intersect from "../assets/img/Intersect.png";

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
    setIsLoginClicked(true);
    axios
      .post(`${process.env.BASE_API_URL}/users/sign-in`, { email, pin })
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
        if(error.response)
          alert(error.response.data.message);
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
                right: -120,
                fontSize: 24,
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
    marginTop: 30,
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
  },
  inputContainer: {
    width: "100%",
    // flexGrow: 1,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 20,
  },

  labelWrap: {
    alignItems: "flex-end",
    width: 70,
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
    marginTop: 20,
    marginHorizontal: "auto",
    transform: [{ translateX: -30 }],
  },
  label: {
    marginRight: 10,
    textAlign: "right",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: 300,
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
    paddingHorizontal: 100,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  signUpWrap: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  signUpText: {
    color: "835717",
    fontSize: 20,
  },
  signUpLink: {
    color: "#835717",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default LoginScreen;

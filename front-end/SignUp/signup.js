import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "@env";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import phyDoodleShapes from "../assets/BgImage/doodle.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import intersect from "../assets/img/Intersect.png";

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

    if (!email) newErrors.email = "Please enter your email.";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format.";

    if (!name) newErrors.name = "Please enter your name.";
    else if (!validateName(name))
      newErrors.name = "Name must only contain letters.";

    if (!pin) newErrors.pin = "Please enter a four-digit pin.";
    else if (!validatePin(pin))
      newErrors.pin = "Please enter a valid four-digit pin.";

    setErrors(newErrors);
    console.log(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const requestUrl = `${BASE_API_URL}/users/sign-up`;
        const requestBody = { email, pin, username: name };
        console.log(requestBody);
        const response = await axios.post(requestUrl, requestBody);
        await AsyncStorage.setItem("userId", response.data.userId);
        navigation.replace("Bedroom");
      } catch (error) {
        setErrors({ general: error.message });
      }
    }
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
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
          <View style={styles.inputRow}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Name:</Text>
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Enter your first name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
          <View style={styles.inputRow}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Pin:</Text>
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Enter a four digit pin"
                secureTextEntry
                value={pin}
                onChangeText={(text) => setPin(text)}
              />
            </View>
            {errors.pin && <Text style={styles.errorText}>{errors.pin}</Text>}
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
    fontSize: 50,
    fontFamily: "Itim_400Regular",
    color: "#3F3CB4",
    marginVertical: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 20,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFEFB",
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
    marginTop: 80,
    // flexGrow: 1,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 20,
  },

  labelWrap: {
    alignItems: "flex-end",
    width: 80,
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
    marginTop: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#AD620E",
    flexShrink: 1,
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginLeft: 10,
    fontSize: 12,
  },
});
export default SignupScreen;

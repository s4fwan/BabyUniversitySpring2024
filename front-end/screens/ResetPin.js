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
import intersect from "../assets/img/Intersect.png";
import { useRoute } from "@react-navigation/native";


const validatePin = (pin) => /^\d{4}$/.test(pin);

const ResetPin = () => {
  const [confirmPin, setConfirmPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const route = useRoute();
  const { email, otp } = route.params;

  const handleResetPin = async () => {
    const newErrors = {};

    if (!newPin) newErrors.newPin = "Enter a valid PIN";
    else if (!validatePin(newPin)) newErrors.newPin = "Enter a valid PIN";

    if (!confirmPin) newErrors.confirmPin = "Enter a valid PIN";
    else if (!validatePin(confirmPin))
      newErrors.confirmPin = "Enter a valid PIN";

    if (newPin !== confirmPin) {
      newErrors.confirmPin = "Confirm pin does not match new pin.";
    }

    setErrors(newErrors);
    console.log(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const requestUrl = `${BASE_API_URL}/users/reset-pin`;
        const requestBody = { email, otp, newPin };
        const response = await axios.put(requestUrl, requestBody);
        navigation.replace("Login");
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
          <Text style={styles.titleStroke}>Reset PIN</Text>
          <Text style={styles.title}>Reset PIN</Text>
        </View>
        <Text style={styles.subtitle}>Enter your new PIN</Text>
        <View style={styles.inputContainer}>
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
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Confirm PIN:</Text>
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Enter your confirm PIN"
                value={confirmPin}
                onChangeText={(pin) => setConfirmPin(pin)}
              />

              {errors.confirmPin && (
                <Text style={styles.errorText}>{errors.confirmPin}</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleResetPin} style={styles.button}>
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
    marginBottom:60,
  },
  inputContainer: {
    width: "100%",
    // marginTop: 80,
  },

  labelWrap: {
    alignItems: "flex-end",
    width: 130,
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
    position: "absolute",
    left: 310,
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
  BackButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 50,
    height: 50,
  }
});
export default ResetPin;

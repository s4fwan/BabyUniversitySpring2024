import React, { useState } from "react";
import axios from "axios";
import intersect from "../assets/img/Intersect.png";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const response = await axios.put(`${process.env.BASE_API_URL}/users/change-pin`, { userId, oldPin, newPin });
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
  },

  labelWrap: {
    alignItems: "flex-end",
    width: 180,
  },
  inputWrap: {
    flexShrink: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  inputRow: {
    width: "100%",
    justifyContent:"center",
    // backgroundColor:"red",
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
    left:310,
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
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  signInText: {
    color: "835717",
    fontSize: 20,
  },
  signInLink: {
    color: "#835717",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  BackButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 50,
    height: 50,
  }
});
export default ChangePinScreen;

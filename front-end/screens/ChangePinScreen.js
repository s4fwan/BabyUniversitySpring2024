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
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import phyDoodleShapes from "../assets/BgImage/doodle.png";
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
      <Image source={phyDoodleShapes} style={styles.backgroundImage} />
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>Baby University Change Pin</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Old Pin:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the old pin"
              secureTextEntry
              value={oldPin}
              onChangeText={(text) => setOldPin(text)}
            />
            {errors.oldPin && (
              <Text style={styles.errorText}>{errors.oldPin}</Text>
            )}
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>New Pin:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a four digit pin"
              secureTextEntry
              value={newPin}
              onChangeText={(text) => setNewPin(text)}
            />
            {errors.newPin && (
              <Text style={styles.errorText}>{errors.newPin}</Text>
            )}
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Confirm Pin:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the new pin again"
              secureTextEntry
              value={confirmPin}
              onChangeText={(text) => setConfirmPin(text)}
            />
            {errors.confirmPin && (
              <Text style={styles.errorText}>{errors.confirmPin}</Text>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleChangePin} style={styles.button}>
            <Text style={styles.buttonText}>Change Pin</Text>
          </TouchableOpacity>
        </View>
        {errors.general && (
          <Text style={styles.errorText}>{errors.general}</Text>
        )}
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.navigate("Bedroom")}
        >
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
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
    marginBottom: -320,
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
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    width: "90%",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  label: {
    marginRight: 10,
    fontWeight: "bold",
    flex: 1,
  },
  input: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: "60%",
  },
  button: {
    backgroundColor: "#3F3CB4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginLeft: 10,
    fontSize: 12,
  },
  goBackButton: {
    marginTop: 20,
  },
  goBackText: {
    color: "#3F3CB4",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default ChangePinScreen;

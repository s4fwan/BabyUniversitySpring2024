import React, { useState } from "react";
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

const QuizStartPage = () => {

  const navigation = useNavigation();

  const handleLastPage = () => {};
  const handleNextPage = () => {};

  return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.titleWrap}>
          <Text style={styles.titleStroke}>Quiz Time!</Text>
          <Text style={styles.title}>Quiz Time!</Text>
        </View>
       
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleNextPage} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLastPage} style={styles.button}>
            <Text style={styles.buttonText}>Back to last page</Text>
          </TouchableOpacity>
        </View>
        
        <Image source={intersect} style={styles.backgroundImage} />
      </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({

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

 
  buttonContainer: {
    marginTop: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#AD620E",
    flexShrink: 1,
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 20,
    alignItems: "center",
    width: "50%",
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
});
export default QuizStartPage;
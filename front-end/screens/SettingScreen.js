import React, { useState, useEffect} from "react";
import * as Font from "expo-font";

import {
  View,
  Text,
  Switch,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SettingsScreen = ({ navigation }) => {
  const [quizVal, setQuizVal] = useState(false);
  const [readAloudVal, setReadAloudVal] = useState(false);
  const [soundEffectVal, setSoundEffectVal] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const quizValue = await AsyncStorage.getItem("quizVal");
        const readAloudValue = await AsyncStorage.getItem("readAloudVal");
        const soundEffectValue = await AsyncStorage.getItem("soundEffectVal");

        if (quizValue !== null) setQuizVal(JSON.parse(quizValue));
        if (readAloudValue !== null) setReadAloudVal(JSON.parse(readAloudValue));
        if (soundEffectValue !== null) setSoundEffectVal(JSON.parse(soundEffectValue));
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };

    loadSettings();
  }, []);

  const readAloud = async () => {
    const newValue = !readAloudVal;
    setReadAloudVal(newValue);
    await AsyncStorage.setItem("readAloudVal", JSON.stringify(newValue));
  };
  
  const quiz = async () => {
    const newValue = !quizVal;
    setQuizVal(newValue);
    await AsyncStorage.setItem("quizVal", JSON.stringify(newValue));
  };
  
  const soundEffect = async () => {
    const newValue = !soundEffectVal;
    setSoundEffectVal(newValue);
    await AsyncStorage.setItem("soundEffectVal", JSON.stringify(newValue));
  };
  const [loaded] = Font.useFonts({
    McLaren: require("../assets/fonts/McLaren.ttf"),
  });

  if (!loaded) {
    return null;
  }
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image source={require("../assets/img/back.png")} />
      </TouchableOpacity>
      <View style={styles.titleWrap}>
        <Text style={styles.titleStroke}>Settings</Text>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.optionContainer}>
        <View style={styles.option}>
          <View style={styles.elementWrapper}>
            <Text style={styles.optionText}>Read Aloud</Text>
          </View>
          <View style={styles.elementWrapperMiddle}>
            <Image
              source={require("../assets/settingsImages/read_aloud_icon.png")}
              style={styles.icon}
            />
          </View>
          <View style={styles.elementWrapper}>
            <View style={{ alignSelf: "center" }}>
              <Switch
                trackColor={{ false: "#767577", true: "#D17E21" }}
                thumbColor={readAloudVal ? "#FFFFFF" : "#FFFFFF"}
                onValueChange={readAloud}
                value={readAloudVal}
                style={styles.switch}
              />
            </View>
          </View>
        </View>

        <View style={styles.option}>
          <View style={styles.elementWrapper}>
            <Text style={styles.optionText}>Sound Effect</Text>
          </View>
          <View style={styles.elementWrapperMiddle}>
            <Image
              source={require("../assets/settingsImages/volumn.png")}
              style={styles.icon}
            />
          </View>
          <View style={styles.elementWrapper}>
            <View style={{ alignSelf: "center" }}>
              <Switch
                trackColor={{ false: "#767577", true: "#D17E21" }}
                thumbColor={soundEffectVal ? "#FFFFFF" : "#FFFFFF"}
                onValueChange={soundEffect}
                value={soundEffectVal}
                style={styles.switch}
              />
            </View>
          </View>
        </View>
        <View style={styles.option}>
          <View style={styles.elementWrapper}>
            <Text style={styles.optionText}>Quizzes</Text>
          </View>
          <View style={styles.elementWrapperMiddle}>
            <Image
              source={require("../assets/settingsImages/quiz.png")}
              style={styles.icon}
            />
          </View>
          <View style={styles.elementWrapper}>
            <View style={{ alignSelf: "center" }}>
              <Switch
                trackColor={{ false: "#767577", true: "#D17E21" }}
                thumbColor={quizVal ? "#FFFFFF" : "#FFFFFF"}
                onValueChange={quiz}
                value={quizVal}
                style={styles.switch}
              />
            </View>
          </View>
        </View>
      </View>
      <Image
        source={require("../assets/img/Intersect.png")}
        style={styles.backgroundImage}
      />
    </View>
  );
};

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFEFB",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  back: {
    width: 70, // Increase the width
    height: 70, // Increase the height
  },

  optionContainer: {
    width: "100%",
    marginTop: 50,
    alignItems: "center",
  },
  option: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30, // Increase the margin bottom
  },
  icon: {
    width: 50, // Increase the width
    height: 50, // Increase the height
    marginRight: 30, // Increase the margin right
  },
  optionText: {
    fontSize: 40,
    alignSelf: "flex-end",
    fontFamily: "McLaren",
  },
  switch: {
    marginLeft: "auto",
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], // Increase the size of the switch
  },
  slider: {
    width: 300,
    height: 40,
    marginLeft: 20,
  },
  elementWrapper: {
    alignItems: "center",
    width: "40%",
  },
  elementWrapperMiddle: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
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
});

export default SettingsScreen;

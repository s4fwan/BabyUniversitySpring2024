import React, { useState, useEffect, useRef } from "react";
import BackButton from "./BackButton";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";


import axios from "axios";

const QuizPage = ({
  quiz,
  currentMode,
  userId,
  goToNextPage,
  index,
  length,
}) => {
  const soundRef = useRef(null);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };


  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  useEffect(() => {
    async function loadSound() {
      try {
        const { sound } = await Audio.Sound.createAsync({
          uri: quiz.sound,
        });
        soundRef.current = sound;
        console.log("Sound loaded successfully");
      } catch (error) {
        console.log("Failed to load sound:", error);
      }
    }
  
    loadSound();
    
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync(); 
      }
    };
  }, []);

  const handlePress = () => {
    if (soundRef.current) {
      soundRef.current.setPositionAsync(0);
      soundRef.current.playAsync();
    }else{
      console.log("soundRef is not loaded");
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) {
      Alert.alert("Please select an answer");
      return;
    }
    setSubmitted(true);
    const result =
      selectedAnswer === quiz.correctAnswer ? "Correct!" : "Wrong!";
    setMessage(result);
    const response = await axios.put(
      `${process.env.BASE_API_URL}/tracker-books/update-quiz`,
      { userId, bookId: quiz.bookId, quizId: quiz._id, selectedAnswer }
    );
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.BackButton} onPress={handleGoBack}>
        <Image source={require("../assets/img/back.png")} />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.progress}>
        <Text style={styles.progressText}>
          {index + 1}/{length}
        </Text>
      </TouchableOpacity>
      <View style={styles.personWrap}></View>
      <Image
        source={require("../assets/quizImages/person.png")}
        style={styles.personImage}
      />

      <View style={styles.questionWrap}>
        <TouchableOpacity style={{marginRight:20,width:50,height:"100%",alignItems:"center"}} onPress={handlePress}>
          <Image source={require("../assets/quizImages/sound.png")} />
        </TouchableOpacity>
        <Text style={styles.questionText}>{quiz.description}</Text>
      </View>

      {!submitted ? (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={
            message === "Correct!"
              ? styles.nextCorrectButton
              : styles.nextWrongButton
          }
          onPress={goToNextPage}
        >
          <Text style={styles.submitButtonText}>Next</Text>
        </TouchableOpacity>
      )}
      {submitted && (
        <TouchableOpacity style={styles.messageWrap}>
          <Text
            style={{
              fontSize: 40,
              color: message === "Correct!" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.answerContainer}>
        {quiz.answers.map((answer, index) => {
          let answerStyle = styles.answerButton;

          if (submitted) {
            if (index === quiz.correctAnswer) {
              answerStyle = styles.correctAnswer;
            } else if (index === selectedAnswer) {
              answerStyle = styles.wrongAnswer;
            }
          } else if (index === selectedAnswer) {
            answerStyle = { ...styles.answerButton, ...styles.selectedAnswer };
          }

          return (
            <TouchableOpacity
              key={index}
              style={answerStyle}
              onPress={() => handleAnswerSelect(index)}
              disabled={submitted}
            >
              <Image source={{ uri: answer }} style={styles.answerImage} />
              {selectedAnswer === index && (
                <View style={styles.tickOverlay}>
                  <Text style={styles.tickText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    position: "relative",
    backgroundColor: "#f3f4f5",
    width: "100%",
    height: "100%",
  },
  message: {
    color: "red",
    fontSize: 20,
  },
  messageWrap: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
  },
  progress: {
    position: "absolute",
    top: 40,
    right: 40,

  },
  progressText:{
    fontSize: 40,
    fontWeight: "bold",
    color:"orange"
  },
  BackButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 50,
    height: 50,
  },
  personWrap: {
    position: "absolute",
    top: 100,
    left: 100,
    width: 280,
    height: 280,
    zIndex: 1,
    borderRadius: 280 / 2,
    borderColor: "orange",
    borderWidth: 5,
  },
  personImage: {
    position: "absolute",
    top: 20,
    left: 130,
    zIndex: 1,
  },
  questionWrap: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 150,
    marginBottom: 20,
    paddingHorizontal: 60,
    paddingVertical: 30,
    backgroundColor: "#F3A04C",
    borderRadius: 10,
    zIndex:2,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  answerContainer: {
    marginTop: 60,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  answerButton: {
    margin: 10,
    borderRadius: 10,
    borderColor: "orange",
    borderWidth: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  selectedAnswer: {
    borderColor: "#5295FA", 
    borderWidth: 10,
  },
  correctAnswer: {
    margin: 10,
    borderRadius: 10,
    borderColor: "green",
    borderWidth: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  wrongAnswer: {
    margin: 10,
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  answerImage: {
    width: 180,
    height: 180,
    resizeMode: "cover",
  },
  tickOverlay: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "blue",
    borderRadius: 50,
    padding: 5,
  },
  tickText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "#F7D553",
    borderRadius: 10,
  },
  nextCorrectButton: {
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "green",
    borderRadius: 10,
  },
  nextWrongButton: {
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "red",
    borderRadius: 10,
  },

  submitButtonText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
  nextButton: {
    color: "#85CA66",
    fontSize: 35,
    fontWeight: "bold",
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
});

export default QuizPage;

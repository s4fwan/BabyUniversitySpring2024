import React, { useState } from "react";
import BackButton from "../BookPages/BackButton";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const QuizPage = ({ quiz }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) {
      Alert.alert("Please select an answer");
      return;
    }
    setSubmitted(true);
    const message =
      selectedAnswer === quiz.correctAnswer ? "Correct!" : "Wrong!";
    Alert.alert(message);
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.questionText}>{quiz.description}</Text>
      <View style={styles.answerContainer}>
        {quiz.answers.map((answer, index) => {
          let answerStyle = styles.answerButton;
          if (submitted) {
            if (index === quiz.correctAnswer) {
              answerStyle = { ...styles.answerButton, ...styles.correctAnswer };
            } else if (index === selectedAnswer) {
              answerStyle = { ...styles.answerButton, ...styles.wrongAnswer };
            }
          }
          return (
            <TouchableOpacity
              key={index}
              style={[
                answerStyle,
                selectedAnswer === index ? styles.selectedAnswer : null,
              ]}
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
      {!submitted && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#f3f4f5",
    width: "100%",
    height: "100%",
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  answerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  answerButton: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  selectedAnswer: {
    borderColor: "blue",
  },
  correctAnswer: {
    borderColor: "green",
    backgroundColor: "#d4edda",
  },
  wrongAnswer: {
    borderColor: "red",
    backgroundColor: "#f8d7da",
  },
  answerImage: {
    width: 200,
    height: 200,
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
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuizPage;

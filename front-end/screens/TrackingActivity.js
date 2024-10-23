import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { useFonts, Itim_400Regular } from "@expo-google-fonts/itim";
import intersect from "../assets/img/Intersect.png";
import back from "../assets/img/back.png";
import book1 from "../assets/booksImages/book1.png";
import book from "../data/book";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PinEntryScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [nonNullAnswers, setNonNullAnswers] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [bookPageCount, setBookPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [numsOfQuiz, setNumsOfQuiz] = useState(0);


  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    async function fetchUserId() {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    }

    fetchUserId();
  }, []);
  useEffect(() => {
    async function fetchTrackingInfo() {
      console.log(book[0].bookId);
      if (userId) {
        try {
          const trackingInfo = await axios.get(
            `http://localhost:4000/api/v1/tracker-books/${userId}/${book[0].bookId}`
          );
          console.log("UserId:", userId);
          const nonNullAnswers = trackingInfo.data.quizTrack.filter(
            (track) => track.selectedAnswer !== null
          );
          const correctAnswers = nonNullAnswers.filter(
            (track) => track.selectedAnswer === track.question.correctAnswer
          );
          console.log(trackingInfo.data)
          setNonNullAnswers(nonNullAnswers.length);
          setCorrectAnswers(correctAnswers.length);
          setBookPageCount(trackingInfo.data.bookPageCount);
          setCurrentPage(trackingInfo.data.currentPage);
          setNumsOfQuiz(trackingInfo.data.quizTrack.length);
        } catch (error) {
          console.error("Failed to fetch tracking info:", error);
        }
      }
    }

    fetchTrackingInfo();
  }, [userId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.BackButton} onPress={handleGoBack}>
        <Image source={back} />
      </TouchableOpacity>
      <View style={styles.titleWrap}>
        <Text style={styles.titleStroke}>Tracking Activities</Text>
        <Text style={styles.title}>Tracking Activities</Text>
      </View>
      <View style={styles.activity}>
        <Image source={book[0].imageLink} style={styles.bookImage} />
        <View style={styles.activityDetails}>
          <Text style={styles.activityTitle}>
            Name: Quantum Physics for babies
          </Text>
          <Text style={styles.activityDescription}>Reading progress: {currentPage}/{bookPageCount}</Text>
          <Text style={styles.activityDescription}>Quizzes's progress: {nonNullAnswers}/{numsOfQuiz}</Text>
          <Text style={styles.activityDescription}>Correct answers: {correctAnswers}/{numsOfQuiz}</Text>
        </View>
      </View>

      <Image source={intersect} style={styles.backgroundImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFEFB",
  },
  BackButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 50,
    height: 50,
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  errorText: {
    fontSize: 20,
    color: "red",
    marginBottom: 20,
    bottom: 110,
  },
  titleWrap: {
    marginTop: 50,
    marginBottom: 150,
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
  activity: {
    width: "75%",
    marginTop: 50,
    marginBottom: 150,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  bookImage: {
    width: 200,
    height: 200,
  },
  activityDetails: {
    padding: 20,
  },
  activityTitle: {
    fontSize: 30,
    marginBottom: 20,
  },
  activityDescription: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default PinEntryScreen;

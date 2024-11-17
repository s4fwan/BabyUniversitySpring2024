import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { BASE_API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useReadAloud } from "../SettingsScreen/Storage";
import FinalPage from "../components/FinalPage";
import CoverPage from "../components/CoverPage";
import BookPage from "../components/BookPage";
import QuizPage from "../components/QuizPage";
import QuizStartPage from "../components/QuizStartPage";

//dimensions for CSS to scale with
const BASE_WIDTH = 1194;
const BASE_HEIGHT = 834;

// Get current screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const scaleWidth = screenWidth / BASE_WIDTH;
const scaleHeight = screenHeight / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight); // Choose the smaller scale factor to maintain aspect ratio

// Helper function to scale sizes
const scaleSize = (size) => size * scale;

// const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const SwipeBook = (isMuted) => {
  const carouselRef = useRef(null);
  const pageRefs = useRef([]);
  const [sound, setSound] = useState();
  const { readAloudVal } = useReadAloud();
  const [currentPage, setCurrentPage] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const route = useRoute();
  const { bookId, currentMode } = route.params;
  const [bookPages, setBookPages] = useState([]);


  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const audioPaths = {
    paths: [
      require("../assets/booksAudio/bookaudio0.mp3"),
      require("../assets/booksAudio/bookaudio1.mp3"),
      require("../assets/booksAudio/bookaudio2.mp3"),
      require("../assets/booksAudio/bookaudio3.mp3"),
      require("../assets/booksAudio/bookaudio4.mp3"),
      require("../assets/booksAudio/bookaudio5.mp3"),
      require("../assets/booksAudio/bookaudio6.mp3"),
      require("../assets/booksAudio/bookaudio7.mp3"),
      require("../assets/booksAudio/bookaudio8.mp3"),
      require("../assets/booksAudio/bookaudio9.mp3"),
      require("../assets/booksAudio/bookaudio10.mp3"),
      require("../assets/booksAudio/bookaudio11.mp3"),
      require("../assets/booksAudio/bookaudio12.mp3"),
      require("../assets/booksAudio/bookaudio13.mp3"),
      require("../assets/booksAudio/bookaudio14.mp3"),
      require("../assets/booksAudio/bookaudio15.mp3"),
      require("../assets/booksAudio/bookaudio16.mp3"),
      require("../assets/booksAudio/bookaudio17.mp3"),
      require("../assets/booksAudio/bookaudio18.mp3"),
      require("../assets/booksAudio/bookaudio19.mp3"),
      require("../assets/booksAudio/bookaudio20.mp3"),
      require("../assets/booksAudio/bookaudio21.mp3"),
      require("../assets/booksAudio/bookaudio22.mp3"),
      require("../assets/booksAudio/bookaudio23.mp3"),
      require("../assets/booksAudio/bookaudio24.mp3"),
    ],
  };

  async function playBookSound(index) {
    if (readAloudVal) {
      const { sound } = await Audio.Sound.createAsync(
        audioPaths["paths"][index]
      );
      setSound(sound);
      await sound.playAsync();
    }
  }
  useEffect(() => {
    if (carouselRef.current) {
      setTimeout(() => {
        carouselRef.current.scrollTo({
          index: currentPage - 1,
          animated: false,
        });
      }, 100);
    }
  }, [screenWidth]);

  useEffect(() => {
    const fetchBookAndQuizInfo = async () => {
      try {
        const playQuiz = (await AsyncStorage.getItem("quizVal"))==="true";
        const userId = await AsyncStorage.getItem("userId");
        const [bookResponse, quizResponse] = await Promise.all([
          axios.get(`${BASE_API_URL}/books/${bookId}`),
          axios.get(`${BASE_API_URL}/questions/${bookId}`),
        ]);
        const bookData = bookResponse.data.pages.map((page, index) => ({
          key: `bookPage${index}`,
          page,
          currentMode,
        }));
        const quizData = quizResponse.data.map((question, index) => ({
          key: `quizPage${index}`,
          quiz: question,
          bookId: bookId,
          currentMode,
          userId: userId,
          index: index,
          length: quizResponse.data.length,
        }));
        const finalPage = {
          key: "finalPage",
          currentMode,
        };
        const coverPage = {
          key: "coverPage",
          currentMode,
        };
        const quizStartPage = {
          key: "quizStartPage",
          currentMode,
        };
        const combinedData = [
          coverPage,
          ...bookData,
          ...(playQuiz === true ? [quizStartPage, ...quizData] : []),
          finalPage,
        ];

        setBookPages(combinedData);
      } catch (e) {
        console.error("Failed to fetch book or quiz info:", e);
      }
    };

    if (bookId) {
      fetchBookAndQuizInfo();
    }
  }, [bookId]);

  useEffect(() => {
    const fetchCurrentPage = async () => {
      try {
        await AsyncStorage.setItem("bookId", bookId);
        const userId = await AsyncStorage.getItem("userId");
        const response = await axios.post(`${BASE_API_URL}/tracker-books`, {
          userId,
          bookId,
        });
        setCurrentPage(response.data.currentPage);
        carouselRef.current.scrollTo({
          index: response.data.currentPage - 1,
          animated: false,
        });
      } catch (e) {
        console.error("Failed to save book ID:", e);
      }
    };
    if (bookId) {
      fetchCurrentPage();
    }
  }, [bookPages, currentMode]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSwipeSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/booksSFX/PageSwipe_SoundEffect.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  const sendCurrentPageToBackend = async (page) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const bookId = await AsyncStorage.getItem("bookId");
      const response = await axios.put(
        `${BASE_API_URL}/tracker-books/update-current-page`,
        {
          userId,
          bookId,
          currentPage: page,
        }
      );
      if (response.status !== 200) {
        throw new Error("Error sending current page to backend");
      }
    } catch (error) {
      console.error("Failed to send page:", error);
    }
  };

  const handlePageChange = (index) => {
    setCurrentPage(index + 1);
    // playBookSound(index);
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(() => {
      sendCurrentPageToBackend(index + 1);
    }, 1000);
    setTimerId(newTimerId);
  };

  const handleGoToNextPage = (nextIndex) => {
    if (carouselRef.current) {
      setTimeout(() => {
        carouselRef.current.scrollTo({ index: nextIndex, animated: false });
      }, 500);
      setCurrentPage(nextIndex + 1);
    }
  };
  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={bookPages}
        width={screenHeight}
        height={screenWidth}
        renderItem={({ item, index }) => {
          const isActive = currentPage - 1 === index;
          if (item.page) {
            return (
              <BookPage
                page={item.page}
                ref={(el) => (pageRefs.current[index] = el)}
                isActive={isActive}
              />
            );
          }

          if (item.quiz) {
            return (
              <QuizPage
                quiz={item.quiz}
                userId={item.userId}
                currentMode={item.currentMode}
                ref={(el) => (pageRefs.current[index] = el)}
                isActive={isActive}
                index={item.index}
                length={item.length}
                goToNextPage={() => handleGoToNextPage(index + 1)}
              />
            );
          }

          // {Array.isArray(item.quiz) && item.quiz.map((quizItem, quizIndex) => (
          //   <QuizPage
          //     key={quizIndex}
          //     quiz={quizItem}
          //     userId={item.userId}
          //     currentMode={item.currentMode}
          //     ref={(el) => (pageRefs.current[index] = el)}
          //     isActive={isActive}
          //     goToNextPage={() => handleGoToNextPage(index + 1)}
          //     quizIndex={quizIndex}
          //   />
          // ))}

          if (item.key === "finalPage") {
            return (
              <FinalPage
                ref={(el) => (pageRefs.current[index] = el)}
                isActive={isActive}
                currentMode={item.currentMode}
              />
            );
          }
          if (item.key === "quizStartPage") {
            return (
              <QuizStartPage
                ref={(el) => (pageRefs.current[index] = el)}
                isActive={isActive}
                currentMode={item.currentMode}
              />
            );
          }

          if (item.key === "coverPage") {
            return (
              <CoverPage
                ref={(el) => (pageRefs.current[index] = el)}
                isActive={isActive}
                currentMode={item.currentMode}
              />
            );
          }
        }}
        onSnapToItem={handlePageChange}
        onScrollEnd={() => {
          playSwipeSound();
          const index = carouselRef.current.currentIndex;
          if (
            pageRefs.current[index] &&
            pageRefs.current[index].playAnimation
          ) {
            pageRefs.current[index].playAnimation();
          }
        }}
      />
      <Text style={styles.pageNumber}>Current Page: {currentPage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SwipeBook;

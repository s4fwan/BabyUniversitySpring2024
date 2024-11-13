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
import DropdownButton from "../components/DropdownButton";

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


  const pageInfo = Array.from({ length: bookPages.length }, (_, index) => ({
    title: `Page ${index + 1}`,
  }));

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
    if (index == bookPages.length-1 && currentPage === 1) {
      carouselRef.current.scrollTo({
        index: 0,
        animated: false,
      });
      return; 
    }
  
    if (index ==0 && currentPage === bookPages.length) {
      carouselRef.current.scrollTo({
        index: currentPage - 1,
        animated: false,
      });
      return; 
    }
    
    setCurrentPage(index + 1);
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(() => {
      sendCurrentPageToBackend(index + 1);
    }, 1000);
    setTimerId(newTimerId);
  };

  const handleGoToNextPage = (nextIndex) => {
    console.log(nextIndex)
    if (carouselRef.current) {
      setCurrentPage(nextIndex + 1);
      setTimeout(() => {
        carouselRef.current.scrollTo({ index: nextIndex, animated: false });
      }, 500);
      
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <DropdownButton pageInfo={pageInfo} goToNextPage={handleGoToNextPage} currentPage={currentPage} />
        </View>
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
                pageInfo={pageInfo}
                goToNextPage={handleGoToNextPage}
                currentIndex={index}
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
    position: "relative",
  },
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer:{
    position: "absolute",
    width: "100%",
    top: "10%",
    zIndex: 1,
  },
});
export default SwipeBook;

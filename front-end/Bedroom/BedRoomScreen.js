import React, { useState, useEffect } from "react";
import SwipeBook from "../screens/SwipeBook";
import books from "../data/book";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
  Image,
  ViewStyle,
  Dimensions,
  ScrollView
} from "react-native";
import MenuButton from "../MenuButton";
import LogoutSuccessful from "../Logout Page";
import { useFonts, Itim_400Regular } from "@expo-google-fonts/itim";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BedRoomScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({ Itim_400Regular });

  const openBook = (bookId) => {
    navigation.navigate("SwipeBook", { bookId });
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        McLaren: require("../assets/fonts/McLaren.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background */}
      <Image
        source={require("../assets/bookshelfImages/bookshelfBackground.png")}
        style={styles.background}
      />
      <View style={styles.rowContainer}>
      {books.map((book) => (
        <TouchableOpacity
          key={book.bookId}
          onPress={() => openBook(book.bookId)}
          style={styles.bookItem}
        >
          <Image source={require("../assets/bookshelfImages/book1.png")} 
          style={styles.books} />
        </TouchableOpacity>
      ))}
        <Image source={require("../assets/bookshelfImages/bookshelfBottom.png")} 
          style={styles.bookshelfBottom} />
        <TouchableOpacity
          style={styles.bookItem}
        >
          <Image source={require("../assets/bookshelfImages/book2.png")} 
          style={styles.books} />
        </TouchableOpacity>
        <Image source={require("../assets/bookshelfImages/bookshelfBottom.png")} 
          style={styles.bookshelfBottom} />
        <TouchableOpacity
          style={styles.bookItem}
        >
          <Image source={require("../assets/bookshelfImages/book3.png")} 
          style={styles.books} />
        </TouchableOpacity>
        <Image source={require("../assets/bookshelfImages/bookshelfBottom.png")} 
          style={styles.bookshelfBottom} />
        <TouchableOpacity
          style={styles.bookItem}
        >
          <Image source={require("../assets/bookshelfImages/book4.png")} 
          style={styles.books} />
        </TouchableOpacity>
        <Image source={require("../assets/bookshelfImages/bookshelfBottom.png")} 
          style={styles.bookshelfBottom} />
      </View>
      <View style={styles.rowContainer}>
      <Image source={require("../assets/bookshelfImages/bookshelfBottom.png")} 
          style={styles.bookshelfBottom} />
      </View>
      <View style={styles.rowContainer}>
      <Image source={require("../assets/bookshelfImages/bookshelfBottom.png")} 
          style={styles.bookshelfBottom} />
      </View>
      <View style={styles.rowContainer}>
      <Image source={require("../assets/bookshelfImages/bookshelfBottom.png")} 
          style={styles.bookshelfBottom} />
      </View>
      <Image
        source={require("../assets/bookshelfImages/bookshelfLeft.png")}
        style={styles.bookshelfLeft}
      />
      <Image
        source={require("../assets/bookshelfImages/bookshelfRight.png")}
        style={styles.bookshelfRight}
      />
      <MenuButton userMode="parents" />
      <View style={styles.bookshelfHeader}>
        <Text style={styles.bookshelfHeaderText}>My Bookshelf</Text>
      </View>
      
    </View>
  );
};
export default BedRoomScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    resizeMode: "contain",
  },

  bookshelfHeader: {
    backgroundColor: "#511804",
    width: "100%",
    height: "15%",
    top: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  bookshelfHeaderText: {
    fontFamily: "McLaren",
    color: "#FFF",
    fontSize: 45,
  },

  bookshelfLeft: {
    position: "absolute",
    left: 0,
    width: width * 0.05,
  },

  bookshelfRight: {
    position: "absolute",
    right: 0,
    width: width * 0.05,
  },
  
  rowContainer: {
    width: width * 0.9,
    height: height * 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bookItem: {
    width: "20%", 
    height: "100%",
    marginHorizontal: 5, // Add some margin between items
    aspectRatio: 1, // Adjust this based on the desired width/height ratio of the book
  },

  books: {
      width: "100%", // Full width of the bookItem
      height: "100%", // Full height of the bookItem
      resizeMode: "contain", // Ensures the image scales properly
  },

  bookshelfBottom: {
    bottom: "-16%",
    left: "-2%",
    height: height * 0.07,
    position: "absolute",
  }
});

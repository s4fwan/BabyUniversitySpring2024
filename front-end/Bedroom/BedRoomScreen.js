import React, { useState, useEffect } from "react";
import SwipeBook from "../screens/SwipeBook";
import books from "../data/book";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import MenuButton from "../MenuButton";
import LogoutSuccessful from "../Logout Page";
import { useFonts, Itim_400Regular } from "@expo-google-fonts/itim";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const BedRoomScreen = ({ navigation }) => {

  const route = useRoute();

  const { currentMode, isBrowsingBook } = route.params;
  const openBook = (bookId) => {
    navigation.navigate("SwipeBook", { bookId, currentMode });
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
        <View style={styles.bookWrap}>
          {books.map((book) => (
            <TouchableOpacity
              key={book.bookId}
              onPress={() => openBook(book.bookId)}
              style={styles.bookItem}
            >
              <Image
                source={require("../assets/bookshelfImages/book1.png")}
                style={styles.books}
              />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.bookItem}>
            <Image
              source={require("../assets/bookshelfImages/book2.png")}
              style={styles.books}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bookItem}>
            <Image
              source={require("../assets/bookshelfImages/book3.png")}
              style={styles.books}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bookItem}>
            <Image
              source={require("../assets/bookshelfImages/book4.png")}
              style={styles.books}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/bookshelfImages/bookshelfBottom.png")}
          style={styles.bookshelfBottom}
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.bookWrap}></View>
        <Image
          source={require("../assets/bookshelfImages/bookshelfBottom.png")}
          style={styles.bookshelfBottom}
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.bookWrap}></View>
        <Image
          source={require("../assets/bookshelfImages/bookshelfBottom.png")}
          style={styles.bookshelfBottom}
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.bookWrap}></View>
        <Image
          source={require("../assets/bookshelfImages/bookshelfBottom.png")}
          style={styles.bookshelfBottom}
        />
      </View>
      <MenuButton userMode={currentMode} isBrowsingBook={isBrowsingBook} />
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
    paddingTop: 170,
  },

  background: {
    position: "absolute",
    top: 0,
    resizeMode: "contain",
  },
  bookWrap: {
    height: 150,
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor:"red",
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
    width: "100%",
    zIndex: 1,
  },

  bookItem: {
    width: 160,
    // height: 200,
    marginHorizontal: 5,
    aspectRatio: 1,
  },

  books: {
    width: "100%", // Full width of the bookItem
    height: "100%", // Full height of the bookItem
    // resizeMode: "contain", // Ensures the image scales properly
  },

  bookshelfBottom: {
    width: "100%",
    height: height * 0.07,
  },
});

import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Import your images using ES6 import syntax
import userIcon from "./assets/menuImages/userIcon.png";
import settingsIcon from "./assets/menuImages/settings.png";
import kidIcon from "./assets/menuImages/kidIcon.png";
import logoutIcon from "./assets/menuImages/logoutIcon.png";
import toggleButtonIcon from "./assets/menuImages/toggleButton.png";
import parentsIcon from "./assets/menuImages/parents.png";
import BackIcon from "./assets/menuImages/BackIcon.png";

const MenuButton = ({ userMode, isBrowsingBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  // const [currentMode, setCurrentMode] = useState("kids");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const handleOptionClick = (option) => {
    if (userMode === "parents") {
      if (option === "Switch to Kids mode") {
        navigation.navigate("Bedroom", { currentMode: "kids" });
      } else if (option === "Settings") {
        console.log(option);
        navigation.navigate("Settings");
      } else if (option === "Change Pin") {
        console.log(option);
        navigation.navigate("ChangePin");
      } else if (option === "Back to Parent Page") {
        console.log(option);
        navigation.navigate("ParentUI");
      }
    } else {
      if (option === "Switch to Parents mode") {
        console.log(option);
        navigation.navigate("PinEntry");
      } else if (option === "Settings") {
        console.log(option);
        navigation.navigate("Settings");
      } else if (option === "Logout") {
        console.log(option);
        navigation.navigate("Logout");
      }
      if (option === "UserName") {
        console.log(option);
        navigation.navigate("UserName");
      }
    }
  };

  // Options for parents mode
  // const parentOptions = [
  //   { label: 'UserName', image: userIcon },
  //   { label: 'Switch to Kids mode', image: kidIcon },
  //   { label: 'Settings', image: settingsIcon },
  //   {label: 'Change Pin',image: parentsIcon}
  // ];
  const parentOptions = [
    { label: "UserName", image: userIcon },
    {
      label:
        isBrowsingBook && userMode === "parents"
          ? "Back to Parent Page"
          : "Switch to Kids mode",
      image: isBrowsingBook && userMode === "parents" ? BackIcon : kidIcon,
    },
    { label: "Settings", image: settingsIcon },
    { label: "Change Pin", image: parentsIcon },
  ];

  // Options for kids mode
  const kidsOptions = [
    { label: "UserName", image: userIcon },
    { label: "Switch to Parents mode", image: parentsIcon },
    { label: "Settings", image: settingsIcon },
    { label: "Logout", image: logoutIcon },
  ];

  const options = userMode === "parents" ? parentOptions : kidsOptions;

  return (
    <View style={styles.containerForMenu}>
      <TouchableOpacity onPress={toggleMenu} style={styles.toggleButton}>
        <Image source={toggleButtonIcon} style={styles.toggleImage} />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                index === options.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => handleOptionClick(option.label)}
            >
              <View style={styles.imageContainer}>
                <Image source={option.image} style={styles.optionImage} />
              </View>
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerForMenu: {
    position: "absolute",
    top: 35,
    left: 30,
    zIndex: 1,
  },
  toggleButton: {
    backgroundColor: "transparent",
    borderRadius: 5,
    color: "#D17E21",
  },
  toggleImage: {
    width: 41,
    height: 31,
  },
  optionsContainer: {
    marginTop: 5,
    backgroundColor: "#E2B27F",
    borderRadius: 15,
    marginLeft: 25,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingRight: 60,
  },
  imageContainer: {
    width: 47,
    height: 44,
    marginRight: 10,
  },
  optionImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
  },
});

export default MenuButton;

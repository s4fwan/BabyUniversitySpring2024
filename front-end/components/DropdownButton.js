// DropdownButton.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DropdownButton = ({ pageInfo, goToNextPage, currentPage }) => {
  return (
    <View style={styles.dropdownWrapper}>
      <SelectDropdown
          data={pageInfo}
          onSelect={(selectedItem, index) => {
            goToNextPage(index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  { `Page ${currentPage}`}
                </Text>
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            const isCurrentPage = index === currentPage-1;
            return (
              <View
                style={{
                    ...styles.dropdownItemStyle,
                    ...(isCurrentPage && { backgroundColor: "#D17E21" }),
                }}
              >
                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: "#D17E21",
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 12,
      },
      dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: "500",
        color: "#151E26",
      },
      dropdownButtonArrowStyle: {
        fontSize: 28,
      },
      dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
      },
      dropdownMenuStyle: {
        backgroundColor: "#E9ECEF",
        borderRadius: 8,
      },
      dropdownItemStyle: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        backgroundColor: "rgba(209, 126, 33, 0.3)",
      },
      dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: "500",
        color: "#151E26",
      },
      dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
      },
      dropdownWrapper: {
        width: "95%",
        alignItems: "flex-end",
      },
});

export default DropdownButton;
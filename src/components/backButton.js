import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import back from "../images/back.png"; // Import your back button image here

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={back} style={styles.backImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backImage: {
    marginHorizontal: 4,
    margin: 0,
    width: 30,
    height: 30,
  },
});

export default BackButton;

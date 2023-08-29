import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SucessRegistrationScreen = () => {
  const navigation = useNavigation();
  const [isRegisterDialogVisible, setRegisterDialogVisible] = useState(false);
  const [isSignInDialogVisible, setSignInDialogVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegisterPress = () => {
    setRegisterDialogVisible(true);
  };

  const handleSignInPress = () => {
    setSignInDialogVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Home</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: "10%",
    margin: 0,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  textContainer: {
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 16,
    alignItems: "center",
  },
  headerText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
    paddingBottom: 10,
    textAlign: "center",
  },
  SubtitleText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default SucessRegistrationScreen;

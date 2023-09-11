import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import done from "../images/correct.png";

const SucessRegistrationScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Image source={done} style={styles.image} />
          <Text style={styles.headerText}>We’ve saved your details</Text>
          <Text style={styles.SubtitleText}>
            You can now go and explore the features of the application.
          </Text>
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
    paddingTop: "25%",
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
  image: {
    width: 350,
    height: 350,
    marginBottom: 0,
    PaddingBottom: 0,
  },
});

export default SucessRegistrationScreen;

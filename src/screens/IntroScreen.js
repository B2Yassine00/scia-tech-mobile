import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../images/logo.png";

const IntroScreen = () => {
  const navigation = useNavigation();
  const duration = 3000;
  const [loadingProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.timing(loadingProgress, {
      toValue: 100,
      duration: duration,
      useNativeDriver: false,
    });

    animation.start(() => {
      navigation.navigate("Onboarding");
    });

    loadingProgress.addListener((progress) => {
      const currentWidth = (progress.value / 100) * 200;
      setProgressBarWidth(currentWidth);
    });

    // Clean up the animation when the component unmounts
    return () => {
      animation.stop();
      loadingProgress.removeAllListeners();
    };
  }, [loadingProgress, navigation, duration]);

  const [progressBarWidth, setProgressBarWidth] = useState(0);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progress, { width: progressBarWidth }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  progressBar: {
    width: 200,
    height: 10,
    backgroundColor: "#ccc",
    marginTop: 20,
  },
  progress: {
    height: "100%",
    backgroundColor: "#05668D",
  },
});

export default IntroScreen;

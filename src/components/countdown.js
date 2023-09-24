import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  useEffect(() => {
    const targetTime = new Date().setHours(16, 20, 9);
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = Math.max(0, targetTime - currentTime);

      const hours = Math.floor(remainingTime / 3600000);
      const minutes = Math.floor((remainingTime % 3600000) / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);

      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");

      const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      setTimeLeft(formattedTime);

      if (remainingTime === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Text style={styles.timer}>{timeLeft}</Text>;
};

const styles = StyleSheet.create({
  timer: {
    fontSize: 70,
    fontWeight: "bold",
    paddingBottom: "2%",
  },
});

export default CountdownTimer;

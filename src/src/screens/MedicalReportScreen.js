import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MedicalReportScreen = () => {
  const navigation = useNavigation();
  const [medication, setMedication] = useState("No");
  const [sleepTime1, setSleepTime1] = useState("No");
  const [sleepTime2, setSleepTime2] = useState("No");
  const [sleepTime3, setSleepTime3] = useState("No");
  const [sleepTime4, setSleepTime4] = useState("No");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNextPress = () => {
    navigation.replace("SucessRegistration");
  };

  const isFormValid =
    medication && sleepTime1 && sleepTime2 && sleepTime3 && sleepTime4;

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Medical Report</Text>
          <Text style={styles.subtitleText}>
            Please help us generate a general report to help us determine what
            works for you.
          </Text>
        </View>
        <View style={styles.booleanContainer}>
          <Text style={styles.booleanText}>
            Do you currently take any medication?
          </Text>
          <View style={styles.booleanOptions}>
            <Pressable
              style={[
                styles.booleanButton,
                medication === "Yes" && styles.selectedButton,
              ]}
              onPress={() => setMedication("Yes")}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </Pressable>
            <Pressable
              style={[
                styles.booleanButton,
                medication === "No" && styles.selectedButton,
              ]}
              onPress={() => setMedication("No")}
            >
              <Text style={styles.buttonText}>No</Text>
            </Pressable>
            <Pressable
              style={[
                styles.booleanButton,
                medication === "Sometimes" && styles.selectedButton,
              ]}
              onPress={() => setMedication("Sometimes")}
            >
              <Text style={styles.buttonText}>Sometimes</Text>
            </Pressable>
          </View>
        </View>
        {/* Repeat the above pattern for other boolean fields */}
        <View style={styles.booleanContainer}>
          <Text style={styles.booleanText}>
            Do you have a usual sleep time?
          </Text>
          <View style={styles.booleanOptions}>
            <Pressable
              style={[
                styles.booleanButton,
                sleepTime1 === "Yes" && styles.selectedButton,
              ]}
              onPress={() => setSleepTime1("Yes")}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </Pressable>
            <Pressable
              style={[
                styles.booleanButton,
                sleepTime1 === "No" && styles.selectedButton,
              ]}
              onPress={() => setSleepTime1("No")}
            >
              <Text style={styles.buttonText}>No</Text>
            </Pressable>
            <Pressable
              style={[
                styles.booleanButton,
                sleepTime1 === "Sometimes" && styles.selectedButton,
              ]}
              onPress={() => setSleepTime1("Sometimes")}
            >
              <Text style={styles.buttonText}>Sometimes</Text>
            </Pressable>
          </View>
        </View>
        {errorMessage !== "" && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <Pressable
          style={[styles.registerButton, { opacity: isFormValid ? 1 : 0.5 }]}
          onPress={handleNextPress}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 0,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: "10%",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  textContainer: {
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 16,
  },
  headerText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
    paddingTop: 30,
    paddingBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    paddingEnd: 30,
    paddingBottom: 15,
  },
  booleanContainer: {
    marginBottom: 10,
  },
  booleanText: {
    fontSize: 16,
    marginBottom: 6,
    fontStyle: "italic",
  },
  booleanOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  booleanButton: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  selectedButton: {
    backgroundColor: "#000",
    marginLeft: 5,
    marginRight: 5,
  },
  registerButton: {
    backgroundColor: "#05668D",
    borderRadius: 100,
    marginBottom: 1,
    marginTop: 10,
    paddingVertical: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default MedicalReportScreen;

import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const AboutMeScreen = () => {
  const navigation = useNavigation();
  const [firstName, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [isPickerVisible1, setIsPickerVisible1] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [isPickerVisible2, setIsPickerVisible2] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState("");
  const [isPickerVisible3, setIsPickerVisible3] = useState(false);
  const [sleepTime1, setSleepTime1] = useState("No");
  const [isFormValid, setIsFormValid] = useState(false);

  const isFormValidNext = () => {
    return (
      firstName && selectedAge && selectedWeight && selectedHeight && sleepTime1
    );
  };

  const handleNextPress = () => {
    if (
      !firstName ||
      !selectedAge ||
      !selectedWeight ||
      !selectedHeight ||
      !sleepTime1
    ) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    navigation.replace("MedicalReport");
  };

  const handleAgeChange = (age) => {
    setSelectedAge(age);
    setIsPickerVisible1(false);
    setIsFormValid(age >= 8 && age <= 100);
  };

  const handleWeightChange = (weight) => {
    setSelectedWeight(weight);
    setIsPickerVisible2(false);
  };

  const weightOptions = Array.from({ length: 181 }, (_, index) => ({
    label: `${index + 20} kg`,
    value: index + 20,
  }));

  const handleHeightChange = (height) => {
    setSelectedHeight(height);
    setIsPickerVisible3(false);
  };

  const heightOptions = Array.from({ length: 121 }, (_, index) => ({
    label: `${index + 100} cm`,
    value: index + 100,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>About You</Text>
          <Text style={styles.SubtitleText}>
            Please enter your full name, as well as your email address.
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={(text) => {
            setName(text);
            setIsFormValid(!!text);
          }}
        />
        <TextInput
          style={styles.input}
          value={selectedAge.toString()}
          placeholder="Age"
          onChangeText={(text) => setSelectedAge(parseInt(text))}
          onFocus={() => setIsPickerVisible1(true)}
          onBlur={() => setIsPickerVisible1(false)}
        />
        {isPickerVisible1 && (
          <Picker selectedValue={selectedAge} onValueChange={handleAgeChange}>
            {Array.from({ length: 93 }, (_, index) => (
              <Picker.Item
                label={(index + 8).toString()}
                value={index + 8}
                key={index}
              />
            ))}
          </Picker>
        )}
        <TextInput
          style={styles.input}
          value={`${selectedWeight.toString()}`}
          placeholder="Weight"
          onChangeText={(text) => setSelectedWeight(parseInt(text))}
          onFocus={() => setIsPickerVisible2(true)}
          onBlur={() => setIsPickerVisible2(false)}
        />
        {isPickerVisible2 && (
          <Picker
            selectedValue={selectedWeight}
            onValueChange={handleWeightChange}
          >
            {weightOptions.map((option) => (
              <Picker.Item
                label={`${option.label}`}
                value={option.value}
                key={option.value}
              />
            ))}
          </Picker>
        )}
        <TextInput
          style={styles.input}
          value={`${selectedHeight.toString()}`}
          placeholder="Height"
          onChangeText={(text) => setSelectedHeight(parseInt(text))}
          onFocus={() => setIsPickerVisible3(true)}
          onBlur={() => setIsPickerVisible3(false)}
        />
        {isPickerVisible3 && (
          <Picker
            selectedValue={selectedHeight}
            onValueChange={handleHeightChange}
          >
            {heightOptions.map((option) => (
              <Picker.Item
                label={option.label}
                value={option.value}
                key={option.value}
              />
            ))}
          </Picker>
        )}
        <View style={styles.booleanContainer}>
          <View style={styles.booleanOptions}>
            <Pressable
              style={[
                styles.booleanButton,
                sleepTime1 === "Yes" && styles.selectedButton,
              ]}
              onPress={() => setSleepTime1("Yes")}
            >
              <Text style={styles.buttonText}>Male</Text>
            </Pressable>
            <Pressable
              style={[
                styles.booleanButton,
                sleepTime1 === "No" && styles.selectedButton,
              ]}
              onPress={() => setSleepTime1("No")}
            >
              <Text style={styles.buttonText}>Female</Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          style={[
            styles.registerButton,
            { opacity: isFormValidNext() ? 1 : 0.5 },
          ]}
          onPress={handleNextPress}
          disabled={!isFormValidNext()}
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
    paddingRight: 30,
    paddingLeft: 30,
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
  },
  headerText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
    paddingTop: 30,
    paddingBottom: 10,
  },
  input: {
    marginTop: 6,
    paddingRight: 40,
    marginBottom: 6,
    height: 40,
    width: "100%",
    backgroundColor: "#F2F2F2",
    padding: 12,
    fontSize: 14,
    borderRadius: 20,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginBottom: 6,
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
    fontSize: 18,
    textAlign: "center",
  },
  SubtitleText: {
    fontSize: 16,
    paddingEnd: 30,
    paddingBottom: 15,
  },
  booleanContainer: {
    marginBottom: 10,
    marginTop: 10,
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
});

export default AboutMeScreen;

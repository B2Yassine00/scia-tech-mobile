import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Axios from "axios";
import BackButton from "../components/backButton";

const AboutMeModify = () => {
  const navigation = useNavigation();
  const [firstName, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [isPickerVisible1, setIsPickerVisible1] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [isPickerVisible2, setIsPickerVisible2] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState("");
  const [isPickerVisible3, setIsPickerVisible3] = useState(false);
  const [selectedGender, setSelectedGender] = useState(""); // New state to keep track of the selected gender
  const [isFormValid, setIsFormValid] = useState(false);

  const isFormValidNext = () => {
    return (
      firstName &&
      selectedAge &&
      selectedWeight &&
      selectedHeight &&
      selectedGender
    );
  };

  const handleNextPress = () => {
    if (
      !firstName ||
      !selectedAge ||
      !selectedWeight ||
      !selectedHeight ||
      !selectedGender
    ) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    // Prepare the user information object
    const userInfo = {
      fullName: firstName,
      height: selectedHeight,
      weight: selectedWeight,
      age: selectedAge,
      gender: selectedGender,
    };

    // Send a POST request to the server to store user information
    Axios.post("http://localhost:3000/update", userInfo)
      .then((response) => {
        // Handle success
        console.log(response.data.message);
        navigation.navigate("Profile");
      })
      .catch((error) => {
        // Handle error
        console.error("Error storing user information:", error);
        // Optionally, display an error message to the user
        setErrorMessage("An error occurred while saving user information.");
      });
  };

  useEffect(() => {
    // Fetch user information from the /info endpoint
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3000/info", {
        method: "GET",
        headers: {
          // Add any required headers here, e.g., authentication headers
          // if your server requires them.
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update the component state with the fetched data
        setName(data.fullName);
        setSelectedAge(data.age.toString());
        setSelectedWeight(data.weight.toString());
        setSelectedHeight(data.height.toString());

        // Set the gender button based on the fetched gender
        if (data.gender === "Male" || data.gender === "Female") {
          setSelectedGender(data.gender); // Set the selected gender state
        }

        setIsFormValid(true);
      } else {
        console.error("Failed to fetch user information");
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const weightOptions = Array.from({ length: 181 }, (_, index) => ({
    label: `${index + 20} kg`,
    value: (index + 20).toString(),
  }));

  const heightOptions = Array.from({ length: 121 }, (_, index) => ({
    label: `${index + 100} cm`,
    value: (index + 100).toString(),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <BackButton />
          <Text style={styles.headerText}>About You</Text>
          <Text style={styles.SubtitleText}>
            Please enter your full name, as well as your email address.
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={firstName}
          onChangeText={(text) => {
            setName(text);
            setIsFormValid(!!text);
          }}
        />
        <TextInput
          style={styles.input}
          value={selectedAge.toString()}
          placeholder="Age"
          onChangeText={(text) => setSelectedAge(text)}
          onFocus={() => setIsPickerVisible1(true)}
          onBlur={() => setIsPickerVisible1(false)}
        />
        {isPickerVisible1 && (
          <Picker selectedValue={selectedAge} onValueChange={setSelectedAge}>
            {Array.from({ length: 93 }, (_, index) => (
              <Picker.Item
                label={(index + 8).toString()}
                value={(index + 8).toString()}
                key={index}
              />
            ))}
          </Picker>
        )}
        <TextInput
          style={styles.input}
          value={selectedWeight.toString()}
          placeholder="Weight"
          onChangeText={(text) => setSelectedWeight(text)}
          onFocus={() => setIsPickerVisible2(true)}
          onBlur={() => setIsPickerVisible2(false)}
        />
        {isPickerVisible2 && (
          <Picker
            selectedValue={selectedWeight}
            onValueChange={setSelectedWeight}
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
          value={selectedHeight.toString()}
          placeholder="Height"
          onChangeText={(text) => setSelectedHeight(text)}
          onFocus={() => setIsPickerVisible3(true)}
          onBlur={() => setIsPickerVisible3(false)}
        />
        {isPickerVisible3 && (
          <Picker
            selectedValue={selectedHeight}
            onValueChange={setSelectedHeight}
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
                selectedGender === "Male" && styles.selectedButton,
              ]}
              onPress={() => setSelectedGender("Male")}
            >
              <Text style={styles.buttonText}>Male</Text>
            </Pressable>
            <Pressable
              style={[
                styles.booleanButton,
                selectedGender === "Female" && styles.selectedButton,
              ]}
              onPress={() => setSelectedGender("Female")}
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
          <Text style={styles.buttonText}>Update</Text>
        </Pressable>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
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
    paddingTop: 15,
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

export default AboutMeModify;

import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { Dialog } from "react-native-popup-dialog";
import Icon from "react-native-vector-icons/FontAwesome";
import image2 from "../../assets/placeholder.png";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import axios from "axios";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [isRegisterDialogVisible, setRegisterDialogVisible] = useState(false);
  const [isSignInDialogVisible, setSignInDialogVisible] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const validateEmail = (inputEmail) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(inputEmail);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);

    // Define regular expressions for each password requirement
    const lengthRegex = /.{8,}/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    const isLengthValid = lengthRegex.test(text);
    const hasNumber = numberRegex.test(text);
    const hasSpecialChar = specialCharRegex.test(text);
    const hasUppercase = uppercaseRegex.test(text);
    const hasLowercase = lowercaseRegex.test(text);

    setPasswordValid(
      isLengthValid &&
        hasNumber &&
        hasSpecialChar &&
        hasUppercase &&
        hasLowercase
    );
  };

  const handleConfirmPasswordChange = (text) => {
    const isPasswordMatching = text === password;
    setConfirmPassword(
      isPasswordMatching &&
        password.length >= 8 &&
        /\d/.test(password) &&
        /.{8,}/.test(password) &&
        /\d/.test(password) &&
        /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password)
    );
  };

  const handleRegistration = async () => {
    if (!isEmailValid || !isPasswordValid) {
      Alert.alert("Invalid Input", "Please check your email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        email,
        password,
      });

      if (response.status === 200) {
        // Registration successful, you can navigate to a success screen or log in the user
        navigation.replace("About");
      } else {
        // Handle authentication errors
        Alert.alert(
          "Registration Failed",
          "Failed to register. Please try again."
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle authentication errors
        Alert.alert(
          "Registration Failed",
          "Failed to register. Please try again."
        );
      } else {
        // Handle network errors
        Alert.alert(
          "Network Error",
          "An error occurred while connecting to the server. Please check your network connection and try again."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}></View>
      <View style={styles.bottomContainer}>
        <ImageBackground
          source={image2}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>
              We're excited to {"\n"}
              have you on board!
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Please enter a valid email address..."
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailValid(true);
            }}
            onBlur={() => {
              setEmailValid(validateEmail(email));
            }}
            keyboardType="email-address"
          />
          {!isEmailValid && (
            <Text style={styles.errorText}>
              Please enter a valid email address.
            </Text>
          )}
          <View style={styles.ViewPassword}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Enter your password here..."
              secureTextEntry={!showPassword1}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <Pressable
              onPress={togglePasswordVisibility1}
              style={styles.eyeIcon1}
            >
              <Icon
                name={showPassword1 ? "eye-slash" : "eye"}
                size={20}
                color="black"
              />
            </Pressable>
          </View>
          <View style={styles.ViewPassword}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Confirm your password here..."
              secureTextEntry={!showPassword2}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
            />
            <Pressable
              onPress={togglePasswordVisibility2}
              style={styles.eyeIcon2}
            >
              <Icon
                name={showPassword2 ? "eye-slash" : "eye"}
                size={20}
                color="black"
              />
            </Pressable>
          </View>
          {(!isPasswordValid || !confirmPassword) && password.length > 0 && (
            <Text style={styles.errorText}>
              Password must be at least 8 characters long and contain at least 1
              number, 1 special character, 1 uppercase letter, and 1 lowercase
              letter.
            </Text>
          )}
          <Pressable
            style={[
              styles.registerButton,
              (!isEmailValid || !isPasswordValid || !confirmPassword) && {
                opacity: 0.5,
              },
            ]}
            onPress={handleRegistration} // Call handleRegistration when the button is pressed
            disabled={!isEmailValid || !isPasswordValid || !confirmPassword}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
          <Pressable onPress={() => navigation.replace("Login")}>
            <Text style={styles.signInText}>Login</Text>
          </Pressable>
        </ImageBackground>
      </View>
      <Dialog
        visible={isRegisterDialogVisible}
        onTouchOutside={() => setRegisterDialogVisible(false)}
      >
        <View style={styles.pressed}>
          <Text>Register Button pressed</Text>
        </View>
      </Dialog>
      <Dialog
        visible={isSignInDialogVisible}
        onTouchOutside={() => setSignInDialogVisible(false)}
      >
        <View style={styles.pressed}>
          <Text>Login Button pressed</Text>
        </View>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05668D",
    paddingTop: "10%",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    height: "35%",
    width: 400,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  headerText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
    paddingStart: 30,
    paddingTop: 30,
    paddingBottom: 10,
  },
  input: {
    marginTop: 6,
    paddingRight: 40,
    marginBottom: 6,
    height: 40,
    width: "80%",
    backgroundColor: "#F2F2F2",
    padding: 12,
    fontSize: 14,
    borderRadius: 20,
  },
  inputPassword: {
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
  ViewPassword: {
    width: "80%",
  },
  pressed: {
    padding: 10,
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: "#05668D",
    borderRadius: 100,
    marginBottom: 1,
    marginTop: 20,
    paddingHorizontal: 35,
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  signInText: {
    textAlign: "center",
    color: "#05668D",
    fontWeight: "normal",
    fontSize: 15,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  eyeIcon1: {
    marginTop: 6,
    marginRight: 10,
    position: "absolute",
    top: "37%",
    right: 0,
    transform: [{ translateY: -10 }],
  },
  eyeIcon2: {
    marginTop: 6,
    marginRight: 10,
    position: "absolute",
    top: "37%",
    right: 0,
    transform: [{ translateY: -10 }],
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: "10%",
    paddingRight: "10%",
  },
});

export default RegistrationScreen;

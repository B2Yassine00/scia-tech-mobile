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

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isRegisterDialogVisible, setRegisterDialogVisible] = useState(false);
  const [isSignInDialogVisible, setSignInDialogVisible] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(true);

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

  const handleRegisterPress = () => {
    setRegisterDialogVisible(true);
  };

  const handleSignInPress = () => {
    setSignInDialogVisible(true);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordValid(text.length >= 8 && text === confirmPassword);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setPasswordValid(text.length >= 8 && text === password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>{/* Empty view with styling */}</View>
      <View style={styles.bottomContainer}>
        <ImageBackground
          source={image2}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>
              Hey Buddy, {"\n"}
              Welcome back!
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
          {!isPasswordValid && (
            <Text style={styles.errorText}>
              Password must be at least 8 characters long and match the confirm
              password.
            </Text>
          )}
          <Pressable
            style={[
              styles.registerButton,
              (!isEmailValid ||
                !isPasswordValid ||
                email.length < 1 ||
                password.length < 1 ||
                confirmPassword.length < 1) && { opacity: 0.5 },
            ]}
            onPress={() => {
              if (
                isEmailValid &&
                isPasswordValid &&
                email.length >= 1 &&
                password.length >= 1 &&
                confirmPassword.length >= 1
              ) {
                navigation.replace("About");
              } else {
                setEmailValid(validateEmail(email));
                setPasswordValid(
                  password.length >= 8 && password === confirmPassword
                );
              }
            }}
            disabled={
              !isEmailValid ||
              !isPasswordValid ||
              email.length < 1 ||
              password.length < 1 ||
              confirmPassword.length < 1
            }
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable onPress={() => navigation.replace("Registration")}>
            <Text style={styles.signInText}>
              <Text style={styles.blackText}>Don't have an account?</Text>{" "}
              Register
            </Text>
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
  blackText: {
    color: "grey",
    fontSize: 15,
  },
});

export default LoginScreen;

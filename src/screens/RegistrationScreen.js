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

const RegistrationScreen = () => {
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
      <View style={styles.centeredView}>{/* Empty view with styling */}</View>
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
          />
          <View style={styles.ViewPassword}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Enter your password here..."
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={togglePasswordVisibility}
              style={styles.eyeIcon1}
            >
              <Icon
                name={showPassword ? "eye-slash" : "eye"}
                size={20}
                color="black"
              />
            </Pressable>
          </View>
          <View style={styles.ViewPassword}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Confirm your password here..."
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={togglePasswordVisibility}
              style={styles.eyeIcon1}
            >
              <Icon
                name={showPassword ? "eye-slash" : "eye"}
                size={20}
                color="black"
              />
            </Pressable>
          </View>
          <Pressable
            style={styles.registerButton}
            onPress={() => navigation.replace("About")}
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
});

export default RegistrationScreen;

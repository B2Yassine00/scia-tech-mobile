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
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>About You</Text>
          <Text style={styles.SubtitleText}>
            Please enter your full name, as well as your email address.
          </Text>
        </View>
        <TextInput style={styles.input} placeholder="First Name" />
        <TextInput style={styles.input} placeholder="Last Name" />
        <TextInput style={styles.input} placeholder="Phone Number" />
        <Pressable
          style={styles.registerButton}
          onPress={() => navigation.replace("MedicalReport")}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
      <Dialog
        visible={isRegisterDialogVisible}
        onTouchOutside={() => setRegisterDialogVisible(false)}
      >
        <View style={styles.pressed}>
          <Text>Login Button pressed</Text>
        </View>
      </Dialog>
      <Dialog
        visible={isSignInDialogVisible}
        onTouchOutside={() => setSignInDialogVisible(false)}
      >
        <View style={styles.pressed}>
          <Text>Register Button pressed</Text>
        </View>
      </Dialog>
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
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    height: 280,
    width: 400,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  imageBackground: {
    flex: 1,
    alignItems: "start",
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
  pressed: {
    padding: 10,
    fontSize: 14,
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
});

export default RegistrationScreen;

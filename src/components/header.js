import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const headerImage = require("../images/profilPic.png");
  const logout = require("../images/logout.png");

  const [storedEmail, setStoredEmail] = useState("");

  // Use AsyncStorage to load storedEmail when the component mounts
  useEffect(() => {
    async function loadStoredEmail() {
      try {
        const email = await AsyncStorage.getItem("storedEmail");
        if (email !== null) {
          setStoredEmail(email);
        }
      } catch (error) {
        console.error("Error loading storedEmail: ", error);
      }
    }
    loadStoredEmail();
  }, []);

  useEffect(() => {
    // Check if route.params.email is defined and not falsy
    if (route.params?.email) {
      // Update storedEmail with route.params.email
      setStoredEmail(route.params.email);

      // Use AsyncStorage to save storedEmail whenever it changes
      async function saveStoredEmail() {
        try {
          await AsyncStorage.setItem("storedEmail", route.params.email);
        } catch (error) {
          console.error("Error saving storedEmail: ", error);
        }
      }
      saveStoredEmail();
    }
  }, [route.params]);

  const email = storedEmail;

  const ImageContainer = ({ image, height = "100%", width = "100%" }) => (
    <View style={styles.imageContainer}>
      <Image source={image} style={[{ height, width }]} />
    </View>
  );

  const HeaderTitle = () => {
    const currentDate = new Date();
    const options = { weekday: "long", day: "numeric", month: "long" };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    return (
      <View style={styles.title}>
        <Text style={styles.bigTitle}>{email}!</Text>
        <Text style={styles.smallTitle}>{formattedDate}</Text>
      </View>
    );
  };

  return (
    <View style={styles.header}>
      <ImageContainer
        image={headerImage}
        style={{ borderRadius: 100, borderWidth: 1.5, borderColor: "black" }}
      />
      <HeaderTitle />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <ImageContainer image={logout} height={"70%"} width={"70%"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  title: {
    fontWeight: "bold",
    paddingHorizontal: "2%",
    flex: 1,
    justifyContent: "center",
  },
  bigTitle: {
    fontSize: 13,
    opacity: 0.9,
    fontStyle: "italic",
    fontWeight: "300",
    paddingStart: "5%",
  },
  smallTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: "4%",
    paddingStart: "5%",
  },
  header: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginStart: "3%",
    marginTop: "3%",
  },
  imageContainer2: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 1.6,
    borderColor: "#05668D",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginStart: "3%",
    marginTop: "3%",
  },
};

export default Header;

import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const headerImage = require("../images/profilPic.png");
  const logout = require("../images/logout.png");

  const [storedEmail, setStoredEmail] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

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
      } finally {
        setLoading(false); // Mark loading as complete
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

  if (loading) {
    // Display a loading indicator while email is being retrieved
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <ImageContainer
        image={headerImage}
        style={styles.imageContainer2} // Updated styling
      />
      <HeaderTitle email={storedEmail} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <ImageContainer image={logout} height={"70%"} width={"70%"} />
      </TouchableOpacity>
    </View>
  );
};

const ImageContainer = ({ image, height = "100%", width = "100%", style }) => (
  <View style={[styles.imageContainer, style]}>
    <Image source={image} style={[{ height, width }]} />
  </View>
);

const HeaderTitle = ({ email }) => {
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Header;

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import home from "../images/Home.png";
import profil from "../images/Profil.png";
import report from "../images/Report.png";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
const notification = require("../images/Notification.png");
const headerImage = require("../images/profilPic.png");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState("profil");
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    height: "",
    weight: "",
    age: "",
  });

  const handleIconPress = (icon) => {
    setSelectedIcon(icon);
  };

  // Use useFocusEffect to fetch user information when the screen is focused
  useFocusEffect(() => {
    fetchUserInfo();
  });

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3000/info", {
        method: "GET",
        headers: {},
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        console.error("Failed to fetch user information");
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image source={headerImage} style={styles.headerImage} />
      <Text style={styles.nameText}>{userInfo.fullName}</Text>
      <Text style={styles.dateText}>{currentDate}</Text>
      <View style={styles.cardGrid}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{userInfo.height} cm</Text>
          <Text style={styles.cardDescription}>Height</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{userInfo.weight} kg</Text>
          <Text style={styles.cardDescription}>Weight</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{userInfo.age} yo</Text>
          <Text style={styles.cardDescription}>Age</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.aboutMeButton}
        onPress={() => navigation.navigate("AboutModify")}
      >
        <View style={styles.aboutMeButtonInner}>
          <Text style={styles.aboutMeButtonText}>About Me</Text>
          <Image
            source={require("../images/modifyIcon.png")}
            style={styles.modifyIcon}
          />
        </View>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={home}
            style={[
              styles.icon,
              selectedIcon === "home"
                ? styles.selectedIcon
                : styles.unselectedIcon,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Report")}>
          <Image
            source={report}
            style={[
              styles.icon,
              selectedIcon === "report"
                ? styles.selectedIcon
                : styles.unselectedIcon,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <Image
            source={notification}
            style={[
              styles.icon,
              selectedIcon === "notification"
                ? styles.selectedIcon
                : styles.unselectedIcon,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress("profil")}>
          <Image
            source={profil}
            style={[
              styles.icon,
              selectedIcon === "profil"
                ? styles.selectedIcon
                : styles.unselectedIcon,
            ]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", marginHorizontal: 6 },
  headerImage: { width: "100%", height: "40%" },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 25,
  },
  dateText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
    color: "grey",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  card: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    margin: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#05668D",
  },
  cardDescription: {
    textAlign: "center",
    fontSize: 14,
    color: "grey",
  },
  aboutMeButton: {
    backgroundColor: "#D8EDF2",
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 100,
  },
  aboutMeButtonInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
  },
  aboutMeButtonText: {
    color: "black",
    fontSize: 18,
  },
  modifyIcon: {
    width: 21,
    height: 21,
  },
  logoutButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#05668D",
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 100,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: "7%",
    paddingTop: "4%",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  selectedIcon: {
    tintColor: "#05668D",
  },
  unselectedIcon: {
    tintColor: "grey",
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default ProfileScreen;

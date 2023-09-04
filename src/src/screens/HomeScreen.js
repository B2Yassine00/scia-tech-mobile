import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import sciatica from "../images/Standing.png";
import home from "../images/Home.png";
import profil from "../images/Profil.png";
import report from "../images/Report.png";
import { useNavigation } from "@react-navigation/native";

const headerImage = require("../images/me.jpg");
const logout = require("../images/logout.png");
const notification = require("../images/Notification.png");
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState("home");

  const handleIconPress = (icon) => {
    setSelectedIcon(icon);
  };

  const showConfirmationAlert = () => {
    Alert.alert(
      "Sciatica Pain",
      "Have you experienced sciatica pain?",
      [
        {
          text: "Yes",
          onPress: () => console.log("User selected Yes"),
          style: "default",
        },
        {
          text: "No",
          onPress: () => console.log("User selected No"),
        },
      ],
      { cancelable: true }
    );
  };

  const Header = () => (
    <View style={styles.header}>
      <ImageContainer image={headerImage} />
      <HeaderTitle />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <ImageContainer image={logout} height={"70%"} width={"70%"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Header />
        <View style={styles.threeViewsContainer1}>
          <View style={styles.roundedView}>
            <Text style={styles.ExpectedTitle}>
              EXPECTED {"\n"} SCIATICA PAIN IN:{" "}
            </Text>
            <Text style={styles.PainTitle}>13:24:08</Text>
          </View>
        </View>
        <Pressable
          style={[styles.registerButton]}
          onPress={showConfirmationAlert}
        >
          <Text style={styles.buttonText}>
            REPORT SCIATICA PAIN{"   "}
            <Text style={{ marginHorizontal: "2%" }}>
              <Icon name="chevron-circle-right" size={windowWidth * 0.05} />
            </Text>
          </Text>
        </Pressable>
        <Card />
        <Card />
        <Card />
      </View>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => handleIconPress("home")}>
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
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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

const Card = () => (
  <View style={styles.contentContainer}>
    <View style={styles.gridContainer}>
      <Image source={sciatica} style={styles.image} />
      <Text style={styles.centerText}>
        Sciatica Pain {"\n"}
        <Text
          style={{
            color: "grey",
            fontWeight: "400",
            fontSize: windowWidth * 0.04,
          }}
        >
          Standing
        </Text>
      </Text>
      <Text style={styles.endText}>
        05/07/23{"\n"}
        <Text
          style={{
            color: "black",
            fontWeight: "400",
            fontSize: windowWidth * 0.04,
          }}
        >
          15:35
        </Text>
      </Text>
    </View>
  </View>
);

const ImageContainer = ({ image, height = "100%", width = "100%" }) => (
  <View style={styles.imageContainer}>
    <Image source={image} style={[{ height, width }]} />
  </View>
);

const HeaderTitle = () => (
  <View style={styles.title}>
    <Text style={styles.bigTitle}>Hello Rabii!</Text>
    <Text style={styles.smallTitle}>Thursday, 08 July</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", marginHorizontal: 6 },
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
    flexDirection: "row",
    alignItems: "center",
  },
  screen: { margin: "3%" },
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
  contentContainer: {
    marginTop: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  roundedView: {
    borderRadius: 50,
    padding: "3%",
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
  },
  threeViewsContainer1: {
    width: "100%",
    paddingTop: "5%",
  },
  gridContainer: {
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "grey",
    flexDirection: "row",
    alignItems: "center",
    padding: "2%",
    borderColor: "#ccc",
  },
  image: {
    width: 65,
    height: 65,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 100,
  },
  centerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "red",
    paddingLeft: "2%",
    lineHeight: 25,
  },
  endText: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
    paddingRight: "5%",
    lineHeight: 25,
  },
  ExpectedTitle: {
    paddingTop: "2%",
    fontSize: 32,
    fontWeight: "200",
    textAlign: "center",
  },
  PainTitle: {
    fontSize: 70,
    fontWeight: "bold",
    paddingBottom: "2%",
  },
  registerButton: {
    backgroundColor: "#05668D",
    borderRadius: 100,
    marginBottom: 1,
    marginTop: "3%",
    paddingVertical: "5.5%",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: "4%",
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
  scrollContent: {
    marginBottom: "60%",
  },
});

export default HomeScreen;

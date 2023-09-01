import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import home from "../images/Home.png";
import profil from "../images/Profil.png";
import report from "../images/Report.png";
import allday from "../images/24.png";
import batteryImage1 from "../images/20.png";
import batteryImage2 from "../images/40.png";
import batteryImage3 from "../images/60.png";
import batteryImage4 from "../images/80.png";
import batteryImage5 from "../images/100.png";
import { useNavigation } from "@react-navigation/native";

const headerImage = require("../images/me.jpg");
const notification = require("../images/Notification.png");
const logout = require("../images/logout.png");
const windowWidth = Dimensions.get("window").width;

const ReportScreen = () => {
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState("report");

  const handleIconPress = (icon) => {
    setSelectedIcon(icon);
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
        <Card />
      </View>
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
        <TouchableOpacity onPress={() => handleIconPress("report")}>
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

const Card = () => (
  <View style={styles.contentContainer}>
    <View style={styles.gridContainer}>
      <Text style={styles.centerText}>
        Sciatica Pain {"\n"}
        <Text
          style={{
            color: "white",
            fontWeight: "300",
            fontSize: windowWidth * 0.04,
          }}
        >
          Standing {"\n"}
        </Text>
        <Pressable style={[styles.registerButton]}>
          <Text style={styles.buttonText}>View More</Text>
        </Pressable>
      </Text>
      <Image source={allday} style={styles.image} />
    </View>
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
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "grey",
    backgroundColor: "#05668D",
    flexDirection: "row",
    alignItems: "center",
    padding: "5%",
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
    color: "white",
    paddingLeft: "2%",
    lineHeight: 25,
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
  registerButton: {
    backgroundColor: "#E0EFF3",
    borderRadius: 100,
    width: "50%",
  },
});

export default ReportScreen;

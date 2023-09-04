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
import daily from "../images/24.png";
import weekly from "../images/7days.png";
import history from "../images/history.png";
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

  const DailyCard = () => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.titleCard}>Daily Report</Text>
          <Text style={styles.subtitle}>Daily summary of your progress.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Daily")}
          >
            <Text style={styles.buttonText}>View More</Text>
          </TouchableOpacity>
        </View>
        <Image source={daily} style={styles.image} />
      </View>
    );
  };

  const WeeklyCard = () => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.titleCard}>Weekly Report</Text>
          <Text style={styles.subtitle}>Weekly summary of your progress.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Weekly")}
          >
            <Text style={styles.buttonText}>View More</Text>
          </TouchableOpacity>
        </View>
        <Image source={weekly} style={styles.image} />
      </View>
    );
  };

  const HistoryCard = () => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.titleCard}>Reports History</Text>
          <Text style={styles.subtitle}>
            History of all your previous reports.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("History")}
          >
            <Text style={styles.buttonText}>View More</Text>
          </TouchableOpacity>
        </View>
        <Image source={history} style={styles.image} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Header />
        <DailyCard />
        <WeeklyCard />
        <HistoryCard />
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
    paddingBottom: "5%",
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
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 100,
  },
  cardContainer: {
    marginTop: "4%",
    flexDirection: "row",
    backgroundColor: "#05668D",
    borderRadius: 10,
    shadowColor: "#05668D",
    borderRadius: 30,
    paddingTop: "1%",
    paddingRight: "6%",
    paddingLeft: "2%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftContainer: {
    flex: 1,
    padding: 15,
  },
  titleCard: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E0EFF3",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 7,
    marginBottom: 3,
    fontWeight: "bold",
    fontWeight: "300",
    color: "#E0EFF3",
  },
  button: {
    backgroundColor: "#E0EFF3",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 50,
    marginTop: 10,
    width: "60%",
    borderRadius: 50,
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    width: 110,
    height: 110,
    marginTop: "8%",
    marginBottom: "8%",
    resizeMode: "cover",
    opacity: 0.95,
  },
});

export default ReportScreen;

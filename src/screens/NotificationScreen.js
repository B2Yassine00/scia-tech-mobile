import React, { useState } from "react";
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
import notificationsData from "../components/notifications.json";
import NoNotif from "../images/NoNotif.png";
import bell from "../images/bell.png";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header.js";

const logout = require("../images/logout.png");
const notification = require("../images/Notification.png");

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState("notification");
  const [expandedCardIndex, setExpandedCardIndex] = useState(-1);

  const handleIconPress = (icon) => {
    setSelectedIcon(icon);
  };

  const toggleCardExpansion = (index) => {
    if (expandedCardIndex === index) {
      setExpandedCardIndex(-1);
    } else {
      setExpandedCardIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Header />
      </View>
      <View>
        {notificationsData.Notifications.length > 0 ? (
          notificationsData.Notifications.map((Notification, index) => (
            <View style={styles.cardContainer} key={index}>
              <View style={styles.leftContainer}>
                <Text style={styles.titleCard}>{Notification.title}</Text>
                {expandedCardIndex === index ? (
                  <Text style={styles.subtitle}>{Notification.subtitle}</Text>
                ) : null}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => toggleCardExpansion(index)}
                >
                  <Text style={styles.buttonText}>
                    {expandedCardIndex === index ? "View Less" : "View More"}
                  </Text>
                </TouchableOpacity>
              </View>
              <Image source={bell} style={styles.image} />
            </View>
          ))
        ) : (
          <View style={styles.textContainer}>
            <Image source={NoNotif} style={styles.imageNotif} />
            <Text style={styles.headerText}>No Notifications</Text>
            <Text style={styles.SubtitleText}>
              You're all caught up! There are currently {"\n"} no new
              notifications.
            </Text>
          </View>
        )}
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
        <TouchableOpacity onPress={() => handleIconPress("notification")}>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: "12%",
    margin: 0,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  textContainer: {
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 16,
    alignItems: "center",
  },
  headerText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
    paddingBottom: 10,
    textAlign: "center",
  },
  SubtitleText: {
    fontSize: 16,
    color: "grey",
    textAlign: "center",
  },
  imageNotif: {
    width: 260,
    height: 260,
    marginBottom: 0,
    PaddingBottom: 0,
  },
  cardContainer: {
    alignSelf: "center",
    width: "90%",
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
    width: 80,
    height: 80,
    marginTop: "6%",
    marginBottom: "8%",
    resizeMode: "cover",
    opacity: 0.95,
  },
});

export default NotificationScreen;

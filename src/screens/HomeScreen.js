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
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import sciaticaStanding from "../images/Standing.png";
import sciaticaSitting from "../images/Sitting.png";
import sciaticaHeavy from "../images/Heavy.png";
import home from "../images/Home.png";
import profil from "../images/Profil.png";
import report from "../images/Report.png";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import data from "../components/painSciatica.json";
import Header from "../components/header.js";
import CountdownTimer from "../components/countdown.js";
import axios from "axios";

const logout = require("../images/logout.png");
const notification = require("../images/Notification.png");
const windowWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState("home");
  const [painActivity, setPainActivity] = useState("");

  const handleIconPress = (icon) => {
    setSelectedIcon(icon);
  };

  const handleReportPainPress = () => {
    Alert.alert(
      "Report Sciatica Pain",
      "Please select the activity that caused your pain:",
      [
        {
          text: "Sitting",
          onPress: () => {
            setPainActivity("Sitting");
            showTimePicker();
          },
        },
        {
          text: "Standing",
          onPress: () => {
            setPainActivity("Standing");
            showTimePicker();
          },
        },
        {
          text: "Heavy Activity",
          onPress: () => {
            setPainActivity("Heavy Activity");
            showTimePicker();
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    console.log("User selected time:", time);

    const hours = time.getHours();
    const formattedHours = hours === 0 ? "00" : String(hours).padStart(2, "0");
    const formattedMinutes = String(time.getMinutes()).padStart(2, "0");
    const formattedTime = `${formattedHours}:${formattedMinutes}`;

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

    // Send a request to your server
    axios
      .post("http://localhost:3000/report-pain", {
        title: "Sciatica Pain",
        activity: painActivity,
        date: formattedDate,
        time: formattedTime,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log("Error reporting pain:", error);
      })
      .finally(() => {
        hideTimePicker();
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Header />
        <View style={styles.threeViewsContainer1}>
          <View style={styles.roundedView}>
            <Text style={styles.ExpectedTitle}>
              EXPECTED {"\n"} SCIATICA PAIN IN:{" "}
            </Text>
            <CountdownTimer />
          </View>
        </View>
        <Pressable
          style={[styles.registerButton]}
          onPress={handleReportPainPress}
        >
          {({ pressed }) => (
            <Text style={styles.buttonText}>
              REPORT SCIATICA PAIN{"   "}
              <Text style={{ marginHorizontal: "2%" }}>
                <Icon name="chevron-circle-right" size={windowWidth * 0.05} />
              </Text>
            </Text>
          )}
        </Pressable>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
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
  <View>
    {data.SciaticaPain.slice(-3)
      .reverse()
      .map((item, index) => {
        let activityImage;

        switch (item.activity) {
          case "Standing":
            activityImage = sciaticaStanding;
            break;
          case "Sitting":
            activityImage = sciaticaSitting;
            break;
          case "Heavy Activity":
            activityImage = sciaticaHeavy;
            break;
          default:
            activityImage = sciaticaSitting;
        }

        return (
          <View style={styles.contentContainer} key={index}>
            <View style={styles.gridContainer}>
              <Image source={activityImage} style={styles.image} />
              <Text style={styles.centerText}>
                {item.title} {"\n"}
                <Text
                  style={{
                    color: "grey",
                    fontWeight: "400",
                    fontSize: windowWidth * 0.04,
                  }}
                >
                  {item.activity}
                </Text>
              </Text>
              <Text style={styles.endText}>
                {item.date} {"\n"}
                <Text
                  style={{
                    color: "black",
                    fontWeight: "400",
                    fontSize: windowWidth * 0.04,
                  }}
                >
                  {item.time}
                </Text>
              </Text>
            </View>
          </View>
        );
      })}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", marginHorizontal: 6 },
  screen: { margin: "3%" },
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
  scrollContent: {
    marginBottom: "60%",
  },
});

export default HomeScreen;

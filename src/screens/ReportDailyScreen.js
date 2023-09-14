import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import home from "../images/Home.png";
import profil from "../images/Profil.png";
import report from "../images/Report.png";
import { useNavigation } from "@react-navigation/native";
import dataJSON from "../components/DailyReport.json";
import { ScrollView } from "react-native-gesture-handler";
import pdf from "../images/pdf.png";
import BackButton from "../components/backButton";
import Header from "../components/header.js";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const notification = require("../images/Notification.png");
const logout = require("../images/logout.png");
const back = require("../images/back.png");

const ReportDailyScreen = () => {
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState("report");
  const [pdfFilePath, setPdfFilePath] = useState(null);
  const handleIconPress = (icon) => {
    setSelectedIcon(icon);
  };

  const html = `
    <html>
      <head>
        <style>
          .center {
            text-align: center;
          }
          .title {
            color: #05668D;
          }
          .bigger-image {
            width: 200px; 
            height: 200px;
          }
          .content {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 10px;
          }
          .titleContent {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="center">
          <img src="file:///Users/pierre/Downloads/scia-tech-mobile-main/src/images/logo.png" alt="Image" class="bigger-image" />
        </div>
        <div class="center">
          <h2 class="title">Scia-Tech</h1>
        </div>
        <div class="titleContent">
          <h1>Daily Report</h1>
        </div>
        <div class="content">
          <ul>
            ${dataJSON.items.map((item) => `<li>${item.text}</li>`).join("")}
          </ul>
        </div>
      </body>
    </html>
  `;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Header />
        <BackButton />
        <ScrollView style={styles.jsonContainer}>
          {dataJSON.items.map((item) => (
            <ListItem key={item.id} text={item.text} />
          ))}
        </ScrollView>
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
      <TouchableOpacity style={styles.DownloadButton} onPress={generatePdf}>
        <View style={styles.buttonContent}>
          <Text style={styles.DownloadButtonText}>Download</Text>
          <View style={styles.pdfImageContainer}>
            <Image source={pdf} style={styles.pdfImage} />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const ListItem = ({ text }) => (
  <View style={styles.listItem}>
    <Text>➕{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", marginHorizontal: 6 },
  screen: { margin: "3%" },
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
  jsonContainer: {
    marginTop: 10,
    padding: 25,
    borderWidth: 1,
    height: "65%",
    borderColor: "#000",
    borderRadius: 50,
  },
  listItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10,
  },
  DownloadButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    width: "95%",
    alignSelf: "center",
    borderRadius: 50,
  },
  DownloadButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  pdfImage: {
    height: 30,
    width: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  pdfImageContainer: {
    marginLeft: 10,
  },
});

export default ReportDailyScreen;

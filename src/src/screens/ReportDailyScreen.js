import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import home from "../images/Home.png";
import profil from "../images/Profil.png";
import report from "../images/Report.png";
import { useNavigation } from "@react-navigation/native";
import dataJSON from "../components/DailyReport.json";
import pdf from "../images/pdf.png";
import BackButton from "../components/backButton";

const headerImage = require("../images/me.jpg");
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
      <TouchableOpacity style={styles.DownloadButton}>
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

const ListItem = ({ text }) => (
  <View style={styles.listItem}>
    <Text>➕{text}</Text>
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
  jsonContainer: {
    marginTop: 10,
    padding: 25,
    borderWidth: 1,
    height: "68%",
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

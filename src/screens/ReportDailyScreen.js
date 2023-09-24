import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import home from "../images/Home.png";
import profil from "../images/Profil.png";
import report from "../images/Report.png";
import { useNavigation } from "@react-navigation/native";
import pdf from "../images/pdf.png";
import BackButton from "../components/backButton.js";
import Header from "../components/header.js";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { PieChart } from "react-native-chart-kit";
import { LineChart } from "react-native-chart-kit";
import dataJSON from "../components/DailyReport.json";

const notification = require("../images/Notification.png");
const logout = require("../images/logout.png");
const back = require("../images/back.png");

const ReportDailyScreen = () => {
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState("report");

  const handleIconPress = (icon) => {
    setSelectedIcon(icon);
  };

  const pieChartData1 = [
    { name: "Standing", percentage: 60, color: "#253B6E" },
    { name: "Sitting", percentage: 23, color: "#1891AC" },
    { name: "Heavy Activity", percentage: 17, color: "#D2ECF9" },
  ];

  const pieChartData2 = [
    { name: "Left", percentage: 20, color: "#253B6E" },
    { name: "Right", percentage: 33, color: "#1891AC" },
    { name: "Forward", percentage: 17, color: "#D2ECF9" },
    { name: "Backward", percentage: 12, color: "#5144EC" },
    { name: "Middle", percentage: 18, color: "#80E99D" },
  ];

  const pieChartData3 = [
    { name: "Good", percentage: 45, color: "#253B6E" },
    { name: "Bad", percentage: 55, color: "#1891AC" },
  ];

  const pieChartData4 = [
    { name: "Standing", percentage: 60, color: "#253B6E" },
    { name: "Sitting", percentage: 23, color: "#1891AC" },
    { name: "Heavy Activity", percentage: 17, color: "#D2ECF9" },
    { name: "Heavy", percentage: 17, color: "#D2ECF9" },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  const painData = [
    { date: "10:42", painLevel: 2 },
    { date: "12:10", painLevel: 3 },
    { date: "14:58", painLevel: 1 },
    // Add more data points as needed
  ];

  const chartConfig2 = {
    backgroundGradientFrom: "#FFFFFF", // White background
    backgroundGradientTo: "#FFFFFF", // White background
    color: (opacity = 1) => `rgba(24, 145, 172, ${opacity})`, // #1891AC
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black text
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
        <h1>Weekly Report</h1>
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
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View
        style={{
          marginTop: "3%",
          marginLeft: "3%",
          marginRight: "3%",
        }}
      >
        <BackButton />
      </View>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.TextPie}>Position</Text>
          <PieChart
            data={pieChartData1}
            width={350}
            height={150}
            chartConfig={chartConfig}
            accessor="percentage"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <Text style={styles.TextPie}>State</Text>
          <PieChart
            data={pieChartData2}
            width={350}
            height={150}
            chartConfig={chartConfig}
            accessor="percentage"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <Text style={styles.TextPie}>Posture</Text>
          <PieChart
            data={pieChartData3}
            width={350}
            height={150}
            chartConfig={chartConfig}
            accessor="percentage"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <Text style={styles.TextPie}>Pain over Time</Text>
          <LineChart
            data={{
              labels: painData.map((dataPoint) => dataPoint.date),
              datasets: [
                {
                  data: painData.map((dataPoint) => dataPoint.painLevel),
                  color: () => "#1891AC", // Set color directly
                },
              ],
            }}
            width={420}
            height={220}
            chartConfig={chartConfig2}
            bezier
            style={{
              marginVertical: 18,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.menu}></View>
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
    <Text>➕ {text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", marginHorizontal: 6 },
  headerContainer: { flexDirection: "row", alignItems: "center" },
  scrollContainer: { flex: 1 },
  contentContainer: { margin: "3%" },
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
  TextPie: {
    marginLeft: "6%",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 18,
  },
});

export default ReportDailyScreen;

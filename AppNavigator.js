import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen";
import AboutMeScreen from "./src/screens/AboutMeScreen";
import MedicalReportScreen from "./src/screens/MedicalReportScreen";
import SucessRegistrationScreen from "./src/screens/SucessRegistrationScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ReportScreen from "./src/screens/ReportScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import ReportDailyScreen from "./src/screens/ReportDailyScreen";
import ReportWeeklyScreen from "./src/screens/ReportWeeklyScreen";
import ReportHistoryScreen from "./src/screens/ReportHistoryScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="About" component={AboutMeScreen} />
        <Stack.Screen name="MedicalReport" component={MedicalReportScreen} />
        <Stack.Screen
          name="SucessRegistration"
          component={SucessRegistrationScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Daily" component={ReportDailyScreen} />
        <Stack.Screen name="Weekly" component={ReportWeeklyScreen} />
        <Stack.Screen name="History" component={ReportHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

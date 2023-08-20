import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Text, Alert, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-[#05668D]">
      <Text className="text-white">Open up App.js to start working on your app!</Text>
      <Button title="Press me" onPress={() => Alert.alert('Simple Button pressed')}/>
      <StatusBar style="auto" />
    </View>
  );
}


import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Text, Alert, View, Image, ImageBackground, TextInput, Pressable } from 'react-native';
import image from "./assets/logo-favicon.png";
import image2 from "./assets/placeholder.png";

export default function App() {
  return (
    <View className="flex-1 justify-center bg-[#05668D]">
      <View className="flex p-4 justify-center items-center">
        <Image source={image} resizeMode="contain" className="h-[270px] w-[400px]" />
      </View>
      <View className="flex-1 justify-start bg-holder w-full">
        <ImageBackground source={image2} resizeMode='cover' className="h-[100%] flex items-center">
          <View className="flex justify-start w-full">
            <Text className="text-black font-extrabold text-[26px] pt-8 pb-4 px-10">
                We're excited to{'\n'}
                have you on board!
            </Text>
          </View>
          <TextInput className="border-black h-12 w-[80%] bg-[#F2F2F2] placeholder:p-4 placeholder:text-[14px] rounded-3xl" placeholder='Enter your e-mail here...' />
          <TextInput className="border-black my-4 h-12 w-[80%] bg-[#F2F2F2] placeholder:p-4 placeholder:text-[14px] rounded-3xl" placeholder='Enter your username here...' />
          <TextInput className="border-black mb-4 h-12 w-[80%] bg-[#F2F2F2] placeholder:p-4 placeholder:text-[14px] rounded-3xl" placeholder='Enter your password here...' />
          <TextInput className="border-black mb-4 h-12 w-[80%] bg-[#F2F2F2] placeholder:p-4 placeholder:text-[14px] rounded-3xl" placeholder='Confirm your password here...' />
          <Pressable className="bg-[#05668D] rounded-3xl mb-1" onPress={() => Alert.alert('Sign In Button pressed')}>
            <Text className="text-white font-semibold py-3 px-8 text-[20px]">
              Sign In
            </Text>
          </Pressable>
          <Button title="Login" onPress={() => Alert.alert('Login Button pressed')} color="#05668D" />
          <StatusBar style="auto" />
        </ImageBackground>

      </View>
    </View>
  );
}


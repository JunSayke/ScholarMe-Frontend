import React from "react";
import { View, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { icons } from "@/constants";
import { Redirect, router } from "expo-router";

const Home = () => {
  return (
    <>
      <SafeAreaView className="h-full ">
        <View className="w-full h-1/4 bg-[#3D5CFF] flex flex-row items-center justify-between">
          <View className="pl-16">
            <Text className="font-extrabold text-7xl">Hi!</Text>
            <Text className="font-extrabold">Let's start learning</Text>
          </View>
          <View className="pr-10">
            <TouchableOpacity onPress={() =>
                router.push('/(root)/(tabs)/profile')
              }>
              <Image source={icons.icondefault} className="mb-8" />
            </TouchableOpacity>
          </View>
        </View>

        <SafeAreaView className="h-3/4 flex items-center justify-center">
          <Text className="text-5xl">We ran out of time :)</Text>
        </SafeAreaView>
      </SafeAreaView>
    </>
  );
};

export default Home;

import React from "react";
import { View, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { icons } from "@/constants";
import { Redirect, router, Link } from "expo-router";

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

        <SafeAreaView className="h-full pt-5 flex items-center">
          <View className="w-11/12 h-24 bg-[#2F2F42] rounded-3xl shadow-lg elevation-5 flex flex-row items-center justify-between ">
              <Text className="pl-5 text-3xl">Your Flashcards</Text>
              <TouchableOpacity>
                <Image source={icons.cardplus} tintColor={'white'} className="w-12 h-12 mr-5"/>
              </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </>
  );
};

export default Home;

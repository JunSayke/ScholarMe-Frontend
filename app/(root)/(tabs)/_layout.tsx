/* eslint-disable no-unused-expressions */
import {Image, ImageSourcePropType, View} from 'react-native';
import {Tabs} from "expo-router";
import React from "react";

import {icons} from "@/constants";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    className={`flex flex-row justify-center items-center rounded ${focused ? "bg-blue-700" : ""}`}
  >
    <View
      className={`rounded w-16 h-16 items-center justify-center ${focused ? "bg-blue-700" : ""}`}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-7 h-7"
      />
    </View>
  </View>
);

const Layout = () => {
  return (
      <SafeAreaView className="flex-1">
          <Tabs
              initialRouteName="home"
              screenOptions={{
                  tabBarActiveTintColor: "#3D5CFF",
                  tabBarInactiveTintColor: "white",
                  tabBarShowLabel: false,
                  tabBarStyle: {
                      backgroundColor: "#212242",
                      borderTopEndRadius: 50,
                      borderTopStartRadius: 50,
                      paddingBottom: 20,
                      height: 70,
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      position: "absolute",
                  },
              }}
          >
              <Tabs.Screen
                  name="home"
                  options={{
                      title: "Home",
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                          <TabIcon source={icons.navhome} focused={focused} />
                      ),
                  }}
              />

              <Tabs.Screen
                  name="flashcards"
                  options={{
                      title: "Flashcards",
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                          <TabIcon focused={focused} source={icons.navflashcard} />
                      ),
                  }}
              />

              <Tabs.Screen
                  name="profile"
                  options={{
                      title: "Profile",
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                          <TabIcon focused={focused} source={icons.navprofile} />
                      ),
                  }}
              />
          </Tabs>
          <StatusBar backgroundColor="#3D5CFF"/>
      </SafeAreaView>
  );
};

export default Layout;

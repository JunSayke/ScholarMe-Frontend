/* eslint-disable no-unused-expressions */
import { TouchableOpacity } from 'react-native';
import { Link, Tabs } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  View,
} from "react-native";

import { icons } from "@/constants";

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
          headerStyle: {
            backgroundColor: '#3D5CFF',
          },
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.navflashcard} />
          ),
          headerRight: () => (
            <Link href={'/'} asChild>
              <TouchableOpacity style={{ marginRight: 10 }}>
                <Image source={icons.cardplus} tintColor="white" className="w-7 h-7" />
              </TouchableOpacity>
            </Link>
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
  );
};

export default Layout;

//import "~/global.css";

//import AsyncStorage from "@react-native-async-storage/async-storage";
//import {
//    DarkTheme,
//    Theme,
//    DefaultTheme,
//    ThemeProvider,
//} from "@react-navigation/native";
//import { SplashScreen, Stack } from "expo-router";
//import { StatusBar } from "expo-status-bar";
//import * as React from "react";
//import { Platform } from "react-native";
//import { NAV_THEME } from "~/lib/constants";
//import { useColorScheme } from "~/lib/useColorScheme";

//const LIGHT_THEME: Theme = {
//    ...DefaultTheme,
//    colors: NAV_THEME.light,
//};
//const DARK_THEME: Theme = {
//    ...DarkTheme,
//    colors: NAV_THEME.dark,
//};

//export {
//    // Catch any errors thrown by the Layout component.
//    ErrorBoundary,
//} from "expo-router";

//export default function RootLayout() {
//  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
//  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

//  React.useEffect(() => {
//    (async () => {
//      const theme = await AsyncStorage.getItem("theme");
//      if (Platform.OS === "web") {
//        // Adds the background color to the html element to prevent white background on overscroll.
//        document.documentElement.classList.add("bg-background");
//      }
//      if (!theme) {
//        AsyncStorage.setItem("theme", colorScheme);
//        setIsColorSchemeLoaded(true);
//        return;
//      }
//      const colorTheme = theme === "dark" ? "dark" : "light";
//      if (colorTheme !== colorScheme) {
//        setColorScheme(colorTheme);

//        setIsColorSchemeLoaded(true);
//        return;
//      }
//      setIsColorSchemeLoaded(true);
//    })().finally(() => {
//      SplashScreen.hideAsync();
//    });
//  }, []);

//  if (!isColorSchemeLoaded) {
//    return null;
//  }

//  return (
//    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
//      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
//      <Stack>
//        <Stack.Screen name="home" />
//      </Stack>
//    </ThemeProvider>
//  );
//}

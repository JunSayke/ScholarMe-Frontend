import "~/global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DarkTheme, DefaultTheme, Theme, ThemeProvider} from "@react-navigation/native";
import {SplashScreen, Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import * as React from "react";
import {Platform} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {NAV_THEME} from "~/lib/constants";
import {useColorScheme} from "~/lib/useColorScheme";
import {AuthProvider, useAuth} from "@/components/AuthContext";
import {PortalHost} from "@rn-primitives/portal";

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};

export {
    ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const {authState} = useAuth();
    const {colorScheme, setColorScheme, isDarkColorScheme} = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const theme = await AsyncStorage.getItem("theme");
            if (Platform.OS === "web") {
                document.documentElement.classList.add("bg-background");
            }
            if (!theme) {
                AsyncStorage.setItem("theme", colorScheme);
                setIsColorSchemeLoaded(true);
                return;
            }
            const colorTheme = theme === "dark" ? "dark" : "light";
            if (colorTheme !== colorScheme) {
                setColorScheme(colorTheme);
                setIsColorSchemeLoaded(true);
                return;
            }
            setIsColorSchemeLoaded(true);
        })().finally(() => {
            SplashScreen.hideAsync();
        });
    }, []);

    if (!isColorSchemeLoaded) {
        return null;
    }

    console.log("Root layout mounted");

    return (
        <>
            <AuthProvider>
                <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
                    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkColorScheme ? NAV_THEME.dark.background : NAV_THEME.light.background }}>
                        <StatusBar style={isDarkColorScheme ? "light" : "dark"}/>
                        <Stack>
                            <Stack.Screen name="index" options={{headerShown: false}}/>
                            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                            <Stack.Screen name="(root)" options={{headerShown: false}}/>
                            <Stack.Screen name="+not-found" options={{headerShown: false}}/>
                            <Stack.Screen name="(modals)/set/[id]"
                                          options={{
                                              presentation: 'modal',
                                              title: ''
                                          }}/>
                            <Stack.Screen name="(modals)/set/edit/[id]"
                                          options={{
                                              presentation: 'modal',
                                              title: ''
                                          }}/>
                            <Stack.Screen name="(modals)/set/edit/card/[id]"
                                          options={{
                                              presentation: 'modal',
                                              title: ''
                                          }}/>
                        </Stack>
                    </SafeAreaView>
                </ThemeProvider>
            </AuthProvider>
            <PortalHost />
        </>
    );
}
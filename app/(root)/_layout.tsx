import "~/global.css";
import {Redirect, Stack} from "expo-router";
import * as React from "react";
import {useAuth} from "@/components/AuthContext";

const layout = () => {
    const {authState} = useAuth();

    if (authState?.authenticated !== true) {
        return <Redirect href="/(auth)/signin"/>
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    );
}

export default layout;
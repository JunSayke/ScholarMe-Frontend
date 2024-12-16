import "~/global.css";
import {Redirect, Stack} from "expo-router";
import * as React from "react";
import {useAuth} from "@/components/AuthContext";

const layout = () => {
    const {userSession} = useAuth();

    if (!userSession) {
        return <Redirect href="/(auth)/signin"/>
    }

    console.log("TESTING")

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    );
}

export default layout;
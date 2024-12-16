import React from 'react';
import {Redirect, Stack} from "expo-router";
import {useAuth} from "@/components/AuthContext";

const layout = () => {
    const {userSession} = useAuth();

    if (userSession) {
        return <Redirect href="/(root)/(tabs)/home"/>
    }

    return (
        <Stack>
            <Stack.Screen name="welcome" options={{headerShown: false}}/>
            <Stack.Screen name="signup" options={{headerShown: false}}/>
            <Stack.Screen name="signin" options={{headerShown: false}}/>
        </Stack>
    );
}

export default layout;


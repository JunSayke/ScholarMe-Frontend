import React from 'react';
import {Stack} from "expo-router";

const layout = () => {
    return (
        <Stack>
            <Stack.Screen name="welcome" options={{headerShown: false}}/>
            <Stack.Screen name="signup" options={{headerShown: false}}/>
            <Stack.Screen name="signin" options={{headerShown: false}}/>
        </Stack>
    );
}

export default layout;


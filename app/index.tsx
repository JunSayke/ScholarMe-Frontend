import {useAuth} from "@/components/AuthContext";
import React from "react";
import {Redirect} from "expo-router";

const Index = () => {
    const {authState} = useAuth();

    console.log("Root index mounted")

    return authState?.authenticated ? (<Redirect href="/(root)/(tabs)/home" />) : (<Redirect href="/(auth)/welcome"/>);
};

export default Index;


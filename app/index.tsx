import { useAuth } from "@/components/AuthContext";
import { Redirect } from "expo-router";
import React from "react";

const Index = () => {
  //Change this back to /(auth)/welcome
  const { authState } = useAuth();

  return authState?.authenticated ? (<Redirect href="/home" />) : (<Redirect href="/signin"/>);
};

export default Index;

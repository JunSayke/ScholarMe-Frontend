import { useAuth } from "@/components/AuthContext";
import { Redirect } from "expo-router";
import React from "react";

const Index = () => {
  const { authState } = useAuth();

  // return authState?.authenticated ? (<Redirect href="/home" />) : (<Redirect href="/welcome"/>);
  return <Redirect href="/(root)/(tabs)/home" />;
};

export default Index;

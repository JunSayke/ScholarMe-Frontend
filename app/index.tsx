import { Redirect } from "expo-router";
import React from "react";

const Index = () => {
  //Change this back to /(auth)/welcome
  return <Redirect href="/(root)/(tabs)/home" />;
};

export default Index;

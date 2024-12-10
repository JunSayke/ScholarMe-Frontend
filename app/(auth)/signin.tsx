import { View } from "react-native";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAccountSignInDto } from "@/data/api";
import { useAuth } from "@/components/AuthContext";

const Signin = () => {
  const { onLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const userSignInDto: UserAccountSignInDto = { username, password };
    try {
      const response = await onLogin!(userSignInDto);
      console.log("Signed in successfully:", response);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <View>
      <Label>Username</Label>
      <Input value={username} onChangeText={setUsername} />
      <Label>Password</Label>
      <Input value={password} onChangeText={setPassword} secureTextEntry />
      <Button onPress={handleSignIn}>Login</Button>
    </View>
  );
};

export default Signin;
import {View} from "react-native";
import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {UserAccountSignInDto} from "@/data/api";
import {useAuth} from "@/components/AuthContext";
import {Link} from "expo-router";
import {Text} from "~/components/ui/text"

const Signin = () => {
    const {onLogin} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        const userSignInDto: UserAccountSignInDto = {username, password};
        try {
            const response = await onLogin!(userSignInDto);
            console.log("Signed in successfully:", response);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    return (
        <View className="flex-1 p-10 items-center justify-center gap-4">
            <View className="w-full">
                <Label className="mb-2">Username</Label>
                <Input value={username} onChangeText={setUsername}/>
            </View>
            <View className="w-full">
                <Label className="mb-2">Password</Label>
                <Input value={password} onChangeText={setPassword} secureTextEntry/>
            </View>
            <Button onPress={handleSignIn} className="w-full">Login</Button>
            <View>
                <Text className="text-center">Don't have an account? <Link href={"/(auth)/signup"}>Sign Up</Link></Text>
            </View>
        </View>
    );
};

export default Signin;
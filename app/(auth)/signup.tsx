import {View} from "react-native";
import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/components/AuthContext";
import {UserAccountSignUpDto} from "@/data/api";
import { AxiosError } from "axios";
import {handleAxiosError} from "@/data/api-routes";
import {Text} from "@/components/ui/text";
import {Link, Redirect} from "expo-router";

const Signup = () => {
    const {onRegister} = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSignUp = async () => {
        if (password != password2) {
            // TODO: Incorrect password
            console.log("Password does not match.")
            return;
        }

        // TODO: Handle phone number input
        const userSignUpDto: UserAccountSignUpDto = {username, email, password, firstName, lastName}
        try {
            const response = await onRegister!(userSignUpDto);
            console.log("Sign up successfully: ", response.data);
            return <Redirect href="/(auth)/signin" />
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorResponse = handleAxiosError(axiosError)
            if (errorResponse) {
                console.error("Error signing up:", errorResponse);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    return (
        <View>
            <Label>Username</Label>
            <Input value={username} onChangeText={setUsername}/>
            <Label>Email</Label>
            <Input value={email} onChangeText={setEmail}/>
            <Label>Password</Label>
            <Input value={password} onChangeText={setPassword} secureTextEntry/>
            <Label>Confirm Password</Label>
            <Input value={password2} onChangeText={setPassword2} secureTextEntry/>
            <Label>First Name</Label>
            <Input value={firstName} onChangeText={setFirstName}/>
            <Label>Last Name</Label>
            <Input value={lastName} onChangeText={setLastName}/>
            <Button onPress={handleSignUp}>
                <Text>Register</Text>
            </Button>
            <View>
                <Text className="text-center">Already have an account? <Link href={"/(auth)/signin"}>Sign
                    In</Link></Text>
            </View>
        </View>
    );
};

export default Signup;

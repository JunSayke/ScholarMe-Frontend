import {View} from "react-native";
import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/components/AuthContext";
import {UserAccountSignUpDto} from "@/data/api";

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
        }

        const userSignUpDto: UserAccountSignUpDto = {username, email, password, firstName, lastName}
        try {
            const response = await onRegister!(userSignUpDto);
            console.log("Signed up successfully", response);
        } catch (error) {
            console.error("Error signing in:", error)
        }
    }

    return (
        <View>
            <Label>Username</Label>
            <Input value={username} onChangeText={setUsername}/>
            <Label>Email</Label>
            <Input value={email} onChangeText={setEmail}/>
            <Label>Password</Label>
            <Input value={password} onChangeText={setPassword}/>
            <Label>Confirm Password</Label>
            <Input value={password2} onChangeText={setPassword2}/>
            <Label>First Name</Label>
            <Input value={firstName} onChangeText={setFirstName}/>
            <Label>Last Name</Label>
            <Input value={lastName} onChangeText={setLastName}/>
            <Button onPress={handleSignUp}>Register</Button>
        </View>
    );
};

export default Signup;

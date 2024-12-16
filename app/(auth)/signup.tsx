import { View, ActivityIndicator, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthContext";
import { UserAccountSignUpDto } from "@/data/api";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/data/api-routes";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
 
const Signup = () => {
    const { onRegister } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 
    const handleSignUp = async () => {
        const userSignUpDto: UserAccountSignUpDto = { username, password };
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        try {
            const response = await onRegister!(userSignUpDto);
            console.log("Sign up successfully: ", response.response?.data);
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorResponse = handleAxiosError(axiosError);
            if (errorResponse) {
                setErrorMessage(errorResponse);
                console.error("Error signing up:", errorResponse);
            } else {
                setErrorMessage("Unexpected error occurred. Please try again.");
                console.error("Unexpected error:", error);
            }
        }
    };
 
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
   
             
            <View style={styles.boxContainer}>
                <View style={styles.inputContainer}>
                    <Label style={styles.label}>Your Email</Label>
                    <Input
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#B0B0B0"
                    />
                </View>
 
                <View style={styles.inputContainer}>
                    <Label style={styles.label}>Password</Label>
                    <View style={styles.passwordContainer}>
                        <Input
                            value={password}
                            onChangeText={setPassword}
                            style={styles.fixedInput}
                            placeholder="Enter your password"
                            placeholderTextColor="#B0B0B0"
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? "eye-off" : "eye"}
                                size={24}
                                color="white"
                                style={styles.eyeIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
 
                <View style={styles.inputContainer}>
                    <Label style={styles.label}>Confirm Password</Label>
                    <View style={styles.passwordContainer}>
                        <Input
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={styles.fixedInput}
                            placeholder="Confirm your password"
                            placeholderTextColor="#B0B0B0"
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Ionicons
                                name={showConfirmPassword ? "eye-off" : "eye"}
                                size={24}
                                color="white"
                                style={styles.eyeIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
 
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
 
                <Button onPress={handleSignUp} style={styles.button} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> :                    <Text style={styles.buttonText}>Sign Up</Text>}
                </Button>
 
                <View style={styles.linkContainer}>
                    <Text style={styles.link}>Already have an account? <Link href={"/(auth)/signin"}>Log In</Link></Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
        backgroundColor: '#1F1F39',
        paddingTop: 50,
        fontSize: 22
    },
    title: {
        fontSize: 22.4,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 15,
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'left',
    },
    boxContainer: {
        width: '100%',
        backgroundColor: '#2F2F42',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: '#D0D0D0',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        backgroundColor: '#1F1F39',
        color: 'white',
    },
    fixedInput: {
        height: 50,
        width: 300,
        borderColor: '#D0D0D0',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        backgroundColor: '#1F1F39',
        color: 'white',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    eyeIcon: {
        marginLeft: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#3D5CFF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    linkContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    link: {
        color: '#3D5CFF',
        fontSize: 14,
        marginVertical: 5,
    },
});
 
export default Signup;
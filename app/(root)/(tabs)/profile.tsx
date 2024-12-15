import React from "react";
import {SafeAreaView} from "react-native";
import {Text} from "~/components/ui/text";
import {Button} from "~/components/ui/button";
import {useAuth} from "@/components/AuthContext";
import { useRouter } from "expo-router";

const Profile = () => {
    const {onLogout} = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        if (onLogout) {
            await onLogout();
            router.replace("/(auth)/signin");
        }
    };

    return (
        <SafeAreaView>
            <Text>Profile</Text>
            <Button onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </Button>
        </SafeAreaView>
    );
};

export default Profile;
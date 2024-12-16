import {useAuth} from "@/components/AuthContext";
import React from "react";
import {Redirect, useRouter} from "expo-router";
import Onboarding from "@/components/Onboarding";

import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";

const DATA = [
    {
        id: "1",
        title: "Numerous free trial \ncourses",
        subtitle: "Free courses for you to \ndiscover!",
        image: onboarding1,
    },
    {
        id: "2",
        title: "Quick and easy learning",
        subtitle:
            "Accessible services provided \nin various ways, to accompany \nall your learning styles!",
        image: onboarding2,
    },
    {
        id: "3",
        title: "Create your own \nstudy plan",
        subtitle:
            "Study at your own pace! \nMaking yourself consistent \nand motivated",
        image: onboarding3,
    },
]

const Index = () => {
    const { userSession } = useAuth();
    const router = useRouter();

    const handleSignUp = () => {
        router.push("/(auth)/signup");
    };

    const handleSignIn = () => {
        router.push("/(auth)/signin");
    };

    if (userSession) {
        return <Redirect href="/(root)/(tabs)/home" />;
    }

    return (
        <>
            <Onboarding data={DATA} onSignUp={handleSignUp} onSignIn={handleSignIn} />
        </>
    );
};

export default Index;

import onboarding1 from '@/assets/images/onboarding1.png';
import onboarding2 from '@/assets/images/onboarding2.png';
import onboarding3 from '@/assets/images/onboarding3.png';

import { router } from "expo-router";
import React from 'react';
import { SafeAreaView } from "react-native"
import CustomButton from "@/components/CustomButton";

const onboarding= [
	{
		id: 1,
		title: "Numerous free trial \ncourses",
		subtitle: "Free courses for you to \ndiscover!",
		image: onboarding1,
		button: null,
	},
	{
		id: 2,
		title: "Quick and easy learning",
		subtitle:
			"Accessible services provided \nin various ways, to accompany \nall your learning styles!",
		image: onboarding2,
		button: null,
	},
	{
		id: 3,
		title: "Create your own \nstudy plan",
		subtitle:
			"Study at your own pace! \nMaking yourself consistent \nand motivated",
		image: onboarding3,
		button:
			<SafeAreaView className="w-full flex flex-row justify-center justify between">
				<CustomButton className="px-20 mx-1 mt-10" title="Sign in" onPress={() => { router.replace("/(auth)/sign-in"); }} />
				<CustomButton className="px-20 mx-1 mt-10" title="Sign up" onPress={() => { router.replace("/(auth)/sign-up"); }} />
			</SafeAreaView>,
	},
]

export default onboarding;
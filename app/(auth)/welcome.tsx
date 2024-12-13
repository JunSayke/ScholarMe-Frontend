import {router} from "expo-router";
import React, {useRef, useState} from "react";
import {Text} from "~/components/ui/text";
import {View, SafeAreaView, TouchableOpacity, Image} from "react-native";
import Swiper from "react-native-swiper";
import onboarding from "@/constants";

import CustomButton from "@/components/CustomButton";

const Welcome = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === onboarding.length - 1;
    //console.log(activeIndex)

    return (
        <SafeAreaView className="flex h-full items-center justify between py-10">
            <TouchableOpacity
                onPress={() => {
                    if (!isLastSlide) swiperRef.current?.scrollTo(onboarding.length - 1);
                }}
                className="w-full flex justify-end items-end p-5"
            >
                <Text className="text-md">Skip</Text>
            </TouchableOpacity>

            <Swiper
                ref={swiperRef}
                loop={false}
                dot={
                    <View className="w-[32px] h-[4px] mx-1 bg-[#858597] rounded-full"/>
                }
                activeDot={
                    <View className="w-[32px] h-[4px] mx-1 bg-[#3D5CFF] rounded-full"/>
                }
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map((item) => (
                    <View key={item.id} className="flex items-center justify center p-5">
                        <Image
                            source={item.image}
                            className="w-full h-[300px]"
                            resizeMode="contain"
                        />
                        <View className="flex flex-row justify-center w-full mt-10">
                            <Text className="text-3xl font-bold mx-10 text-center">
                                {item.title}
                            </Text>
                        </View>
                        <Text className="text-md text-center mx-10 mt-3">
                            {item.subtitle}
                        </Text>

                        {item.button}
                    </View>
                ))}
            </Swiper>
        </SafeAreaView>
    );
};

export default Welcome;

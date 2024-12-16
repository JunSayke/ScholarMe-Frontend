import React, { useRef } from "react";
import { FlatList, Image, ImageSourcePropType, TouchableOpacity, useWindowDimensions, View, Animated } from "react-native";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";

interface OnboardingProps {
    data: Array<{ id: string; title: string; subtitle: string; image: ImageSourcePropType }>;
    onSignUp?: () => void;
    onSignIn?: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ data, onSignUp, onSignIn }) => {
    const { height, width } = useWindowDimensions();
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleSkip = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    return (
        <SafeAreaView className="bg-app-bg flex-1">
            <FlatList
                ref={flatListRef}
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                scrollEventThrottle={16}
                contentContainerStyle={{ height: height * 0.75 }}
                decelerationRate="fast"
                disableIntervalMomentum
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item, index }) => (
                    <View style={{ width }} className="p-4">
                        <View className="items-center mt-8">
                            <Image source={item.image} className="size-60 my-8" />
                            <Text className="text-center text-3xl font-bold mb-4">
                                {item.title}
                            </Text>
                            <Text className="text-lg font-thin text-center">
                                {item.subtitle}
                            </Text>
                            {index === data.length - 1 && (
                                <View className="mt-8">
                                    <TouchableOpacity className="bg-blue-500 p-4 rounded-full w-80 mb-4" onPress={onSignIn}>
                                        <Text className="text-white text-center">Sign Up</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="bg-gray-500 p-4 w-80 rounded-full" onPress={onSignUp}>
                                        <Text className="text-white text-center">Sign In</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />

            <View className="flex-row justify-center pb-10">
                {data.map((_, index) => {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 30, 10],
                        extrapolate: 'clamp',
                    });
                    const dotColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#d3d3d3', '#3D5CFF', '#d3d3d3'],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={index.toString()}
                            style={{
                                width: dotWidth,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: dotColor,
                                marginHorizontal: 5,
                            }}
                        />
                    );
                })}
            </View>
            <TouchableOpacity className="absolute top-16 right-12" onPress={handleSkip}>
                <Text>Skip</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Onboarding;
import React, { useRef, useState } from "react";
import { View, Text, Image, FlatList, Animated, useWindowDimensions, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from '~/components/ui/button';

interface OnboardingProps {
    data: Array<{ id: string; title: string; subtitle: string; image: string }>;
}

const Onboarding: React.FC<OnboardingProps> = ({ data }) => {
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(slideIndex);
    };

    const scrollToNextSlide = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: (currentIndex + 1) * width, animated: true });
        }
    };

    const scrollToLastSlide = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: (data.length - 1) * width, animated: true });
        }
    };

    const Slide = ({ item }: { item: { title: string; subtitle: string; image: string } }) => (
        <View className={`flex-1 justify-center items-center p-4`} style={{ paddingBottom: insets.bottom, width }}>
            <Image source={{ uri: item.image }} className={`w-full h-64`} resizeMode="contain" />
            <Text className={`mt-4 text-2xl text-center font-bold`}>{item.title}</Text>
            <Text className={`mt-2 text-lg text-center text-gray-600`}>{item.subtitle}</Text>
        </View>
    );

    return (
        <View className={`flex-1`}>
            <FlatList
                ref={flatListRef}
                data={data}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Slide item={item} />}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { listener: handleScroll, useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            />

            <View className={`flex-row justify-between p-4`}>
                <Button onPress={scrollToLastSlide} variant="outline">
                    <Text>Skip</Text>
                </Button>

                <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                    {data.map((_, index) => {
                        const opacity = scrollX.interpolate({
                            inputRange: [(index - 1) * width, index * width, (index + 1) * width],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                key={`indicator-${index}`}
                                style={{
                                    opacity,
                                    height: 10,
                                    width: 10,
                                    backgroundColor: 'blue',
                                    margin: 8,
                                    borderRadius: 5,
                                }}
                            />
                        );
                    })}
                </View>

                {currentIndex === data.length - 1 ? (
                    <Button onPress={() => console.log("Get Started")}>
                        <Text>Get Started</Text>
                    </Button>
                ) : (
                    <Button onPress={scrollToNextSlide}>
                        <Text>Next</Text>
                    </Button>
                )}
            </View>
        </View>
    );
};

export default Onboarding;
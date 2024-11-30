import React, { useRef } from "react"
import {
	View,
	Text,
	FlatList,
	Dimensions,
	Image,
	Animated,
	TouchableOpacity,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const { width, height } = Dimensions.get("window")

interface OnboardingProps {
	data: Array<{ id: string; title: string; subtitle: string; image: string }>
	onSkip?: () => void
}

const Onboarding: React.FC<OnboardingProps> = ({ data, onSkip }) => {
	const scrollX = useRef(new Animated.Value(0)).current

	const handleScroll = Animated.event(
		[{ nativeEvent: { contentOffset: { x: scrollX } } }],
		{ useNativeDriver: false }
	)

	return (
		<SafeAreaView className="bg-[#1F1F39] flex-1">
			<FlatList
				data={data}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				onScroll={handleScroll}
				scrollEventThrottle={16}
				contentContainerStyle={{ height: height * 0.75 }}
				decelerationRate="fast"
				disableIntervalMomentum
				renderItem={({ item }) => (
					<View
						style={{ width }}
						className="p-4">
						<View className="items-center mt-8">
							<Image
								source={{ uri: item.image }}
								className="size-52 my-8"
							/>
							<Text className="text-gray-50 text-center font-bold mb-4">
								{item.title}
							</Text>
							<Text className="text-gray-300 text-xs font-thin text-center">
								{item.subtitle}
							</Text>
						</View>
					</View>
				)}
				keyExtractor={(item) => item.id}
			/>
			<View
				style={{ height: height * 0.25 }}
				className="flex-row justify-center">
				{data.map((_, index) => {
					const inputRange = [
						(index - 1) * width,
						index * width,
						(index + 1) * width,
					]

					const dotWidth = scrollX.interpolate({
						inputRange,
						outputRange: [6, 12, 6],
						extrapolate: "clamp",
					})

					const backgroundColor = scrollX.interpolate({
						inputRange,
						outputRange: ["#E5E7EB", "#3B82F6", "#E5E7EB"], // gray-200 and blue-500
						extrapolate: "clamp",
					})

					return (
						<Animated.View
							key={index}
							style={{
								height: 4,
								width: dotWidth,
								backgroundColor,
								borderRadius: 4,
								marginHorizontal: 4,
							}}
						/>
					)
				})}
			</View>
			<TouchableOpacity
				className="absolute top-8 right-8"
				onPress={onSkip}>
				<Text className="text-gray-200">Skip</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

export default Onboarding

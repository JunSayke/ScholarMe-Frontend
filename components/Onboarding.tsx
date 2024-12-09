import React from "react";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface OnboardingProps {
  data: Array<{ id: string; title: string; subtitle: string; image: string }>;
  onSkip?: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ data, onSkip }) => {
  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaView className="bg-app-bg flex-1">
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        contentContainerStyle={{ height: height * 0.75 }}
        decelerationRate="fast"
        disableIntervalMomentum
        renderItem={({ item }) => (
          <View style={{ width }} className="p-4">
            <View className="items-center mt-8">
              <Image source={{ uri: item.image }} className="size-52 my-8" />
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
      <TouchableOpacity className="absolute top-8 right-8" onPress={onSkip}>
        <Text className="text-gray-200">Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboarding;

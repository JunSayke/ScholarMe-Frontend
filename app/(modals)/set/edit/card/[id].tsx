import { 
    SafeAreaView, 
    View,
    StyleSheet,
    TextInput,
    FlatList,
    Switch,
    ListRenderItem,
  } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text } from "~/components/ui/text";

import CustomButton from "@/components/CustomButton";
import { FlashcardDeck, Flashcards, FlashcardChoices, FlashcardSetFlashcards } from '@/data/temporary';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [card, setCard] = useState<Set>();
  const [choices, setChoices] = useState<Set>();
  const router = useRouter();
  const [information, setInformation] = useState({
    choice: '',
    isAnswer: false,
  });

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        const numid: number = +id;
        const fetchedCard = Flashcards[numid - 1];
        setCard(fetchedCard);

        const allChoices = FlashcardChoices.filter((choice) => choice["FlashcardId"] === fetchedCard["FlashcardId"])
        setChoices(allChoices);

      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadData();
  }, [id]);

  const onCreateChoice = async () => {
    console.log(information)
    router.replace(`/(modals)/set/edit/card/${id}`);  
  };

  const renderChoiceRow: ListRenderItem<Set> = ({ item }) => {
    return (
        <View className='w-full h-24 bg-[#2F2F42] my-2 rounded-3xl shadow-lg elevation-5 flex items-center justify-center '>
            <Text className='text-2xl'>{item["Choice"]}</Text>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      {card && (
        <View className="h-full">
          <View className="w-full h-1/3 bg-[#3D5CFF] flex items-center justify-center">
            <Text className="text-3xl">{card["Question"]}</Text>
            <TextInput 
                className="mt-1 w-11/12 rounded-3xl bg-[#FFF]"
                placeholder="Answer"
                value={information.choice}
                onChangeText={(text) => setInformation({ ...information, choice: text })}
            />
            <Text>Is correct answer</Text>
            <Switch
              onValueChange={(value) => setInformation({ ...information, isAnswer: value })}
              value={information.isAnswer}
            />
            <CustomButton
                className="px-20 my-1"
                title="Add Card"
                onPress={onCreateChoice}
            />
          </View>
          <View className='m-5'>
            <FlatList data={choices} renderItem={renderChoiceRow} />
          </View>
          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

export default Page;


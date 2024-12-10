import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, ListRenderItem, FlatList } from 'react-native';
import { Text } from "~/components/ui/text";

import { FlashcardDeck, Flashcards, FlashcardChoices, FlashcardSetFlashcards } from '@/data/temporary';

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [set, setSet] = useState<Set>();
    const [card, setCard] = useState<Set>();
    const [choice, setChoice] = useState<Set>();
    const router = useRouter();

    //REWORK EVERYTHING ONCE CODE IS RELEASED
    useEffect(() => {
        if (!id) return;
    
        const loadSet = async () => {
          var numid: number = +id
          const data = FlashcardDeck[numid - 1]
          setSet(data);
        };
        loadSet();
      }, [id]);

    useEffect(() => {
        if (!set) return;

        const loadCard = async () => {
            const matchingCardIds = FlashcardSetFlashcards
                .filter((cardDeck) => cardDeck["FlashcardSetId"] === set["FlashcardSetId"])
                .map((cardDeck) => cardDeck["FlashcardId"]);

            const data = Flashcards.filter((card) => matchingCardIds.includes(card["FlashcardId"]));
            setCard(data);
        };
        loadCard();
    }, [set]);
    
    useEffect(() => {
        if (!set) return;

        const loadCard = async () => {
            const matchingCardIds = FlashcardSetFlashcards
                .filter((cardDeck) => cardDeck["FlashcardSetId"] === set["FlashcardSetId"])
                .map((cardDeck) => cardDeck["FlashcardId"]);

            const data = Flashcards.filter((card) => matchingCardIds.includes(card["FlashcardId"]));
            setCard(data);
        };
        loadCard();
    }, [set]);

    useEffect(() => {
        if (!card) return;

        const loadChoice = async () => {
            const allChoices = await Promise.all(
                card.map(async (item) => {
                    const data = FlashcardChoices.filter((choice) => choice["FlashcardId"] === item["FlashcardId"]);
                    return data;
                })
            );
            setChoice(allChoices.flat()); // Flattening the array if necessary
        };
        loadChoice();
    }, [card]);


    //Rework code once database is released
    const renderChoiceRow: ListRenderItem<Set> = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Text className='text-2xl text-black'>{item["Choice"]}</Text>
            </View>
        );
      }

    const renderCardRow: ListRenderItem<Set> = ({ item }) => {
        const cardChoices = choice?.filter((choice) => choice["FlashcardId"] === item["FlashcardId"]);

        return (
            <View style={{ flexDirection: 'column', gap: 10 }} className='w-full h-96 p-5 my-5 bg-[#FFF] rounded-3xl flex flex-row items-center justify-center'>
                <Text className='text-3xl text-black'>{item["Question"]}</Text>
                {cardChoices && (
                    <FlatList
                        data={cardChoices}
                        renderItem={renderChoiceRow}
                        keyExtractor={(choice) => choice["FlashcardChoiceId"].toString()}
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
          {set && (
            <View className='h-full'>
            <View className="w-full h-1/6 bg-[#3D5CFF] flex items-center justify-center">
                <Text className='text-5xl'>{set["Title"]}</Text>
                <Text className='text-2xl'>Created by: {set["UserAccount"]["Username"]}</Text>
            </View>
              <FlatList 
                    data={card}
                    renderItem={renderCardRow}
                />
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
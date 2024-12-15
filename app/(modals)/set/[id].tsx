import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, ListRenderItem, FlatList, TouchableOpacity } from 'react-native';
import { Text } from "~/components/ui/text";

import { createCard, getCards, getChoices, getDeckById } from '@/data/api-routes';

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [set, setSet] = useState<Set>();
    const [card, setCard] = useState<Set>();
    const [choice, setChoice] = useState<Set>();
    const router = useRouter();
    const [flipStates, setFlipStates] = useState<{ [key: string]: boolean }>({}); // To track flip state for each card

    //REWORK EVERYTHING ONCE CODE IS RELEASED
    useEffect(() => {
        if (!id) return;
    
        const loadData = async () => {
          try {
              const numid: number = +id;
              const fetchedSet = await getDeckById(numid);
              setSet(fetchedSet.data);
  
              const fetchedCards = await getCards(fetchedSet.data["id"]);
              setCard(fetchedCards.data);

              var fetchedChoices = new Set;
              for (var cards in fetchedCards.data){
                console.log(cards[0])
                fetchedChoices.add(await getChoices(cards["flashcardId"]));
              }

              // const fetchedChoices = await getChoices(1); //change this later

              setChoice(fetchedChoices);
  
          } catch (error) {
              console.error("Error loading data:", error);
          }
        };
    
        loadData();
    }, [id]);

    //Rework code once database is released
    const renderChoiceRow: ListRenderItem<Set> = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Text className='text-2xl text-black'>{item["Choice"]}</Text>
            </View>
        );
      }

      const renderCardRow: ListRenderItem<Set> = ({ item }) => {
        const cardChoices = choice?.filter((choice) => choice["flashcardId"] === item["flashcardId"]);
        const answer = cardChoices?.filter((x) => x["isAnswer"] === true);
    
        const isFlipped = flipStates[item["FlashcardId"]] || false; // Get flip state for this specific card
    
        return (
          <TouchableOpacity onPress={() => setFlipStates((prev) => ({ ...prev, [item["flashcardId"]]: !prev[item["FlashcardId"]] }))}>
            {isFlipped && answer?.length > 0 ? (
              <View className="w-full h-96 p-5 my-5 bg-[#FFF] rounded-3xl flex flex-column items-center justify-center gap-10">
                <Text className="text-3xl text-black">{answer[0]["choice"]}</Text>
              </View>
            ) : (
              <View className="w-full h-96 p-5 my-5 bg-[#FFF] rounded-3xl flex flex-column items-center justify-center gap-10">
                <Text className="text-3xl text-black">{item["question"]}</Text>
    
                {cardChoices && (
                  <FlatList
                    data={cardChoices}
                    renderItem={renderChoiceRow}
                    keyExtractor={(choice) => choice["FlashcardChoiceId"].toString()}
                  />
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      };
    
      return (
        <View style={styles.container}>
          {set && (
            <View className="h-full">
              <View className="w-full h-1/6 bg-[#3D5CFF] flex items-center justify-center">
                <Text className="text-5xl">{set["title"]}</Text>
                {/* <Text className="text-2xl">Created by: {set["userAccount"]["username"]}</Text> */}
              </View>
              <FlatList data={card} renderItem={renderCardRow} />
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
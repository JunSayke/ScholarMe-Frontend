import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, ListRenderItem, FlatList, TouchableOpacity } from 'react-native';
import { Text } from "~/components/ui/text";

import { createCard, getCards, getChoices, getDeckById } from '@/data/api-routes';

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [deck, setDeck] = useState<Set>();
    const [cards, setCards] = useState<Set>();
    const [flipStates, setFlipStates] = useState<{ [key: string]: boolean }>({}); // To track flip state for each card

    useEffect(() => {
        if (!id) return;
    
        const loadData = async () => {
          try {
              const fetchedDeck = await getDeckById(id);
              setDeck(fetchedDeck.data);
  
              const fetchedCards = await getCards(fetchedDeck.data["id"], {"includeChoices" : true});
              setCards(fetchedCards.data);
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
                <Text className='text-2xl text-black'>{item["choice"]}</Text>
            </View>
        );
      }

      const renderCardRow: ListRenderItem<Set> = ({ item }) => {
        const answers = item["choices"]?.filter((x) => x["isAnswer"] === true)
    
        const isFlipped = flipStates[item["id"]] || false; // Get flip state for this specific card
    
        return (
          <TouchableOpacity onPress={() => setFlipStates((prev) => ({ ...prev, [item["id"]]: !prev[item["id"]] }))}>
            {isFlipped && answers?.length > 0 ? (
              <View className="w-full h-96 p-5 my-5 bg-[#F0F0FF] rounded-3xl flex flex-column items-center justify-center gap-10">
                {answers.map((answer, index) => (
                <Text key={index} className="text-3xl text-black">
                  {answer["choice"]}
                </Text>
              ))}
              </View>
            ) : (
              <View className="w-full h-96 p-5 my-5 bg-[#F0F0FF] rounded-3xl flex flex-column items-center justify-center gap-10">
                <Text className="text-3xl text-black">{item["question"]}</Text>
    
                {item["choices"] && (
                  <FlatList
                    data={item["choices"]}
                    renderItem={renderChoiceRow}
                    keyExtractor={(choice) => choice["id"].toString()}
                  />
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      };
    
      return (
        <View style={styles.container}>
          {deck && (
            <View className="h-full">
              <View className="w-full h-1/6 bg-[#3D5CFF] flex items-center justify-center">
                <Text className="text-5xl text-center text-white">{deck["title"]}</Text>
                {/* <Text className="text-2xl">Created by: {set["userAccount"]["username"]}</Text> */}
              </View>
              <FlatList data={cards} renderItem={renderCardRow} />
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
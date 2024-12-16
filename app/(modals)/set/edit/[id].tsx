import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, ListRenderItem, FlatList, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Text } from "~/components/ui/text";

import CustomButton from "@/components/CustomButton";
import { createCard, deleteDeck, getCards, getDeckById, updateDeck } from '@/data/api-routes';
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [set, setSet] = useState<Set>();
    const [card, setCard] = useState<Set>();
    const [choice, setChoice] = useState<Set>();
    const router = useRouter();
    const [flipStates, setFlipStates] = useState<{ [key: string]: boolean }>({}); // To track flip state for each card
    const [information, setInformation] = useState({
        question: '',
    });
    const [editDeckInformation, setEditInformation] = useState({
      title: '',
      description: '',
    })

    const [editDeck, setEditDeck] = useState<Boolean>(false);

    useEffect(() => {
        if (!id) return;
    
        const loadData = async () => {
            try {
                const fetchedSet = await getDeckById(id);
                setSet(fetchedSet.data);

                setEditInformation(fetchedSet.data)
    
                const fetchedCards = await getCards(fetchedSet.data["id"], {"includeChoices" : true});
                setCard(fetchedCards.data);
    
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
    
        loadData();
    }, [id]);

    const onCreateCard = async () => {
        await createCard(set['id'], information)
        router.replace(`/(modals)/set/edit/${set['id']}`);  
      };

    const onEditDeck = async () => {
      await updateDeck(set['id'], editDeckInformation)
      router.replace(`/(modals)/set/edit/${set['id']}`);  
    }

    const onDeleteDeck = async () => {
      await deleteDeck(set['id'])
      router.replace('/(root)/(tabs)/home');  
    }
 
    const renderChoiceRow: ListRenderItem<Set> = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Text className='text-2xl text-black'>{item["choice"]}</Text>
            </View>
        );
      }

      const renderCardRow: ListRenderItem<Set> = ({ item }) => {
        const answers = item["choices"]?.filter((x) => x["isAnswer"] === true)
        console.log(item)
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
              <View className="w-full h-96 p-5 my-5 bg-[#F0F0FF] rounded-3xl flex flex-column items-center gap-10">
                <CustomButton
                    className="px-20 mx-1"
                    title="Edit"
                    onPress={() => {
                        router.replace(`/(modals)/set/edit/card/${item["id"]}`);
                    }}
                />
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
          {set && (
            <View className="h-full">
              <View className="w-full p-1 bg-[#3D5CFF] flex items-center justify-center">
                <View className='w-full flex flex-row items-center justify-between'>
                  <Text className="text-4xl max-w-xs text-white">{set["title"]}</Text>
                  <View className='flex items-center'>
                    <Text className='text-white'>Edit</Text>
                    <Switch 
                      onValueChange={() => setEditDeck(!editDeck)}
                      value={editDeck}
                    />
                  </View>
                </View>
                {editDeck ? (
                  <View className='w-full flex items-center'>
                    <TextInput 
                      className='text-3xl w-11/12 my-5 bg-white p-1 rounded-xl'
                      placeholder='title'
                      value={editDeckInformation.title}
                      onChangeText={(text) => setEditInformation({ ...card, title: text })}
                    />
                    <TextInput 
                      className='text-xl w-11/12 bg-white p-1 rounded-xl'
                      multiline
                      numberOfLines={4}
                      placeholder='descrption'
                      value={editDeckInformation.description}
                      onChangeText={(text) => setEditInformation({ ...card, description: text })}
                    />
                    <View className="flex flex-row pb-10">
                      <CustomButton title='Edit Deck' className='h-12 w-40' onPress={() => onEditDeck()}/>
                      <CustomButton title='X' className='h-12 w-10 bg-[#FF0000]' onPress={() => onDeleteDeck(id)}/>
                    </View>
                  </View>
                ):(
                  <View className='w-full flex items-center'>
                    <Text className="text-2xl text-white">{set["description"]}</Text>
                    <Collapse>
                     <CollapseHeader className="pt-5 flex flex-row items-center">
                      <Text className="text-xl text-white">Create question: </Text>
                      <Ionicons
                          name={"chevron-down"}
                          size={24}
                          color="white"
                      />
                     </CollapseHeader>
                     <CollapseBody>
                     <TextInput 
                        className="mt-1 w-80 p-1 rounded-3xl bg-[#FFF]"
                        placeholder="Question"
                        multiline
                        numberOfLines={2}
                        value={information.question}
                        onChangeText={(text) => setInformation({ ...information, question: text })}
                      />
                      <CustomButton
                          className="h-12 px-20 my-1"
                          title="Add Card"
                          onPress={onCreateCard}
                      />
                    </CollapseBody>
                     </Collapse>
                  </View>
                )}
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
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, ListRenderItem, FlatList, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Text } from "~/components/ui/text";

import CustomButton from "@/components/CustomButton";
import { createCard, deleteDeck, getCards, getChoices, getDeckById, updateDeck } from '@/data/api-routes';

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

    //REWORK EVERYTHING ONCE CODE IS RELEASED
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
        console.log(item)
        const isFlipped = flipStates[item["id"]] || false; // Get flip state for this specific card
    
        return (
          <TouchableOpacity onPress={() => setFlipStates((prev) => ({ ...prev, [item["id"]]: !prev[item["id"]] }))}>
            {isFlipped && answers?.length > 0 ? (
              <View className="w-full h-96 p-5 my-5 bg-[#FFF] rounded-3xl flex flex-column items-center justify-center gap-10">
                {answers.map((answer, index) => (
                <Text key={index} className="text-3xl text-black">
                  {answer["choice"]}
                </Text>
              ))}
              </View>
            ) : (
              <View className="w-full h-96 p-5 my-5 bg-[#FFF] rounded-3xl flex flex-column items-center gap-10">
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
              <View className="w-full p-5 bg-[#3D5CFF] flex items-center justify-center">
                <View className='w-full p-5 flex items-start'>
                  <Text>Edit Deck</Text>
                  <Switch 
                    onValueChange={() => setEditDeck(!editDeck)}
                    value={editDeck}
                  />
                </View>
                <Text className="text-5xl">{set["title"]}</Text>
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
                      <CustomButton title='Edit Deck' className='h-10 w-40' onPress={() => onEditDeck()}/>
                      <CustomButton title='X' className='h-10 w-10 bg-[#FF0000]' onPress={() => onDeleteDeck(id)}/>
                    </View>
                  </View>
                ):(
                  <View className='w-full flex items-center'>
                    <Text className="text-2xl">{set["description"]}</Text>
                    <Text className="text-xl pt-5">Create question:</Text>
                    <TextInput 
                      className="mt-1 w-11/12 p-1 rounded-3xl bg-[#FFF]"
                      placeholder="Question"
                      value={information.question}
                      onChangeText={(text) => setInformation({ ...information, question: text })}
                    />
                    <CustomButton
                        className="h-10 px-20 my-1"
                        title="Add Card"
                        onPress={onCreateCard}
                    />
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
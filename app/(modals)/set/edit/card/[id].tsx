import { 
    SafeAreaView, 
    View,
    StyleSheet,
    TextInput,
    FlatList,
    Switch,
    ListRenderItem,
    TouchableOpacity,
    Image,
  } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text } from "~/components/ui/text";
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';

import CustomButton from "@/components/CustomButton";
import { createChoice, deleteCard, deleteChoice, getCardById, getChoices, updateCard, updateChoice } from '@/data/api-routes';
import { icons } from '@/constants';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [card, setCard] = useState<Set>();
  const [choices, setChoices] = useState<Set>();
  const router = useRouter();
  const [information, setInformation] = useState({
    choice: '',
    isAnswer: false,
  });
  const [editChoiceInformation, setChoiceInformation] = useState({
    choice: '',
    isAnswer: false,
  });
  const [editCardInformation, setCardInformation] = useState({
    question: ''
  });

  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});
  const [editCard, setEditCard] = useState<Boolean>(false);

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        const fetchedCard = await getCardById(id);
        setCard(fetchedCard.data);

        setCardInformation(fetchedCard.data)

        const fetchedChoices = await getChoices(fetchedCard.data['id']) 
        setChoices(fetchedChoices.data);

      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadData();
  }, [id]);

  const onCreateChoice = async () => {
    console.log(information);
    await createChoice(card['id'], information);
    router.replace(`/(modals)/set/edit/card/${card['id']}`);  
  };

  const onEditChoice = async (id: string) => {
    console.log(editChoiceInformation);
    await updateChoice(id, editChoiceInformation);
    router.replace(`/(modals)/set/edit/card/${card['id']}`);  
  };
  
  const onEditCard = async (id: string) => {
    console.log(editCardInformation);
    await updateCard(id, editCardInformation);
    router.replace(`/(modals)/set/edit/${card['flashcardSetId']}`);  
  };

  const onDeleteChoice = async (id: string) => {
    await deleteChoice(id);
    router.replace(`/(modals)/set/edit/card/${card['id']}`);
  }

  const onDeleteCard = async (id: string) => {
    await deleteCard(id);
    router.replace(`/(modals)/set/edit/${card['flashcardSetId']}`);  
  };

  const renderChoiceRow: ListRenderItem<Set> = ({ item }) => {
    const editEnabled= editStates[item["id"]] || false;

    return (
      <View className='w-full flex flex-row justify-between items-center'>
        <TouchableOpacity className="p-1" onPress={() => setEditStates((prev) => ({ ...prev, [item["id"]]: !prev[item["id"]] }))}>
          <Ionicons
            name='pencil'
            size={30}
            color="white"
          />
        </TouchableOpacity>
        {/* <CustomButton title='Edit Choice' className='h-10 w-40' onPress={() => setEditStates((prev) => ({ ...prev, [item["id"]]: !prev[item["id"]] }))}/> */}
        {editEnabled ? (
          <View className='my-2 rounded-3xl elevation-5 flex items-center justify-center '>
            <Text className='text-2xl text-white'>{item["choice"]}</Text>
            <TextInput 
                className="mt-1 p-1 w-11/12 rounded-3xl bg-[#FFF]"
                placeholder="new choice"
                value={editChoiceInformation.choice}
                onChangeText={(text) => setChoiceInformation({ ...editChoiceInformation, choice: text })}
            />
            <Text className='text-white'>Is correct answer:</Text>
            <Text className='text-xl text-white'>{item["isAnswer"].toString()}</Text>
            <Switch
              onValueChange={(value) => setChoiceInformation({ ...editChoiceInformation, isAnswer: value })}
              value={editChoiceInformation.isAnswer}
            />

            <CustomButton
                className="px-20 my-1 h-12"
                title="Edit Choice"
                onPress={() => onEditChoice(item['id'])}
            />
          </View>
        ) : (
          <View className='my-2 rounded-3xl elevation-5 flex items-center justify-center '>
            <Text className='text-2xl text-white'>{item["choice"]}</Text>
            <Text className='text-xl text-white'>{item["isAnswer"].toString()}</Text>
          </View>
        )}
        <TouchableOpacity className="p-1" onPress={() => onDeleteChoice(item['id'])}>
        <Ionicons
            name='trash'
            size={30}
            color="white"
          />
        </TouchableOpacity>
        {/* <CustomButton title='Delete Choice' className='bg-[#FF0000] h-10 w-40' onPress={() => onDeleteChoice(item['id'])}/> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {card && (
        <View className="h-full">
          <View className="w-full p-5 bg-[#3D5CFF] flex items-center">
          <View className='w-full flex flex-row items-center justify-between'>
            <Text className="text-3xl rounded-3xl max-w-xs text-white">{card["question"]}</Text>
            <View className='flex items-center'>
              <Text className='text-white'>Edit</Text>
              <Switch 
                onValueChange={() => setEditCard(!editCard)}
                value={editCard}
              />
            </View>
          </View>
          
          { editCard ? (
            <View className='w-full p-5 flex items-center'>
              <TextInput
                className="w-11/12 rounded-xl p-1 bg-[#FFF]"
                multiline
                numberOfLines={2}
                value={editCardInformation["question"]}
                placeholder="question"
                onChangeText={(text) => setCardInformation({ ...card, question: text })}
              />
              <View className='flex flex-row p-5'>
                <CustomButton title='Edit Question' className='h-12 w-40' onPress={() => onEditCard(id)}/>
                <CustomButton title='X' className='h-12 w-10 bg-[#FF0000]' onPress={() => onDeleteCard(id)}/>
              </View>
            </View>
          ):(
            <View className='w-full flex items-center'>
              <Text className='pt-1 text-white'>Create Choice:</Text>
              <TextInput 
                className="mt-1 w-11/12 p-1 rounded-xl bg-[#FFF]"
                placeholder="Answer"
                value={information.choice}
                onChangeText={(text) => setInformation({ ...information, choice: text })}
              />
              <Text className='text-white'>Is correct answer</Text>
              <Switch
                onValueChange={(value) => setInformation({ ...information, isAnswer: value })}
                value={information.isAnswer}
              />
              <CustomButton
                  className="px-20 my-1"
                  title="Add Choice"
                  onPress={onCreateChoice}
              />
            </View>
          )}
            
          </View>
          <View className='m-5 rounded-xl bg-[#2F2F42]'>
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


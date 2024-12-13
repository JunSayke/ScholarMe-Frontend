import React, { useState, useEffect } from 'react';
import { 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  ListRenderItem, 
  StyleSheet, 
  FlatList, 
  TextInput } 
  from "react-native";
import { Text } from "~/components/ui/text";
import { icons } from "@/constants";
import { Redirect, router, Link } from "expo-router";

import { FlashcardDeck } from '@/data/temporary';
import CustomButton from "@/components/CustomButton";

const Home = () => {
  const [sets, setSets] = useState<Set[]>([]);
  const [createDropdownState, setCreateDropdownState] = useState(false);
  const [information, setInformation] = useState({
    title: '',
    description: '',
  });

    // IMPLEMENT WHEN API IS ADDED
    useEffect(() => {
      loadSets();
    }, []);

    const loadSets = async () => {
      //TODO: Sort flashcards based on account id
        const data = FlashcardDeck
        setSets(data)
    }

    const onCreateDeck = async () => {
      console.log(information)
      router.replace(`/(root)/(tabs)/home`);  
    };

    const renderSetRow: ListRenderItem<Set> = ({ item }) => {
      //console.log(item["FlashcardSetId"] + ' ' + item["Title"] )
      return (
        <Link href={`/(modals)/set/edit/${item["FlashcardSetId"]}`} asChild>
          <TouchableOpacity style={styles.setRow}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{item["Title"]}</Text>
                <Text>{item["Description"]}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      );
    }

  return (
    <>
      <SafeAreaView className="h-full w-full">
        <View className="w-full h-1/4 bg-[#3D5CFF] flex flex-row items-center justify-between">
          <View className="pl-16">
            <Text className="font-extrabold text-7xl">Hi!</Text>
            <Text className="font-extrabold">Let's start learning</Text>
          </View>
          <View className="pr-10">
            <TouchableOpacity onPress={() =>
                router.push('/(root)/(tabs)/profile')
              }>
              <Image source={icons.icondefault} className="mb-8" />
            </TouchableOpacity>
          </View>
        </View>

        <SafeAreaView className=" pt-5 flex items-center">
          <View className="w-11/12 h-24 bg-[#2F2F42] rounded-3xl shadow-lg elevation-5 flex flex-row items-center justify-between ">
              <Text className="pl-5 text-3xl">Your Flashcards</Text>
              <TouchableOpacity onPress={() => setCreateDropdownState(!createDropdownState)}>
                <Image source={icons.cardplus} tintColor={'white'} className="w-12 h-12 mr-5"/>
              </TouchableOpacity>
          </View>
          {createDropdownState  ? (
            <View className='w-full flex items-center'>
              <TextInput 
                className="mt-1 w-11/12 rounded-3xl bg-[#FFF]"
                placeholder="Title"
                value={information.title}
                onChangeText={(text) => setInformation({ ...information, title: text })}
              />
              <TextInput 
                className="mt-1 w-11/12 rounded-3xl bg-[#FFF]"
                multiline
                numberOfLines={4}
                placeholder="Description"
                value={information.description}
                onChangeText={(text) => setInformation({ ...information, description: text })}
              />
              <CustomButton
                className="px-20 my-1"
                title="Create Deck"
                onPress={onCreateDeck}
              />
            </View>

          ) : (
            <View></View>
          )}

        </SafeAreaView>
        
        <Text className="pl-5 pb-5 pt-10 text-3xl">Your Flashcards</Text>
        <View className="w-11/12 mx-5 rounded-3xl bg-[#2F2F42] flex items-center justify-center">
          <FlatList className="w-full p-5 rounded-3xl shadow-lg flex flex-row"
            data={sets}
            renderItem={renderSetRow}
          />
        </View>
        
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setRow: {
    margin: 8,
    padding: 16,
    borderRadius: 8,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});
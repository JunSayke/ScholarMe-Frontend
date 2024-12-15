import {FlatList, ListRenderItem, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from "~/components/ui/text";
import React, {useEffect, useState} from 'react';
import {Link} from 'expo-router';
import {getAllDecks} from '@/data/api-routes';
import {FlashcardDeckReadOnlyDto} from '@/data/api';

const Page = () => {
  const [decks, setDecks] = useState<FlashcardDeckReadOnlyDto[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

    // IMPLEMENT WHEN API IS ADDED
    useEffect(() => {
      loadDecks();
    }, []);

    const loadDecks = async () => {
        const response = await getAllDecks()
        setDecks(response.data)
    }

    const renderSetRow: ListRenderItem<Set> = ({ item }) => {
      // console.log(item["FlashcardSetId"] + ' ' + item["Title"] )
      return (
        <Link href={`/(modals)/set/${item["id"]}`} asChild>
          <TouchableOpacity style={styles.setRow}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text className='text-white' style={styles.rowTitle}>{item["title"]}</Text>
                <Text className='text-white' >{item["description"]}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      );
    }

    return (
        <SafeAreaView className="h-full w-full bg-[#1F1F39]">
          <View className="w-full h-1/6 bg-[#3D5CFF] flex items-center justify-center">
            <Text className="font-extrabold text-5xl text-white">Flashcards</Text>
          </View>
            <FlatList
                data={decks}
                renderItem={renderSetRow}
            />
        </SafeAreaView>
    );
}

export default Page;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    setRow: {
      margin: 8,
      padding: 16,
      backgroundColor: '#2F2F42',
      borderRadius: 8,
    },
    rowTitle: {
      fontSize: 16,
      fontWeight: '500',
    },
  });
import { 
  View, 
  StyleSheet, 
  ListRenderItem, 
  FlatList, 
  SafeAreaView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { Text } from "~/components/ui/text";
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';

import { FlashcardDeck } from '@/data/temporary';

const Page = () => {
  const [sets, setSets] = useState<Set[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

    // IMPLEMENT WHEN API IS ADDED
    useEffect(() => {
      loadSets();
    }, []);

    const loadSets = async () => {
        const data = FlashcardDeck
        setSets(data)
    }

    const renderSetRow: ListRenderItem<Set> = ({ item }) => {
      // console.log(item["FlashcardSetId"] + ' ' + item["Title"] )
      return (
        <Link href={`/(modals)/set/${item["FlashcardSetId"]}`} asChild>
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
        <SafeAreaView className="h-full w-full">
          <View className="w-full h-1/6 bg-[#3D5CFF] flex items-center justify-center">
            <Text className="font-extrabold text-5xl">Flashcards</Text>
          </View>
            <FlatList 
                data={sets}
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
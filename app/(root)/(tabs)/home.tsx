import React, {useState, useEffect} from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ListRenderItem,
    StyleSheet,
    FlatList,
    TextInput,
    ScrollView
}
    from "react-native";
import {Text} from "~/components/ui/text";
import {icons} from "@/constants";
import {Redirect, router, Link} from "expo-router";
import CustomButton from "@/components/CustomButton";
import {createDeck, getDeckById, getDecks} from "@/data/api-routes";
import {AxiosError} from "axios";
import { getUser } from '@/components/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Home = () => {
    const [user, setUser] = useState<UserAccountReadOnlyDto>([]);
    const [sets, setSets] = useState<Set[]>([]);
    const [createDropdownState, setCreateDropdownState] = useState(false);
    const [information, setInformation] = useState({
        title: '',
        description: '',
    });

    const [newInformation, setNewInformation] = useState({
        id: '',
        title: '',
        description: '',
    });

    useEffect(() => {
        loadSets();
    }, []);

    const loadSets = async () => {
        //TODO: Sort flashcards based on account id
        try {
            const userSession = await getUser();
            const response = await getDecks();
            const data = response.data;
            console.log(userSession?.user);
            setUser(userSession.user)
            setSets(data)
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError) {
                console.error("Error fetching flashcard decks:", axiosError.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    const onCreateDeck = async () => {
        console.log(information);
        const createdDeck = await createDeck(information);
        console.log(createdDeck.data);
        router.replace(`/(modals)/set/edit/${createdDeck.data["id"]}`);
    };

    const renderSetRow: ListRenderItem<Set> = ({item}) => {
        //console.log(item["FlashcardSetId"] + ' ' + item["Title"] )
        return (
            <Link href={`/(modals)/set/edit/${item["id"]}` } asChild>
                <TouchableOpacity style={styles.setRow}>
                    <View style={{flexDirection: 'row', gap: 10}}>
                        <View style={{flex: 1}}>
                            <Text className='text-white' style={styles.rowTitle}>{item["title"]}</Text>
                            <Text className='text-white'>{item["description"]}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Link>
        );
    }

    return (
        <>
            <SafeAreaView className="h-full w-full">
                <ScrollView style={{flex: 1}}>
                <View className="w-full h-1/2 bg-[#3D5CFF] flex flex-row items-center justify-between">
                    <View className="pl-16">
                        <Text className="font-extrabold text-4xl text-white">Hi {user['firstName']}!</Text>
                        <Text className="font-extrabold text-white">Let's start learning</Text>
                    </View>
                    <View className="pr-10">
                        <TouchableOpacity onPress={() =>
                            router.push('/(root)/(tabs)/profile')
                        }>
                            <Avatar alt="User Avatar" className={"size-16 mx-auto mt-10 mb-5"}>
                                <AvatarImage source={ user['avatarPath'] } />
                                <AvatarFallback>
                                    <Image source={icons.icondefault} />
                                </AvatarFallback>
                            </Avatar>
                        </TouchableOpacity>
                    </View>
                </View>

                <SafeAreaView className=" pt-5 flex items-center">
                    <View
                        className="w-11/12 h-24 bg-[#2F2F42] rounded-3xl shadow-lg elevation-5 flex flex-row items-center justify-between ">
                        <Text className="pl-5 text-3xl text-white">Your Flashcards</Text>
                        <TouchableOpacity onPress={() => setCreateDropdownState(!createDropdownState)}>
                            <Image source={icons.cardplus} tintColor={'white'} className="w-12 h-12 mr-5"/>
                        </TouchableOpacity>
                    </View>
                    {createDropdownState ? (
                        <View className='w-full flex items-center'>
                            <TextInput
                                className="mt-1 w-11/12 rounded-3xl bg-[#FFF]"
                                placeholder="Title"
                                value={information.title}
                                onChangeText={(text) => setInformation({...information, title: text})}
                            />
                            <TextInput
                                className="mt-1 w-11/12 rounded-3xl bg-[#FFF]"
                                multiline
                                numberOfLines={4}
                                placeholder="Description"
                                value={information.description}
                                onChangeText={(text) => setInformation({...information, description: text})}
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

                <Text className="pl-5 pb-5 pt-10 text-3xl text-white">Your Flashcards</Text>
                <SafeAreaView className="mx-10 rounded-3xl bg-[#2F2F42] flex items-center justify-center">
                    <FlatList className="w-full h-full p-5 rounded-3xl shadow-lg flex flex-row"
                        data={sets}
                        renderItem={renderSetRow}
                            
                    />
                </SafeAreaView>
                </ScrollView>
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
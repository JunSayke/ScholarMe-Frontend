import React, {useState} from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {Text} from "~/components/ui/text";
import {Button} from "~/components/ui/button";
import {startSession, useAuth} from "@/components/AuthContext";
import {useRouter} from "expo-router";
import {ThemeToggle} from "@/components/ThemeToggle";
import {StatusBar} from "expo-status-bar";
import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar';
import {H1} from "@/components/ui/typography";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import * as ImagePicker from 'expo-image-picker';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import {updateUserAccount, updateUserPassword} from '@/data/api-routes';
import {UserAccountChangePasswordDto, UserAccountUpdateDto, UserSession} from '@/data/api';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
    const { onLogout, userSession } = useAuth();
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    //Handling change password
    const [showOldPassword, setShowOldPassword] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleChangePassword = async () => {
        try {
            const updatedPassword: UserAccountChangePasswordDto = {
                oldPassword: "",
                newPassword: ""
            };

            if (newPassword) updatedPassword.newPassword = newPassword === confirmNewPassword ? newPassword : '';
            if (oldPassword) updatedPassword.oldPassword = oldPassword;

            console.log(updatedPassword);
            const response = await updateUserPassword(updatedPassword);
            console.log(response)
        } catch (error) {
            console.error('Failed to change password: ', error)
        }
    }

    const handleUpdateProfile = async (updatedProfile: UserAccountUpdateDto, avatar?: File) => {
        try {
            const updatedUser = await updateUserAccount(updatedProfile, avatar);
            console.log('Profile updated successfully:', updatedUser);

            const newUserSession: UserSession = {
                user: updatedUser.data,
                accessToken: userSession?.accessToken || '',
                refreshToken: userSession?.refreshToken || ''
            };

            await startSession(newUserSession);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSignOut = async () => {
        if (onLogout) {
            await onLogout();
            router.replace("/(auth)/signin");
        }
    };

    const uriToFile = async (uri: string, fileName: string): Promise<File> => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    };

    const handleSaveChanges = async () => {
        const updatedProfile: UserAccountUpdateDto = {};

        if (email) updatedProfile.email = email;
        if (firstName) updatedProfile.firstName = firstName;
        if (lastName) updatedProfile.lastName = lastName;

        await handleUpdateProfile(updatedProfile, image ? await uriToFile(image, 'avatar.jpg') : undefined);
    };

    if (!userSession) {
        return null;
    }

    return (
        <ScrollView>
            <View className="flex-row justify-center items-center">
                <H1 className="text-center me-3">Profile</H1>
                <ThemeToggle />
            </View>

            <TouchableOpacity onPress={pickImage}>
                <Avatar alt="User Avatar" className={"size-36 mx-auto mt-10 mb-5"}>
                    <AvatarImage source={{ uri: image || userSession.user.avatarPath }} />
                    <AvatarFallback>
                        <Text>Profile Picture</Text>
                    </AvatarFallback>
                </Avatar>
            </TouchableOpacity>
            <Text className={"text-2xl text-center"}>{userSession.user.username}</Text>
            <Text className={"text-sm text-center"}>{userSession.user.email}</Text>

            <View className={"my-10 max-w-xs mx-auto gap-y-5"}>
                <View className={"gap-y-2"}>
                    <Label>First Name</Label>
                    <Input placeholder={`${userSession.user.firstName}`} value={firstName} onChangeText={setFirstName} />
                </View>
                <View className={"gap-y-2"}>
                    <Label>Last Name</Label>
                    <Input placeholder={`${userSession.user.lastName}`} value={lastName} onChangeText={setLastName} />
                </View>
                <View className={"gap-y-2"}>
                    <Label>Email Address</Label>
                    <Input placeholder={`${userSession.user.email}`} value={email} onChangeText={setEmail} />
                </View>
                <Button onPress={handleSaveChanges}>
                    <Text>Save Changes</Text>
                </Button>
            </View>
            <View className={"max-w-xs mx-auto gap-y-5 mb-24"}>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Text>Change Password</Text>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                                <View className="w-80">
                                    <View className={"gap-y-2"}>
                                    <Label>Old Password</Label>
                                        <View className="flex flex-row items-center">
                                            <Input 
                                                className="w-11/12"
                                                placeholder="8+ Characters"
                                                secureTextEntry={showOldPassword}
                                                onChangeText={setOldPassword}
                                            />
                                            <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
                                                <Ionicons
                                                    name={showOldPassword ? "eye-off" : "eye"}
                                                    size={24}
                                                    color="black"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View className={"gap-y-2"}>
                                        <Label>New Password</Label>
                                        <View className="flex flex-row items-center">
                                            <Input 
                                                className="w-11/12"
                                                placeholder="8+ Characters"
                                                secureTextEntry={showNewPassword}
                                                onChangeText={setNewPassword}
                                            />
                                            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                                                <Ionicons
                                                    name={showNewPassword ? "eye-off" : "eye"}
                                                    size={24}
                                                    color="black"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View className={"gap-y-2"}>
                                        <Label>Confirm Password</Label>
                                        <View className="flex flex-row items-center">
                                            <Input 
                                                className="w-11/12"
                                                placeholder="8+ Characters"
                                                secureTextEntry={showConfirmNewPassword}
                                                onChangeText={setConfirmNewPassword}
                                            />
                                            <TouchableOpacity onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                                                <Ionicons
                                                    name={showConfirmNewPassword ? "eye-off" : "eye"}
                                                    size={24}
                                                    color="black"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onPress={() => {handleChangePassword()}}>
                                    <Text>Submit</Text>
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Button onPress={handleSignOut}>
                    <Text>Sign Out</Text>
                </Button>
            </View>

            <StatusBar backgroundColor={"#1F1F39"} />
        </ScrollView>
    );
};

export default Profile;
import React from "react";
import {Text} from "~/components/ui/text";
import {Button} from "~/components/ui/button";
import {useAuth, useUser} from "@/components/AuthContext";
import {useRouter} from "expo-router";
import {ThemeToggle} from "@/components/ThemeToggle";
import {StatusBar} from "expo-status-bar";
import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar';
import {H1} from "@/components/ui/typography";
import {ScrollView, View} from "react-native";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
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

const Profile = () => {
    const { onLogout } = useAuth();
    const router = useRouter();
    const userSession = useUser();

    const handleSignOut = async () => {
        if (onLogout) {
            await onLogout();
            router.replace("/(auth)/signin");
        }
    };

    const handleChangePassword = () => {

    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-row justify-center items-center">
                <H1 className="text-center me-3">Profile</H1>
                <ThemeToggle />
            </View>

            {userSession && (
                <>
                    <Avatar alt="User Avatar" className={"size-36 mx-auto mt-10 mb-5"}>
                        <AvatarImage source={{ uri: userSession.user.avatarPath }} />
                        <AvatarFallback>
                            <Text>Profile Picture</Text>
                        </AvatarFallback>
                    </Avatar>
                    <Text className={"text-2xl text-center"}>{userSession.user.username}</Text>
                    <Text className={"text-sm text-center"}>{userSession.user.email}</Text>
                </>
            )}
            <View className={"my-10 max-w-xs mx-auto gap-y-5"}>
                <View className={"gap-y-2"}>
                    <Label>First Name</Label>
                    <Input placeholder="First Name" />
                </View>
                <View className={"gap-y-2"}>
                    <Label>Last Name</Label>
                    <Input placeholder="Last Name" />
                </View>
                <View className={"gap-y-2"}>
                    <Label>Email Address</Label>
                    <Input placeholder="Email Address" />
                </View>
                <Button onPress={() => {}}>
                    <Text>Save Changes</Text>
                </Button>
            </View>
            <View className={"max-w-xs mx-auto gap-y-5"}>
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
                                        <Input placeholder="8+ Characters" />
                                    </View>
                                    <View className={"gap-y-2"}>
                                        <Label>New Password</Label>
                                        <Input placeholder="8+ Characters" />
                                    </View>
                                    <View className={"gap-y-2"}>
                                        <Label>Confirm Password</Label>
                                        <Input placeholder="8+ Characters" />
                                    </View>
                                </View>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onPress={() => {}}>
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
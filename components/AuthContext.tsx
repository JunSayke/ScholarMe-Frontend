import React, {createContext, useContext, useEffect, useState} from 'react';
import {signIn, signUp} from '@/data/api-routes';
import api from '@/data/api-service';
import {getItem, removeItem, setItem} from '@/lib/storage/storage';
import {UserAccountSignInDto, UserAccountSignUpDto, UserSession} from '@/data/api';

interface AuthProps {
    userSession?: UserSession | null;
    onRegister?: (userSignUpDto: UserAccountSignUpDto) => Promise<any>;
    onLogin?: (userSignInDto: UserAccountSignInDto) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const SESSION_KEY = 'user_session';
const AuthContext = createContext<AuthProps>({});

// Function to get the user session from storage
export const getUser = async (): Promise<UserSession | null> => {
    const user = await getItem(SESSION_KEY);
    return user ? JSON.parse(user) : null;
};

export const startSession = async (user: UserSession): Promise<void> => {
    if (user.user.avatarPath) {
        user.user.avatarPath = `http://localhost:5000/${user.user.avatarPath.replace(/\\/g, '/')}`;
    }
    console.log("USER AVATAR: ", user.user.avatarPath)
    await setItem(SESSION_KEY, JSON.stringify(user));
}

// Function to remove the user session from storage
export const endSession = async (): Promise<void> => {
    await removeItem(SESSION_KEY);
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
    const [userSession, setUserSession] = useState<UserSession | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            const user = await getUser();
            const token = user ? user.accessToken : null;
            console.log('Authenticated:', user);

            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setUserSession(user)
            }
        };
        loadToken();
    }, []);

    const register = async (userSignUpDto: UserAccountSignUpDto) => {
        return await signUp(userSignUpDto);
    };

    const login = async (userSignInDto: UserAccountSignInDto) => {
        const result = await signIn(userSignInDto);

        const user = result.data;

        console.log('Authenticated:', user);

        setUserSession(user);

        // Set the token in the axios headers
        api.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;

        await startSession(user)

        return result;
    };

    const logout = async () => {
        // Delete token from storage
        await endSession();

        // Update HTTP Headers
        api.defaults.headers.common['Authorization'] = '';

        // Reset auth state
        setUserSession(null)
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        userSession,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
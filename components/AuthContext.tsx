import React, {createContext, useContext, useEffect, useState} from 'react';
import {signIn, signUp} from '@/data/api-routes';
import axios from 'axios';
import {setItem, getItem, removeItem} from '@/lib/storage/storage';
import {UserAccountSignInDto, UserAccountSignUpDto} from '@/data/api';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (userSignUpDto: UserAccountSignUpDto) => Promise<any>;
    onLogin?: (userSignInDto: UserAccountSignInDto) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const SESSION_KEY = 'user_session';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const userSession = await getItem(SESSION_KEY);
            const token = userSession ? JSON.parse(userSession).token : null;
            console.log('Stored:', token);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true,
                });
            }
        };
        loadToken();
    }, []);

    const register = async (userSignUpDto: UserAccountSignUpDto) => {
        try {
            return await signUp(userSignUpDto);
        } catch (e) {
            return {error: true, msg: (e as any).response.data.msg};
        }
    };

    const login = async (userSignInDto: UserAccountSignInDto) => {
        try {
            const result = await signIn(userSignInDto);

            console.log('Authenticated:', result);

            setAuthState({
                token: result.data.token,
                authenticated: true,
            });

            // Set the token in the axios headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await setItem(SESSION_KEY, JSON.stringify(result.data));

            return result;
        } catch (e) {
            return {error: true, msg: (e as any).response.data.msg};
        }
    };

    const logout = async () => {
        // Delete token from storage
        await removeItem(SESSION_KEY);

        // Update HTTP Headers
        axios.defaults.headers.common['Authorization'] = '';

        // Reset auth state
        setAuthState({
            token: null,
            authenticated: false,
        });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
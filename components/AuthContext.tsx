import React, {createContext, useContext, useEffect, useState} from 'react';
import {signIn, signUp} from '@/data/api-routes';
import api from '@/data/api-service';
import {getItem, removeItem, setItem} from '@/lib/storage/storage';
import {UserAccountSignInDto, UserAccountSignUpDto, UserSession} from '@/data/api';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (userSignUpDto: UserAccountSignUpDto) => Promise<any>;
    onLogin?: (userSignInDto: UserAccountSignInDto) => Promise<any>;
    onLogout?: () => Promise<any>;
}

export const SESSION_KEY = 'user_session';
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
            const user = await getItem(SESSION_KEY);
            const token = user ? JSON.parse(user).accessToken : null;
            console.log('Stored JWT:', token);

            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true,
                });
            }
        };
        loadToken();
    }, []);

    const register = async (userSignUpDto: UserAccountSignUpDto) => {
        return await signUp(userSignUpDto);
    };

    const login = async (userSignInDto: UserAccountSignInDto) => {
        const result = await signIn(userSignInDto);

        console.log('Authenticated:', result);

        const user = result.data;

        setAuthState({
            token: user.accessToken,
            authenticated: true,
        });

        // Set the token in the axios headers
        api.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;

        await setItem(SESSION_KEY, JSON.stringify(user));

        return result;
    };

    const logout = async () => {
        // Delete token from storage
        await removeItem(SESSION_KEY);

        // Update HTTP Headers
        api.defaults.headers.common['Authorization'] = '';

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
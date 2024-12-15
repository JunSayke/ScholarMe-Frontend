import api from './api-service';
import {
    ErrorResponse,
    FlashcardChoiceCreateDto,
    FlashcardChoiceReadOnlyDto,
    FlashcardChoiceUpdateDto,
    FlashcardCreateDto,
    FlashcardDeckCreateDto,
    FlashcardDeckReadOnlyDto,
    FlashcardDeckUpdateDto,
    FlashcardReadOnlyDto,
    FlashcardUpdateDto, RefreshTokenRequestDto,
    UserAccountSignInDto,
    UserAccountSignUpDto,
    UserSession
} from './api';
import axios, {AxiosError} from "axios";
import {endSession, getUser, startSession} from "@/components/AuthContext";

// User Accounts
export const signIn = (userSignInDto: UserAccountSignInDto) => api.post<UserSession>('/useraccounts/signin', userSignInDto);
export const signUp = (userSignUpDto: UserAccountSignUpDto) => api.post<UserSession>('/useraccounts/signup', userSignUpDto);

// Decks
export const createDeck = (deckCreateDto: FlashcardDeckCreateDto) => api.post<FlashcardDeckReadOnlyDto>('/flashcards/decks', deckCreateDto);
export const getAllDecks = () => api.get<FlashcardDeckReadOnlyDto[]>('/flashcards/decks/all')
export const getDecks = () => api.get<FlashcardDeckReadOnlyDto[]>('/flashcards/decks');
export const getDeckById = (deckId: string, options?: { includeFlashcards?: boolean }) => {
    const params = new URLSearchParams();
    if (options?.includeFlashcards) {
        params.append('includeFlashcards', 'false');
    }
    return api.get<FlashcardDeckReadOnlyDto>(`/flashcards/decks/${deckId}?${params.toString()}`);
};

export const updateDeck = (deckId: number, deckUpdateDto: FlashcardDeckUpdateDto) => api.put<FlashcardDeckReadOnlyDto>(`/flashcards/decks/${deckId}`, deckUpdateDto);
export const deleteDeck = (deckId: number) => api.delete<void>(`/flashcards/decks/${deckId}`);

// Cards
export const createCard = (deckId: number, cardCreateDto: FlashcardCreateDto) => api.post<FlashcardReadOnlyDto>(`/flashcards/decks/${deckId}/cards`, cardCreateDto);
export const getCards = (deckId: number, options?: { includeChoices?: boolean }) => {
    const params = new URLSearchParams();
    if (options?.includeChoices) {
        params.append('includeChoices', 'false');
    }
    return api.get<FlashcardReadOnlyDto[]>(`/flashcards/decks/${deckId}/cards?${params.toString()}`);
};
export const getCardById = (cardId: number, options?: { includeChoices?: boolean }) => {
    const params = new URLSearchParams();
    if (options?.includeChoices) {
        params.append('includeChoices', 'false');
    }
    return api.get<FlashcardReadOnlyDto>(`flashcards/cards/${cardId}?${params.toString()}`);
}

export const updateCard = (cardId: number, cardUpdateDto: FlashcardUpdateDto) => api.put<FlashcardReadOnlyDto>(`/flashcards/cards/${cardId}`, cardUpdateDto);
export const deleteCard = (cardId: number) => api.delete<void>(`/flashcards/cards/${cardId}`);

// Choices
export const createChoice = (cardId: number, choiceCreateDto: FlashcardChoiceCreateDto) => api.post<FlashcardChoiceReadOnlyDto>(`/flashcards/cards/${cardId}/choices`, choiceCreateDto);
export const getChoices = (cardId: number) => api.get<FlashcardChoiceReadOnlyDto[]>(`/flashcards/cards/${cardId}/choices`);
export const getChoiceById = (choiceId: number) => api.get<FlashcardChoiceReadOnlyDto>(`/flashcards/choices/${choiceId}`);
export const updateChoice = (choiceId: number, choiceUpdateDto: FlashcardChoiceUpdateDto) => api.put<FlashcardChoiceReadOnlyDto>(`/flashcards/choices/${choiceId}`, choiceUpdateDto);
export const deleteChoice = (choiceId: number) => api.delete<void>(`/flashcards/choices/${choiceId}`);

const refreshToken = (refreshToken: RefreshTokenRequestDto) => api.post<UserSession>('/useraccounts/refresh-token', refreshToken);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const axiosError = error as AxiosError;
        const errorResponse = handleAxiosError(axiosError);

        if (errorResponse && errorResponse.status == 401 && errorResponse.detail == "INVALID_ACCESS_TOKEN" && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                let user = await getUser();
                const refreshTokenDto: RefreshTokenRequestDto = {refreshToken: user!.refreshToken}
                const response = await api.post<UserSession>('/useraccounts/refresh-token', refreshTokenDto);
                user = response.data;
                await startSession(user); // start another session
                originalRequest.headers.Authorization = `Bearer ${user.accessToken}`; // attach new jwt token to the current request
                return axios(originalRequest); // recall Api with new token
            } catch (err) {
                const axiosError = error as AxiosError;
                const errorResponse = handleAxiosError(axiosError);

                if (errorResponse && errorResponse.status == 401) {
                    if (errorResponse.detail == "INVALID_REFRESH_TOKEN") {
                        // TODO: Handle invalid refresh token
                        console.log('INVALID_REFRESH_TOKEN: ', err);
                        await endSession(); // end session
                    } else if (errorResponse.detail == "REFRESH_TOKEN_EXPIRED") {
                        // TODO: Handle expired refresh token
                        console.log('REFRESH_TOKEN_EXPIRED: ', err);
                        await endSession(); // end session
                    } else if (errorResponse.detail == "INVALID_ACCESS_TOKEN") {
                        // TODO: Handle invalid access token
                        console.log("INVALID_ACCESS_TOKEN", err)
                        await endSession(); // end session
                    }
                }
            }
        }
        return Promise.reject(error);
    }
);

export const handleAxiosError = (error: AxiosError): ErrorResponse | null => {
    if (error.response && error.response.data) {
        const data = error.response.data as ErrorResponse;
        if (data.title && data.status && data.detail && data.instance) {
            return data;
        }
    }
    return null;
};
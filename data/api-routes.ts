import api from './api-service';
import {
    UserAccountSignInDto,
    UserAccountSignUpDto,
    FlashcardDeckCreateDto,
    FlashcardDeckReadOnlyDto,
    FlashcardDeckUpdateDto,
    FlashcardCreateDto,
    FlashcardReadOnlyDto,
    FlashcardUpdateDto,
    FlashcardChoiceCreateDto,
    FlashcardChoiceReadOnlyDto,
    FlashcardChoiceUpdateDto,
    UserSession
} from './api';

// User Accounts
export const signIn = (userSignInDto: UserAccountSignInDto) => api.post<UserSession>('/useraccounts/signin', userSignInDto);
export const signUp = (userSignUpDto: UserAccountSignUpDto) => api.post<UserSession>('/useraccounts/signup', userSignUpDto);

// Decks
export const createDeck = (deckCreateDto: FlashcardDeckCreateDto) => api.post<FlashcardDeckReadOnlyDto>('/decks', deckCreateDto);
export const getDecks = () => api.get<FlashcardDeckReadOnlyDto[]>('/decks');
export const getDeckById = (deckId: number) => api.get<FlashcardDeckReadOnlyDto>(`/decks/${deckId}`);
export const updateDeck = (deckId: number, deckUpdateDto: FlashcardDeckUpdateDto) => api.put<FlashcardDeckReadOnlyDto>(`/decks/${deckId}`, deckUpdateDto);
export const deleteDeck = (deckId: number) => api.delete<void>(`/decks/${deckId}`);

// Cards
export const createCard = (deckId: number, cardCreateDto: FlashcardCreateDto) => api.post<FlashcardReadOnlyDto>(`/decks/${deckId}/cards`, cardCreateDto);
export const getCards = (deckId: number) => api.get<FlashcardReadOnlyDto[]>(`/decks/${deckId}/cards`);
export const getCardById = (cardId: number) => api.get<FlashcardReadOnlyDto>(`/cards/${cardId}`);
export const updateCard = (cardId: number, cardUpdateDto: FlashcardUpdateDto) => api.put<FlashcardReadOnlyDto>(`/cards/${cardId}`, cardUpdateDto);
export const deleteCard = (cardId: number) => api.delete<void>(`/cards/${cardId}`);

// Choices
export const createChoice = (cardId: number, choiceCreateDto: FlashcardChoiceCreateDto) => api.post<FlashcardChoiceReadOnlyDto>(`/cards/${cardId}/choices`, choiceCreateDto);
export const getChoices = (cardId: number) => api.get<FlashcardChoiceReadOnlyDto[]>(`/cards/${cardId}/choices`);
export const getChoiceById = (choiceId: number) => api.get<FlashcardChoiceReadOnlyDto>(`/choices/${choiceId}`);
export const updateChoice = (choiceId: number, choiceUpdateDto: FlashcardChoiceUpdateDto) => api.put<FlashcardChoiceReadOnlyDto>(`/choices/${choiceId}`, choiceUpdateDto);
export const deleteChoice = (choiceId: number) => api.delete<void>(`/choices/${choiceId}`);
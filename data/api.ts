//
// INTERFACES
//
// export interface FlashcardDeck {
//
// }
//
// export interface Flashcard {
//
// }
//
// export interface Choice {
//
// }


// Flashcard DTOs
export interface FlashcardCreateDto {
    question: string;
}

export interface FlashcardReadOnlyDto {
    id: string;
    flashcardSetId: string;
    question: string;
    choices: FlashcardChoiceReadOnlyDto;
    createdAt: Date;
    updatedAt: Date;
}

export interface FlashcardUpdateDto {
    flashcardSetId?: string;
    question?: string;
}

// FlashcardChoice DTOs
export interface FlashcardChoiceCreateDto {
    choice: string;
    isAnswer: boolean;
}

export interface FlashcardChoiceReadOnlyDto {
    id: string;
    flashcardId?: string;
    choice: string;
    isAnswer: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface FlashcardChoiceUpdateDto {
    choice?: string;
    isAnswer?: boolean;
}

// FlashcardDeck DTOs
export interface FlashcardDeckCreateDto {
    id: string;
    title: string;
    description: string;
}

export interface FlashcardDeckReadOnlyDto {
    id: string;
    userAccountId: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface FlashcardDeckUpdateDto {
    title?: string;
    description?: string;
}

// UserAccount DTOs
export interface UserAccountChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}

export interface UserAccountReadOnlyDto {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    avatarPath?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserAccountSignInDto {
    username: string;
    password: string;
}

export interface UserAccountSignUpDto {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
}

export interface UserAccountUpdateDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}

// ProfileAvatarDto
export interface ProfileAvatarDto {
    avatar: File;
}

// UserAccountChangePasswordDto
export interface UserAccountChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}

// ProfileAvatarReadOnlyDto
export interface ProfileAvatarReadOnlyDto {
    filePath: string;
}

export interface UserSession {
    accessToken: string;
    refreshToken: string;
    user: UserAccountReadOnlyDto;
}

export interface RefreshTokenRequestDto {
    refreshToken: string;
}

export interface ErrorResponse {
    title: string;
    status: number;
    detail: string;
    instance: string;
    // errors are populated when the server returns model validation errors
    errors?: {
        [key: string]: string[];
    };
}
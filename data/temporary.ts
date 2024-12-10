//
// INTERFACES
//
export const UserAccount = [
    {
        "UserId": 1,
        "Username": "Cher",
        "Email": "cher@gmail.com",
        "Password": "cherpassword",
        "FirstName": "Teach",
        "LastName": "Cher",
        "PhoneNumber": "01234567890",
        "ProfilePic": null,
        "Role": "Teacher",
        "Status": "Active",
    },
    {
        "UserId": 2,
        "Username": "Perpy",
        "Email": "perpy@gmail.com",
        "Password": "perpypassword",
        "FirstName": "Van",
        "LastName": "Perpetua",
        "PhoneNumber": "01234567890",
        "ProfilePic": null,
        "Role": "Student",
        "Status": "Active",
    },
    {
        "UserId": 3,
        "Username": "Junsayke",
        "Email": "junsayke@gmail.com",
        "Password": "junsaykepassword",
        "FirstName": "Tonio",
        "LastName": "Ubaldo",
        "PhoneNumber": "01234567890",
        "ProfilePic": null,
        "Role": "Student",
        "Status": "Active",
    },
    {
        "UserId": 4,
        "Username": "Modarku",
        "Email": "modarku@gmail.com",
        "Password": "modarkupassword",
        "FirstName": "Jian",
        "LastName": "Olamit",
        "PhoneNumber": "01234567890",
        "ProfilePic": null,
        "Role": "Student",
        "Status": "Inactive",
    },
]
  
export const FlashcardDeck = [
    {
        "FlashcardSetId": 1,
        "UserId": 2,
        "UserAccount": UserAccount[1],
        "Title": "Lawyer Things",
        "Description": "I wanna be the very best.",
    },
    {
        "FlashcardSetId": 2,
        "UserId": 3,
        "UserAccount": UserAccount[2],
        "Title": "Secrets to React Native",
        "Description": "I wanna be the native best.",
    },
    {
        "FlashcardSetId": 3,
        "UserId": 4,
        "UserAccount": UserAccount[3],
        "Title": "The Art of Dropping Out",
        "Description": "I don't wanna be the very best.",
    },
]

//connector between flashcard deck and flashcard
export const FlashcardSetFlashcards = [
    {
        "FlashcardSetFlashcardId": 1,
        "FlashcardSetId": 1,
        "FlashcardSet": FlashcardDeck[0],
        "FlashcardId": 1,
        "Flashcard": FlashcardDeck[0],
    },
    {
        "FlashcardSetFlashcardId": 2,
        "FlashcardSetId": 1,
        "FlashcardSet": FlashcardDeck[1],
        "FlashcardId": 2,
        "Flashcard": FlashcardDeck[1],
    },
    {
        "FlashcardSetFlashcardId": 3,
        "FlashcardSetId": 2,
        "FlashcardSet": FlashcardDeck[1],
        "FlashcardId": 3,
        "Flashcard": FlashcardDeck[2],
    },
    {
        "FlashcardSetFlashcardId": 4,
        "FlashcardSetId": 3,
        "FlashcardSet": FlashcardDeck[2],
        "FlashcardId": 4,
        "Flashcard": FlashcardDeck[3],
    },
]

export const Flashcards = [
    {
        "FlashcardId": 1,
        "UserId": 2,
        "UserAccount": UserAccount[1],
        "Question": "Which company/person bought InfoWars from an auction?",
    },
    {
        "FlashcardId": 2,
        "UserId": 2,
        "UserAccount": UserAccount[1],
        "Question": "What song did Drake file a lawsuit for 'defamation'?",
    },
    {
        "FlashcardId": 3,
        "UserId": 3,
        "UserAccount": UserAccount[2],
        "Question": "What is the console command to run project using expo?",
    },
    {
        "FlashcardId": 4,
        "UserId": 4,
        "UserAccount": UserAccount[3],
        "Question": "Will you drop out?",
    },
]

export const FlashcardChoices = [
    {
        "FlashcardChoiceId": 1,
        "FlashcardId": 1,
        "Flashcard": Flashcards[0],
        "Choice": "Elon Musk",
        "IsAnswer": false,
    },
    {
        "FlashcardChoiceId": 2,
        "FlashcardId": 1,
        "Flashcard": Flashcards[0],
        "Choice": "The Onion",
        "IsAnswer": true,
    },
    {
        "FlashcardChoiceId": 3,
        "FlashcardId": 2,
        "Flashcard": Flashcards[1],
        "Choice": "Not Like Us",
        "IsAnswer": true,
    },
    {
        "FlashcardChoiceId": 4,
        "FlashcardId": 2,
        "Flashcard": Flashcards[1],
        "Choice": "Story of Adidon",
        "IsAnswer": false,
    },
    {
        "FlashcardChoiceId": 5,
        "FlashcardId": 3,
        "Flashcard": Flashcards[2],
        "Choice": "npx expo runserver",
        "IsAnswer": false,
    },
    {
        "FlashcardChoiceId": 6,
        "FlashcardId": 3,
        "Flashcard": Flashcards[2],
        "Choice": "npx expo start",
        "IsAnswer": true,
    },
    {
        "FlashcardChoiceId": 7,
        "FlashcardId": 4,
        "Flashcard": Flashcards[3],
        "Choice": "YESSSS",
        "IsAnswer": false,
    },
    {
        "FlashcardChoiceId": 8,
        "FlashcardId": 4,
        "Flashcard": Flashcards[3],
        "Choice": "No",
        "IsAnswer": true,
    },
]
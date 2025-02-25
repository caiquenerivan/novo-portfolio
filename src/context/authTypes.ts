// src/context/authTypes.ts
export interface User {
    id: number;
    username: string;
}

export interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}
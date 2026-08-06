// src/context/authTypes.ts
export interface User {
    username: string;
    role: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User) => void;
    logout: () => void;
}
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface User {
    // Define user properties based on your data structure
    name: string;
    email: string;
    mobile?: string;
    id?: string;
    isAuthenticated?: boolean;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create a context with a default undefined value
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for consuming the context. This is a best practice.
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};


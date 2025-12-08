import { createContext, useContext, useState } from "react";

export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    is_admin: boolean;
}

interface AuthorizationContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export const AuthorizationContext = createContext<AuthorizationContextType | null>(null);

export const useAuthContext = (): AuthorizationContextType => {
    const context = useContext(AuthorizationContext);
    if (!context)
        throw new Error('AuthorizationContext not found!');
    return context;
};

const AuthContext = ({children}: any) => {
    const [user, setUser] = useState<User | null>(null);
    
    const login = (userThatLoggedIn: User) => {
        console.log('user spotted: ', userThatLoggedIn);
        setUser(userThatLoggedIn);
        console.log(user);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthorizationContext.Provider value={{user, login, logout}}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export default AuthContext;


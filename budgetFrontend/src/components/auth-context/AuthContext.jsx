// https://dev.to/dayvster/use-react-context-for-auth-288g
// Creating a client-side context for user is not secure but useful for demonstration purposes.

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem("user"))
    );

    // keep localStorage in sync
    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [user]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
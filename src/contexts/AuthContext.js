import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // Check if user is logged in on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);
    // Mock login function (replace with real auth in production)
    const login = async (email, password) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Mock validation - in real app this would verify with a backend
        if (email && password.length >= 6) {
            const newUser = {
                id: Math.random().toString(36).substr(2, 9),
                email,
                firstName: "Demo",
                lastName: "User",
            };
            // Save to localStorage for persistence
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);
        }
        else {
            throw new Error("Invalid credentials");
        }
    };
    // Mock signup function (replace with real auth in production)
    const signup = async (email, password, firstName, lastName) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // In a real app, this would create a user in the database
        // For demo, we'll just pretend it worked if the data is valid
        if (email && password.length >= 6 && firstName && lastName) {
            return;
        }
        else {
            throw new Error("Invalid user data");
        }
    };
    // Logout function
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            signup,
            logout,
        }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

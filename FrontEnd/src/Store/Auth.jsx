import { createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null); // Initialize user state to null

    // Store JWT token in local storage
    const storeTokenInLocalStorage = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken); // Update token state
    };

    let isLoggedIn = !!token;
    console.log("isLoggedIn",isLoggedIn);

    // Logout user
   // Logout user
    const logoutUser = () => {
        setToken(""); // Clear token state
        setUser(null); // Clear user state
        localStorage.removeItem("token");
    };


    // JWT authentication - get the currently logged-in user data
    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:3030/User/UserInfo", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}` 
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
            } else {
                setUser(null); // Clear user state if fetch fails
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null); // Clear user state on error
        }
    };

    useEffect(() => {
        if (token) {
            userAuthentication(); // Call userAuthentication only if token is available
        }
    }, [token]); // useEffect dependency on token

    return (
        <AuthContext.Provider value={{ storeTokenInLocalStorage, logoutUser, user , isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

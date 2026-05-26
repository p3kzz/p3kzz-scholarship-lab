import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const data = await getMe(token);

                setUser(data);
            } catch (error) {
                console.error(error);

                localStorage.removeItem("token");

                setToken(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);

        setToken(newToken);
    };

    const logout = () => {
    localStorage.removeItem("token")

    setToken(null)
    setUser(null)
}

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
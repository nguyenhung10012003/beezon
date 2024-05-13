import {createContext, useContext, useState} from "react";
import axiosClient from "../api";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

    const signIn = async (username, password) => {
        try {
            const user = await axiosClient.post("/sign-in", {username, password});
            if (user) {
                setUser(user['_id']);
                localStorage.setItem("user", JSON.stringify(user['_id']));
            }
        } catch (e) {
            throw e;
        }
    }

    const signOut = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
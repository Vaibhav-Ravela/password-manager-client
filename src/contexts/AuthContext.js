import { createContext, useState, useContext } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const usernameAvailability = async (username) => {
        try {
            // const requestData = { username };
            // const response = await axios.post('', requestData);
            // return response.data.isAvailable;
            return true;
        } catch (err) {
            throw err;
        }
    };

    const register = async (username, password) => {
        try {
            // const requestData = {
            //     username,
            //     password,
            // };
            // const response = await axios.post('', requestData);
            // const authToken = response.data.token;
            sessionStorage.setItem('authToken', username + password);
        } catch (err) {
                throw err;
        }
    };

    const login = async (username, password) => {
        try {
            // const requestData = {
            //     username,
            //     password,
            // };
            // const response = await axios.post('', requestData);
            // const responeData = response.data
            // if (responeData.isSuccess) {
            //     const authToken = responseData.token;
                sessionStorage.setItem('authToken', username + password);
                return { isSuccess: true };
            // } else {
            //     return responeData;
            // }
        } catch (err) {
                throw err;
        }
    };

    const logout = () => {
        sessionStorage.removeItem('authToken');
    };

    const values = {
        isLoading,
        usernameAvailability,
        register,
        login,
        logout,
    };
    
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    ); 
};

export const useAuth = () => {
    return useContext(AuthContext);
};
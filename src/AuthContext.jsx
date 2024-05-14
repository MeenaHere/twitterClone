// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


axios.defaults.baseURL = "http://localhost:4000";


const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/username', { withCredentials: true });
                if (response.data.success) {
                    setAuth({ user: response.data.user });
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };

        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/users/login', { username, password }, { withCredentials: true });
            if (response.status === 200) {
                setAuth({ user: response.data.user });
            }
            return response;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    };

    const logout = () => {
        axios.post('/users/logout', {}, { withCredentials: true }).then(() => {
            setAuth({ user: null });
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

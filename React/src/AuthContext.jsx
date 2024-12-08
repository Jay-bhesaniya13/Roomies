// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        username: sessionStorage.getItem('username') || '',
        token: sessionStorage.getItem('token') || ''
    });

    const login = (username, token) => {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('token', token);
        setAuthData({ username, token });
    };

    const logout = () => {
        sessionStorage.clear();
        setAuthData({ username: '', token: '' });
    };

    useEffect(() => {
        // Load session data when the app initializes
        const storedUsername = sessionStorage.getItem('username');
        const storedToken = sessionStorage.getItem('token');

        if (storedUsername && storedToken) {
            setAuthData({ username: storedUsername, token: storedToken });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

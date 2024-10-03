// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { findUserByID } from './../database/helpers';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);



    useEffect(() => {
        const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
        const userId = localStorage.getItem('userId') !== 'undefined' ? localStorage.getItem('userId') : null;

        setIsAuthenticated(loggedIn);
        setUserId(userId)
    }, []);

    const login = (userId) => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', userId);
        setUserId(userId)
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userId');
        setUserId(null)
    };
    const handleLogin = (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let DBuser = await findUserByID(userId);
                setUser(DBuser);
                resolve()


            } catch (err) {
                console.log('err in handleLogin', err);

                // await handleLogout();
                reject();
            }
        });
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, handleLoginInDB: handleLogin, user, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

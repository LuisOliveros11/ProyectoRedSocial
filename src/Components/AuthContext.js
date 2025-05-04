import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userData, setUserData] = useState(null);

  //Se carga el token guardado cada vez que se inicia la app
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          setAuthToken(token);
          //Se decodifica el token para obtener los datos que vienen con el (id y email del usuario)
          const decoded = jwt_decode(token);
          setUserData(decoded);
        }
      } catch (error) {
        console.error('Error. No se pudo cargar el token desde AsyncStorage', error);
      }
    };
    loadToken();
  }, []);

  const login = async (token) => {
    setAuthToken(token);
    await AsyncStorage.setItem('authToken', token);
    const decoded = jwt_decode(token);
    setUserData(decoded);
  };

  const logout = async () => {
    setAuthToken(null);
    setUserData(null);
    await AsyncStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

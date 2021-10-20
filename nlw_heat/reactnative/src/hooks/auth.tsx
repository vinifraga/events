import React, { useContext, createContext, useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIENT_ID = '2a49e57ca397c6ef0bfd';
const SCOPE = 'read:user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: React.ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  
  async function signIn() {
    try {
      setIsSigningIn(true);
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const response = await AuthSession.startAsync({ authUrl });

      if (response.type === 'success' && response.params.error !== "access_denied") {
        const authResponse = await api.post<AuthResponse>('/authenticate', { code: response.params.code });
        const { token, user } = authResponse.data;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token));

        setUser(user);
      }      
    } catch (error) {
      console.log('error signIn', error)
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.multiRemove([USER_STORAGE, TOKEN_STORAGE]);
  }

  useEffect(() => {
    try {
      async function loadUserStoragedData() {
        const [[, userStorage], [, tokenStorage]] = await AsyncStorage.multiGet([USER_STORAGE, TOKEN_STORAGE]);

        if (userStorage && tokenStorage) {
          api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(tokenStorage)}`;
          setUser(JSON.parse(userStorage));
        }
      }
  
      loadUserStoragedData();
    } catch (error) {
      console.log('error useEffect', error);
    } finally {
      setIsSigningIn(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isSigningIn,
      user,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };

import { auth } from "@/app/firebase/config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextData {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try{
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    }catch(error: any){
      console.error('Erro ao fazer login', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string)=>{
      try{
        createUserWithEmailAndPassword(auth, email, password);
        setIsAuthenticated(true);
      }catch(error: any){
        console.error('Erro ao fazer cadastro', error);
        throw error;
      }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error: any) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signUp, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

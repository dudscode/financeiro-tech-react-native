import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthFirebaseRepository } from '@/infra/firebase/AuthFirebaseRepository';
import { RegisterUseCase } from '@/domain/useCases/auth/RegisterUseCase';
import { LogoutUseCase } from '@/domain/useCases/auth/LogoutUseCase';
import { LoginUseCase } from '@/domain/useCases/auth/LoginUseCase';
import { ObserveAuthStateUseCase } from '@/domain/useCases/auth/ObserveAuthStateUseCase';

interface AuthContextData {
  isAuthenticated: boolean;
  userEmail: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

const authRepository = new AuthFirebaseRepository();

const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);
const observeAuthStateUseCase = new ObserveAuthStateUseCase(authRepository);

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = observeAuthStateUseCase.execute(user => {
      setIsAuthenticated(!!user);
      setUserEmail(user?.email ?? null);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await loginUseCase.execute({ email, password });

      setIsAuthenticated(true);
    } catch (error: any) {
      console.error('Erro ao fazer login', error);
      throw error;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const user = await registerUseCase.execute({ email, password, displayName: name });

      setIsAuthenticated(true);
    } catch (error: any) {
      console.error('Erro ao fazer cadastro', error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await logoutUseCase.execute();
      setIsAuthenticated(false);
      setUserEmail(null);
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  const contextValue = React.useMemo(
    () => ({ isAuthenticated, userEmail, signIn, signUp, signOutUser }),
    [isAuthenticated, userEmail, signIn, signUp, signOutUser]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

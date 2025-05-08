import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

export const useBalanceCard = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentDate, setCurrentDate] = useState('');

  const { userEmail, signOutUser } = useAuth();

  useEffect(() => {
    setCurrentDate(formatCurrentDate());
  }, []);

  function formatCurrentDate() {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    };
    return new Date().toLocaleDateString('pt-BR', options);
  }

  const getUserName = () => {
    if (userEmail) {
      return userEmail.split('@')[0];
    }
    return 'Usuário';
  };

  const handleLogout = async () => {
    await signOutUser();
    router.replace('/login');
  };

  return {
    isVisible,
    currentDate,
    getUserName,
    handleLogout,
    setIsVisible,
  };
};

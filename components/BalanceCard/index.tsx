import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import { useIsTablet } from '@/hooks/useIsTablet';
import { useBalanceCard } from '@/hooks/useBalanceCard';

interface BalanceCardProps {
  saldo: number;
  loading?: boolean;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ saldo, loading }) => {
  const { isVisible, currentDate, getUserName, handleLogout, setIsVisible } = useBalanceCard();
  const isTablet = useIsTablet();
  const { formatarValor } = useCurrencyFormatter();

  return (
    <View style={[styles.container, isTablet && styles.tabletContainer]}>
      <TouchableOpacity onPress={handleLogout} style={{ position: 'absolute', top: 10, right: 10 }}>
        <MaterialIcons name="logout" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {getUserName()}! :)</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>

      <View style={styles.balanceContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View style={styles.balance}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceTitle}>Saldo</Text>
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={styles.icon}>
                <MaterialIcons
                  name={isVisible ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.balanceLine} />
            <Text style={styles.accountType}>Conta Corrente</Text>
            <Text style={styles.balanceAmount}>{isVisible ? formatarValor(saldo) : '****'}</Text>
          </View>
        )}
      </View>

      <>
        <Image source={require('../../assets/images/top-mobile.png')} style={styles.imageTopEdge} />
        <Image
          source={require('../../assets/images/bottom-mobile.png')}
          style={styles.imageBottomEdge}
        />
        <Image
          source={require('../../assets/images/person-with-coin.png')}
          style={styles.imagePerson}
        />
      </>
    </View>
  );
};

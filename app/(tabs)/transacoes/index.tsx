import { View } from 'react-native';
import React from 'react';
import { styles } from './styles';

import ContainerView from '@/components/ContainerView';
import { BalanceCard } from '@/components/BalanceCard';
import { NewTransactions } from '@/components/NewTransactions';
import { useExtrato } from '@/hooks/useExtrato';

export default function TabTwoScreen() {
  const { saldo } = useExtrato();

  return (
    <ContainerView>
      <View style={styles.titleContainer}>
        <BalanceCard saldo={saldo} loading={false} />
      </View>
      <NewTransactions />
    </ContainerView>
  );
}

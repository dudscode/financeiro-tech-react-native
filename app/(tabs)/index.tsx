import React from 'react';
import { StyleSheet, View } from 'react-native';

import ContainerView from '@/components/ContainerView';
import { ThemedText } from '@/components/ThemedText';
import { BalanceCard } from '@/components/BalanceCard';

import { useExtrato } from '@/hooks/useExtrato';
import ChartComponent from '@/components/chart-invest/chartComponent';

export default function HomeScreen() {
  const { saldo } = useExtrato();

  return (
    <ContainerView>
      <View style={styles.titleContainer}>
        <BalanceCard saldo={saldo} loading={false} />
      </View>
      <View style={styles.chartContainer}>
        <ThemedText type="title" style={styles.titleChart}>
          Sua evolução financeira
        </ThemedText>
        <ChartComponent />
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 60,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  summaryContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  chartContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  titleChart: {
    fontSize: 24,
    marginBottom: 12,
  },
});

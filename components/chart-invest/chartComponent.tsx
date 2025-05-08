import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useExtrato } from '@/hooks/useExtrato';

import { ThemedText } from '../ThemedText';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';

const ChartComponent = () => {
  const { totalReceitas, totalDespesas, saldo } = useExtrato();
  const { formatarValor } = useCurrencyFormatter();

  const chartData = [
    {
      name: 'Receitas',
      population: totalReceitas,
      color: '#47a138',
    },
    {
      name: 'Gastos',
      population: Math.abs(totalDespesas),
      color: '#d50a0a',
    },
  ];
  if (!totalDespesas && !totalReceitas && !saldo) {
    return (
      <View style={styles.container}>
        <ThemedText type="primary" style={styles.emptyListMessage}>
          Sem transações
        </ThemedText>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <PieChart
        data={chartData}
        width={300}
        height={320}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        hasLegend={false}
        backgroundColor="transparent"
        paddingLeft="0"
        center={[80, 30]}
      />

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#47a138' }]} />

          <ThemedText type="info" style={styles.legendText}>
            Receitas: {formatarValor(totalReceitas)}
          </ThemedText>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#d50a0a' }]} />
          <ThemedText type="info" style={styles.legendText}>
            Gastos: {formatarValor(totalDespesas)}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  legendContainer: {
    display: 'flex',
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  legendItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  },
  emptyListMessage: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ChartComponent;

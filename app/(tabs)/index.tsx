import {  StyleSheet, View } from 'react-native';


import ContainerView from '@/components/ContainerView';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  return (
    <ContainerView>
          <View style={styles.titleContainer}>
            <ThemedText type="title">Balance Card</ThemedText>
          </View>
          <View style={styles.titleContainer}>
            <ThemedText type="title">Investimentos</ThemedText>
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
  }
});

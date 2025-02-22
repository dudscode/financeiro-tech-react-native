import { StyleSheet, View } from 'react-native';

import ContainerView from '@/components/ContainerView';
import { ThemedText } from '@/components/ThemedText';

export default function TabTwoScreen() {
  return (
    <ContainerView>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Balance Card</ThemedText>
      </View>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Transacoes</ThemedText>
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    color: 'white',
    marginTop: 60,
  },
});

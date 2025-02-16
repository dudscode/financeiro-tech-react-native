import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
const HEADER_HEIGHT = 0;

export default function ContainerView({
  children
}: any) {
  return (
    <ThemedView style={styles.container} >
        <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: HEADER_HEIGHT,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});

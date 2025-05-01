import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
const HEADER_HEIGHT = 0;

export default function ContainerView({ children }: any) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const bottom = useBottomTabOverflow();
  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
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
    padding: 24,
    gap: 16,
    overflow: 'hidden',
  },
});

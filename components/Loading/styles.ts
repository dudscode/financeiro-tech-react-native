import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 48,
    height: 48,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 12,
    height: 12,
    position: 'relative',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
    position: 'absolute',
  },
  dot1: {
    left: -18,
  },
  dot2: {
    left: 0,
  },
  dot3: {
    left: 18,
  },
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: -1,
  },
  imageRotate: {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: -1,
    transform: [{ rotate: '180deg' }],
  },
  view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    position: 'relative',
    backgroundColor: '#cbcbcb',
    width: '100%',
    padding: 32,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#dee9ea',
  },
});

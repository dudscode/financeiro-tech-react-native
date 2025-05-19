import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
  },
  text: { fontSize: 16, fontWeight: 'bold', color: '#dee9ea' },
  darkText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004d61',
  },
  button: {
    backgroundColor: '#004d61',
    borderRadius: 8,
    width: '100%',
    margin: 'auto',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 4,
    minWidth: 100,
    textAlign: 'center',
    padding: 15,
    maxWidth: '100%',
  },
  pickerContainer: {
    backgroundColor: '#FFF',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    color: '#000',
  },
});

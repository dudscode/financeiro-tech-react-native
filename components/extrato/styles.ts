import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 38,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleItem: {
    marginBottom: 10,
  },
  containerList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 90,
  },
  item: {
    flexDirection: 'column',
    gap: 6,
    width: '100%',
    paddingRight: 0,
  },
  divider: {
    width: '70%',
    marginTop: 8,
    borderColor: '#3d8630',
    borderWidth: 1,
    backgroundColor: '#47A138',
    marginBottom: 24,
  },
  deleteAction: {
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 80,
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  editAction: {
    position: 'absolute',
    top: 0,
    right: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#484949',
    width: 80,
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  buttonActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 8,
  },
  modalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#47A138',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
  },
  closeModalButtonText: {
    color: 'white',
  },
  closeModalContainer: {
    display: 'flex',
    alignContent: 'flex-end',
    flexWrap: 'wrap',
  },
});

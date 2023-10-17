import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#E4F4E6',
    borderWidth: 1,
    borderRadius: 10,
    margin: 2,
    padding: 10,
    height: 70,
    justifyContent: 'center'
},
text: {
    fontSize: 16,
    fontStyle:'normal',
    color: '#333',
  },
containerProductDetalis: { flex: 1, justifyContent: 'flex-start' },
    row: {
    margin: 5,
    padding: 5,
    flexDirection: 'row',
    }, 
label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
     marginTop: 20,
    },
containerAddEdit: {
    flex: 1,
    justifyContent: 'center',
},
rowAddEdit: {
    flexDirection: 'row',
    height: 30,
    margin: 10,
  },
labelAddEdit: {
    fontWeight: 'bold',
    width: 100,
  },
inputAddEdit: {
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
    marginBottom: 10,
    marginTop:10,
    marginLeft: 10,
  },
    searchInput: {
    flex: 1,
    marginBottom: 10,
    marginTop:10,
  },  
});

export default globalStyles;
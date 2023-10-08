// Importerer nødvendige moduler
import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import {useEffect, useState} from "react";

// Importer firebase
import { getDatabase, ref, remove } from "firebase/database";

// Definerer en funktionskomponent kaldet ProductDetails, der tager route og navigation som props
function ProductDetails ({route,navigation}){
    const [product,setProduct] = useState({});

    // Bruger useEffect til at køre kode, når komponenten vises på skærmen
    useEffect(() => {
        // Henter produktværdier fra route.params og opdaterer 'product'-state med dem
        setProduct(route.params.product[1]);

        // Returnerer en funktion, der tømmer 'product'-state, når komponenten vises på skærmen
        return () => {
            setProduct({})
        }
    });

    // Funktionen 'handleEdit' navigerer til redigeringsskærmen og sender produktdata med
    const handleEdit = () => {
        const product = route.params.product
        navigation.navigate('Edit Product', { product });
    };

     // Funktionen 'confirmDelete' viser en bekræftelsesmeddelelse for sletning
    const confirmDelete = () => {
        // Tjekker om det er på en mobilplatform (iOS eller Android)
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the product?', [
                { text: 'Cancel', style: 'cancel' },
                // Ved tryk på 'Delete' udføres 'handleDelete' funktionen
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Funktionen 'handleDelete' sletter produktet fra databasen
    const handleDelete = async () => {
        const id = route.params.product[0];
        const db = getDatabase();
        // Definerer stien til det specifikke produkt, der skal fjernes
        const productRef = ref(db, `Products/${id}`);
        
        // Bruger 'remove' funktionen til at slette produktet.
        await remove(productRef)
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    };

    // Hvis der ikke er produktdata, vises en tekst, der siger "No data"
    if (!product) {
        return <Text>No data</Text>;
    }

    // Returnerer JSX for produktets detaljeside.
    return (
        <View style={styles.container}>
            {
                Object.entries(product).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Product keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Product values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
            <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={ () => handleEdit()} />
                <Button title="Delete" onPress={() => confirmDelete()} />
            </View>
        </View>
    );
}

// Eksporterer ProductDetails-komponenten
export default ProductDetails;

// Definerer designet
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
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
        marginTop: 20,}
});
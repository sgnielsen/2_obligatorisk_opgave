// Importerer nødvendige moduler
import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useEffect, useState} from "react";
import globalStyles from '../GlobalStyles';

// Importerer firebase
import { getDatabase, ref, onValue } from "firebase/database";

// Definerer en funktionskomponent som tager navigation som props
function ProductList({navigation}){

    // Opretter en lokal statevariabel 'products' ved hjælp af useState
    const [products,setProducts] = useState()

    // Bruger useEffect til at køre kode, når komponenten vises på skærmen
    useEffect(() => {
        // Opretter en databaseforbindelse ved hjælp af getDatabase.
        const db = getDatabase();
        // Opretter en reference til 'Products' i databasen.
        const productsRef = ref(db, "Products");
    
        // Bruger 'onValue' til at lytte efter ændringer i 'Products'
        onValue(productsRef, (snapshot) => {
            // Henter data fra snapshot.
            const data = snapshot.val();
            if (data) {
                // Hvis der er data, opdateres 'products'-state med data.
                setProducts(data);
            }
        });
    
        // Returnerer en funktion, der fjerner lytteren, når komponenten fjernes.
        return () => {
            // Afslutter lytteren ved at kalde 'off' på productsRef.
            off(productsRef);
        };
    }, []); // Den tomme afhængighedsarray betyder, at denne effekt kun køres én gang. 

    // Hvis der ikke er nogen produkter, vises en loading-tekst.
    if (!products) {
        return <Text>Loading...</Text>;
    }

    // Funktionen 'handleSelectProduct' navigerer til produktets detaljeside baseret på produktets ID.
    const handleSelectProduct = id => {
        const product = Object.entries(products).find( product => product[0] === id /*id*/)
        navigation.navigate('Product Details', { product });
    };
    
    // FlatList forventer et array, derfor konverteres objektets values til et array.
    const productArray = Object.values(products);
    const productKeys = Object.keys(products);

    return (
        // FlatList bruges til at vise produktlisten.
        <FlatList
            data={productArray}
            // ProductKeys bruges til at finde ID på product og returnerer dette som key, og giver det med som ID til ProductListItem
            keyExtractor={(item, index) => productKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={globalStyles.container} onPress={() => handleSelectProduct(productKeys[index])}>
                        <Text>
                            {item.vare} - udløbsdato: {item.udløbsdato}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

// Eksporterer ProductList-komponenten.
export default ProductList;
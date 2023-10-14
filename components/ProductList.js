import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState } from "react";
import globalStyles from '../GlobalStyles';
import { getDatabase, ref, onValue, off } from "firebase/database";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importer Ionicons

function ProductList({ navigation }) {
    const [products, setProducts] = useState();
    const [searchText, setSearchText] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const productsRef = ref(db, "Products");

        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setProducts(data);
                setFilteredProducts(data); // Start med at vise alle produkter
            }
        });

        return () => {
            off(productsRef);
        };
    }, []);

    const handleSelectProduct = id => {
        const product = Object.entries(products).find(product => product[0] === id);
        navigation.navigate('Product Details', { product });
    };

    // Opdater filteret produkter, når søgeteksten ændres
    useEffect(() => {
        if (products) {
            const filtered = Object.values(products).filter(item =>
                item.vare.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchText, products]);

    return (
        <View>
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <Ionicons name="search" size={20} color="#333" style={globalStyles.searchIcon} />
            <TextInput
                style={[globalStyles.searchInput]}
                placeholder="Søg efter produkter"
                onChangeText={text => setSearchText(text)}
                value={searchText}
                />
            </View>

            {filteredProducts.length === 0 ? (
                <Text>Ingen produkter fundet.</Text>
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={globalStyles.container}
                            onPress={() => handleSelectProduct(Object.keys(products)[index])}
                        >
                            <Text>
                                {item.vare} - udløbsdato: {item.udløbsdato}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

export default ProductList;

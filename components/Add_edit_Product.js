// Importerer nødvendige moduler
import * as React from 'react';
import {View,Text,StyleSheet,TextInput,Button,Alert,ScrollView,SafeAreaView,} from 'react-native';
import {useEffect, useState} from "react";

// Importerer firebase
import { getDatabase, ref, child, push, update  } from "firebase/database";

// Definerer en funktionskomponent kaldet Add_edit_Product, der tager navigation og route som props
function Add_edit_Product({navigation,route}){

    // Opretter en databaseforbindelse ved hjælp af getDatabase
    const db = getDatabase();

    // Opretter en initial tilstand (initialState) for et nyt produkt
    const initialState = {
        vare: '',
        udløbsdato: '',
        antal: '',
        afhentning: '',
        lokation: ''
    }

    // Opretter en lokal statevariabel 'newProduct' ved hjælp af useState og initialiserer den med initialState
    const [newProduct,setNewProduct] = useState(initialState);

    // Returnerer true, hvis komponenten bruges til redigering af produkt (Edit Product).
    const isEditProduct = route.name === "Edit Product";

    // Bruger useEffect til at køre kode, når komponenten vises på skærmen
    useEffect(() => {
        if(isEditProduct){
            // Hvis det er redigering, hentes produktdata fra route.params og opdaterer 'newProduct'-state med dem
            const product = route.params.product[1];
            setNewProduct(product)
        }
        // Returnerer en funktion, der nulstiller 'newProduct'-state, når komponenten ikke vises på skærmen
        return () => {
            setNewProduct(initialState)
        };
    }, []);

     // Funktionen 'changeTextInput' opdaterer den tilsvarende egenskab i 'newProduct'-state, når brugeren skriver i tekstinputfeltet
    const changeTextInput = (name,event) => {
        setNewProduct({...newProduct, [name]: event});
    }

     // Funktionen 'handleSave' gemmer produktdata i databasen eller opdaterer eksisterende data, afhængigt af om det er en redigering eller tilføjelse
    const handleSave = async () => {

        const { vare, udløbsdato, antal, afhentning, lokation } = newProduct;

        // Tjekker om alle felter er udfyldt, ellers vises en fejlmeddelelse
        if(vare.length === 0 || udløbsdato.length === 0 || antal.length === 0 || afhentning.length === 0 || lokation.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditProduct){
            // Hvis det er redigering, hentes produktets ID fra route.params
            const id = route.params.product[0];
            // Definerer stien til det specifikke produkt, der skal opdateres
            const productRef = ref(db, `Products/${id}`);

            // Definerer de felter, der skal opdateres
            const updatedFields = {
                vare,
                udløbsdato,
                antal,
                afhentning,
                lokation
            };
            
            // Bruger 'update' funktionen til at opdatere de specificerede felter i databasen
            await update(productRef, updatedFields)
                .then(() => {
                Alert.alert("Din info er nu opdateret");
                const product = newProduct
                // Navigerer tilbage til produktets detaljeside med de opdaterede data
                navigation.navigate("Product Details", { product });
                })
                .catch((error) => {
                console.error(`Error: ${error.message}`);
                });

        }else{
        // Hvis det ikke er redigering, defineres stien til "Products"-noden, hvor det nye data skal tilføjes
        const productsRef = ref(db, "/Products/");
        
        // Data, der skal tilføjes
        const newProductData = {
            vare,
            udløbsdato,
            antal,
            afhentning,
            lokation
        };
        
         // Bruger 'push' funktionen til at tilføje det nye data til "Products"-noden i databasen
        await push(productsRef, newProductData)
            .then(() => {
            Alert.alert("Saved");
            setNewProduct(initialState);
            })
            .catch((error) => {
            console.error(`Error: ${error.message}`);
            });
    }
    };

    // Returnerer JSX for tilføjelses-/redigeringsskærmen
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newProduct[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit product, vis save changes i stedet for add product*/}
                <Button title={ isEditProduct ? "Save changes" : "Add product"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

// Eksporterer Add_edit_Product-komponenten
export default Add_edit_Product;

// Definerer designet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});
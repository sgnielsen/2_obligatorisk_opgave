// Importerer diverse moduler
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from "firebase/app";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

// Importerer komponenterne
import Add_edit_Product from './components/Add_edit_Product';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import Profile from './components/Profile';

// Importerer Ionicons
import Ionicons from "react-native-vector-icons/Ionicons";

// Definerer hovedkomponenten for applikationen 
export default function App() {
  // Konfiguration for firebase
  const firebaseConfig = {
    apiKey: "AIzaSyBkJx-6WkUjUWuPKzckTJhjIhPSkdixBtw",
    authDomain: "fir-eb9ac.firebaseapp.com",
    databaseURL: "https://fir-eb9ac-default-rtdb.firebaseio.com",
    projectId: "fir-eb9ac",
    storageBucket: "fir-eb9ac.appspot.com",
    messagingSenderId: "81847795692",
    appId: "1:81847795692:web:cf993149ca943549630ac9"
  };

  // Tjekker om der allerede findes en initialiseret Firebase-instans.
  if (getApps().length < 1) {
    // Initialiserer Firebase-appen med konfigurationen ovenfor
    initializeApp(firebaseConfig);
    console.log("Firebase On!");
  }

  // Opretter to navigationsstakke (Stack) og en bundnavigation (Tab).
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  // Definerer en funktion for stack-navigationen.
  const StackNavigation = () => {
    return(
        <Stack.Navigator>
          <Stack.Screen name={'Product List'} component={ProductList}/>
          <Stack.Screen name={'Product Details'} component={ProductDetails}/>
          <Stack.Screen name={'Edit Product'} component={Add_edit_Product}/>
        </Stack.Navigator>
    )
  }

  return (
    // Opretter en NavigationContainer for at oprette navigationen
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={'Home'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home-outline" size={20} />),headerShown:false}}/>
        <Tab.Screen name={'Add'} component={Add_edit_Product} options={{tabBarIcon: () => ( <Ionicons name="add-circle-outline" size={20} />)}}/>
        <Tab.Screen name={'Profile'} component={Profile} options={{tabBarIcon: () => ( <Ionicons name="person-outline" size={20} />)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Definerer designet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
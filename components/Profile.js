// Importerer nødvendige moduler
import React, {useState} from 'react'
import {Text, TextInput, View} from 'react-native'
import globalStyles from '../GlobalStyles';


// Udsnit af hvordan profile skal se ud i fremtiden
const Profile = () => {

    const [inputValue, setInputValue] = useState("")

    return(
        <View>
            <View style={{margin:10}}>
            <Text style={globalStyles.text}>Profil data skal være her...</Text>
            </View>

        </View>
    )
}

export default Profile;
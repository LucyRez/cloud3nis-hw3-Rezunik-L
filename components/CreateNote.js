import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import nextId from "react-id-generator";


const CreateNote = ({route, navigation}) => {

    const [note, setNote] = useState();

    return(
        <View style={styles.container}>
        <SafeAreaView>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={styles.buttonWrapper}>
                        <Text style={styles.buttonText}> Back </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    navigation.navigate({
                        name: 'Home',
                        params: {note: note, id: nextId(), edit: false},
                        merge: true,
                    });
                    }}>
                    <View style={styles.buttonWrapper}>
                        <Text style={styles.buttonText}> Add Note </Text>
                    </View>
                </TouchableOpacity>

            </View>

            <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <TextInput style={styles.noteInput} placeholder={"Write a note here..."} multiline={true} value={note} onChangeText={text => setNote(text)}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
   container:{
     flex: 1,
     margin: 20,
     padding: 10,
   }, 
   headerWrapper:{
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingHorizontal: 10,
     paddingTop: 30,
   },
   noteInput:{
     padding: 10,
     fontSize: 25,
     marginTop: 25,
   },
   buttonWrapper:{
    
  },
  buttonText:{
    fontSize: 20,
    color: '#0879',
  },
});

export default CreateNote;
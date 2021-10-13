import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';

import Note from './Note'


const NoteList = ({navigation, route}) => {

    const [noteItems, setNoteItems] = useState([]);

    const handleAddNote = (note, id) => {
        let newNote = {
            id: id,
            text: note,
            time: new Date().toLocaleString(),
        };
        setNoteItems([...noteItems, newNote])
    }

    const handleEditNote = (note, id) => {
        let editedNote = {
            id: id,
            text: note, 
            time: new Date().toLocaleString(),
        }

        const index = noteItems.findIndex(
            (item) => item.id === editedNote.id
        )

        const newNotes = [...noteItems]
        newNotes[index] = editedNote
        setNoteItems(newNotes)

    }

    const removeNote = id =>{
        const removeArr = [...noteItems].filter(note => note.id !== id)
        setNoteItems(removeArr)
    }
    
    React.useEffect(() => {
        if (route.params?.note){
            if(route.params?.edit){
                handleEditNote(route.params?.note, route.params?.id)
            }else{
                handleAddNote(route.params?.note, route.params?.id)
            }
            console.log(route.params.note)
        }
    }, [route.params?.note]);

    return(

        <View style={styles.container}>
      
        <ScrollView>
          <View style={styles.notesContainer}>
             <Note text="Lets add a very long note to check what's going to happen if i can't fit all the text in one row"
              time = {new Date().toLocaleString()}/>
             {noteItems.map((item, index) => {
                 return (
                     <TouchableOpacity key={index} onPress={()=> navigation.navigate('Edit', {
                        item: item,
                     })
                     }>
                         <Note text={item.text} time={item.time}></Note>   
                     </TouchableOpacity>
                 )
             })
            }
          </View>
        </ScrollView>
        
  
        <TouchableOpacity onPress={()=>navigation.navigate('Create Note')}>
            <View style={styles.buttonWrapper}>
             <View style={styles.addButton}>
                <Text style={styles.buttonText}> + </Text>
             </View>
             </View>
        </TouchableOpacity>
        
       
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      marginTop: 80,
    },
    notesContainer:{
      padding: 20,
      flex: 1, 
      flexDirection: 'column',
    },
    buttonWrapper:{
      zIndex: 1 ,
      padding: 30,
      alignItems: 'flex-end',
    },
    addButton:{
      width: 70, 
      height: 70,
      borderRadius: 70,
      backgroundColor: '#0879',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText:{
      fontSize: 45,
      color: 'white',
    },
  });

export default NoteList;
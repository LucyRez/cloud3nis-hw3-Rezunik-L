import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Note from "./Note";

const NoteList = ({ navigation, route }) => {
  const [noteItems, setNoteItems] = useState([]);

  const handleAddNote = (note, id, title, image) => {
    let newNote = {
      id: id,
      text: note,
      title: title,
      image: image,
      time: new Date().toLocaleString(),
    };
    setNoteItems([...noteItems, newNote]);
  };

  const handleEditNote = (note, id, title, image) => {
    let editedNote = {
      id: id,
      text: note,
      title: title,
      image: image,
      time: new Date().toLocaleString(),
    };

    const index = noteItems.findIndex((item) => item.id === editedNote.id);

    const newNotes = [...noteItems];
    newNotes[index] = editedNote;
    setNoteItems(newNotes);
  };

  const removeNote = (id) => {
    const removeArr = [...noteItems].filter((note) => note.id !== id);
    setNoteItems(removeArr);
  };

  React.useEffect(() => {
    if (route.params?.note || route.params?.title || route.params?.image) {
      if (route.params?.edit) {
        handleEditNote(
          route.params?.note,
          route.params?.id,
          route.params?.title,
          route.params?.image
        );
      } else {
        handleAddNote(
          route.params?.note,
          route.params?.id,
          route.params?.title,
          route.params?.image
        );
      }
    }
  }, [route.params?.note, route.params?.title, route.params?.image]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.notesContainer}>
          {noteItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("Edit", {
                    item: item,
                  })
                }
              >
                <Note text={item.text} title={item.title}></Note>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity onPress={() => navigation.navigate("Create Note")}>
        <View style={styles.buttonWrapper}>
          <View style={styles.addButton}>
            <Text style={styles.buttonText}> + </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginTop: 80,
  },
  notesContainer: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
  },
  buttonWrapper: {
    zIndex: 1,
    paddingBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: "flex-end",
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: "#0879",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 40,
    color: "white",
    alignSelf: "center",
  },
});

export default NoteList;

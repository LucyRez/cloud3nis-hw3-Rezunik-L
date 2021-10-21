import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Note = (props) => {
  return (
    <View style={styles.noteWrapper}>
      <Text style={styles.noteTitle}>{props.title}</Text>
      <Text style={styles.noteText}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noteWrapper: {
    backgroundColor: "#0879",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  noteText: {
    fontSize: 20,
    color: "white",
  },
  noteTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    paddingBottom: 10,
  },
});

export default Note;

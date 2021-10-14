import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Button,
  Image,
} from "react-native";
import nextId from "react-id-generator";
import * as ImagePicker from "expo-image-picker";

const CreateNote = ({ route, navigation }) => {
  const [note, setNote] = useState();
  const [title, setTitle] = useState();
  const [image, setImage] = useState();

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Sorry, we need camera roll permissions to make pictures work!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.buttonWrapper}>
                <Text style={styles.buttonText}> Back </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate({
                  name: "Home",
                  params: {
                    note: note,
                    id: nextId(),
                    title: title,
                    image: image,
                    edit: false,
                  },
                  merge: true,
                });
              }}
            >
              <View style={styles.buttonWrapper}>
                <Text style={styles.buttonText}> Add Note </Text>
              </View>
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.title}
              placeholder={"Title here..."}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </KeyboardAvoidingView>

          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 200,
                height: 200,
                margin: 10,
                alignSelf: "center",
              }}
            />
          )}
          <Button title="Pick an image" onPress={pickImage} />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.noteInput}
              placeholder={"Write a note here..."}
              multiline={true}
              value={note}
              onChangeText={(text) => setNote(text)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 10,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  title: {
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 25,
  },
  noteInput: {
    padding: 10,
    fontSize: 25,
  },
  buttonText: {
    fontSize: 20,
    color: "#0879",
  },
});

export default CreateNote;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const EditNote = ({ route, navigation }) => {
  const [note, setNote] = useState();
  const [title, setTitle] = useState();
  const [image, setImage] = useState();

  React.useEffect(() => {
    if (route.params?.item) {
      setNote(route.params.item.text);
      setTitle(route.params.item.title);
      setImage(route.params.item.image);
    }
  }, [route.params?.item]);

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
                    id: route.params.item.id,
                    title: title,
                    image: image,
                    edit: true,
                  },
                  merge: true,
                });
              }}
            >
              <View style={styles.buttonWrapper}>
                <Text style={styles.buttonText}> Edit Note </Text>
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
              onChangeText={(t) => setTitle(t)}
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
  buttonWrapper: {},
  buttonText: {
    fontSize: 20,
    color: "#0879",
  },
});

export default EditNote;

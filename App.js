import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Keyboard,
} from "react-native";

import NoteList from "./components/NoteList";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={NoteList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create Note"
          component={CreateNote}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Edit"
          component={EditNote}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

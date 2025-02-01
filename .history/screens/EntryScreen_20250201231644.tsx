// src/screens/EntryScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type EntryScreenRouteProp = RouteProp<{ params: { entry: { title: string; content: string } } }, 'params'>;
type EntryScreenNavigationProp = StackNavigationProp<any>;

export default function EntryScreen({
  route,
  navigation,
}: {
  route: EntryScreenRouteProp;
  navigation: EntryScreenNavigationProp;
}) {
  const existingEntry = route.params?.entry;
  const [title, setTitle] = useState(existingEntry ? existingEntry.title : '');
  const [content, setContent] = useState(existingEntry ? existingEntry.content : '');

  const handleSave = () => {
    // TODO: Save the entry (e.g., update state, persist data, etc.)
    console.log('Entry saved:', { title, content });
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold mb-2">Title</Text>
      <TextInput
        className="border border-gray-300 p-2 rounded mb-4"
        placeholder="Entry title"
        value={title}
        onChangeText={setTitle}
      />
      <Text className="text-lg font-bold mb-2">Content</Text>
      <TextInput
        className="border border-gray-300 p-2 rounded mb-4 h-40 text-left"
        placeholder="Write your thoughts..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />
      <TouchableOpacity
        className="bg-green-500 p-4 rounded-full items-center justify-center"
        onPress={handleSave}
      >
        <Text className="text-white font-bold">Save Entry</Text>
      </TouchableOpacity>
    </View>
  );
}

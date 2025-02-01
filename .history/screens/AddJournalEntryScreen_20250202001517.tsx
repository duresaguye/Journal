import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { JournalContext } from '../context/JournalContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Add proper navigation typing
type RootStackParamList = {
  AddJournalEntry: undefined;
  // Add other screens here
};

type AddJournalEntryScreenProps = NativeStackScreenProps<RootStackParamList, 'AddJournalEntry'>;

const AddJournalEntryScreen: React.FC<AddJournalEntryScreenProps> = ({ navigation }) => {
  const [entry, setEntry] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const { addEntry } = useContext(JournalContext);

  const handleSave = () => {
    addEntry({ 
      id: Date.now().toString(), 
      title: 'New Entry', 
      content: entry, 
      image,
      date: new Date()  // Added date field
    });
    navigation.goBack();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,  // Updated mediaTypes
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,  // Explicitly set to false
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-semibold mb-4 text-gray-800">New Journal Entry</Text>
      
      <TextInput
        className="h-40 border border-gray-200 rounded-lg p-4 mb-4 text-gray-700 text-base"
        multiline
        textAlignVertical="top"
        onChangeText={setEntry}
        value={entry}
        placeholder="Write your thoughts..."
        placeholderTextColor="#6b7280"
      />

      <TouchableOpacity 
        onPress={pickImage} 
        className="bg-blue-500 py-3 px-6 rounded-lg mb-4 items-center"
      >
        <Text className="text-white font-medium">Select Image</Text>
      </TouchableOpacity>

      {image && (
        <Image 
          source={{ uri: image }} 
          className="w-full h-64 rounded-lg mb-4"
          resizeMode="cover"
        />
      )}

      <Button 
        title="Save Entry" 
        onPress={handleSave} 
        color="#3b82f6" 
        disabled={!entry.trim()} 
      />
    </View>
  );
};

export default AddJournalEntryScreen;
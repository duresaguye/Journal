import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { JournalContext } from '../context/JournalContext';

interface AddJournalEntryScreenProps {
  navigation: any;
}

const AddJournalEntryScreen: React.FC<AddJournalEntryScreenProps> = ({ navigation }) => {
  const [entry, setEntry] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const { addEntry } = useContext(JournalContext);

  const handleSave = () => {
    const newEntry = {
      id: Date.now().toString(),
      title: 'New Entry',
      content: entry,
      image,
      date: new Date().toISOString(), // Convert Date to string
    };
    addEntry(newEntry);
    navigation.goBack();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // Updated mediaTypes as an array
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white items-center justify-center">
      <Text className="text-2xl font-bold mb-4">New Journal Entry</Text>
      <TextInput
        className="h-24 border border-gray-300 mb-4 p-2 text-base text-gray-700 w-full"
        multiline
        numberOfLines={4}
        onChangeText={setEntry}
        value={entry}
        placeholder="Write your journal entry here..."
      />
      <TouchableOpacity onPress={pickImage} className="bg-blue-500 p-3 rounded mb-4 w-full">
        <Text className="text-white text-center">Pick an Image</Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          className="w-48 h-48 mb-4"
          resizeMode="cover"
        />
      )}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default AddJournalEntryScreen;

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { JournalContext } from '../context/JournalContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

interface AddJournalEntryScreenProps {
  navigation: any;
}

const AddJournalEntryScreen: React.FC<AddJournalEntryScreenProps> = ({ navigation }) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-semibold mb-4 text-gray-800">New Journal Entry</Text>
      
      <TextInput
        className="h-40 border border-gray-200 rounded-lg p-4 mb-4 text-gray-700 text-base"
        multiline
        numberOfLines={4}
        onChangeText={setEntry}
        value={entry}
        placeholder="Write your journal entry here..."
      />
      <TouchableOpacity onPress={pickImage} className="bg-blue-500 p-4 rounded-lg mb-4">
        <Text className="text-white text-center">Pick an Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default AddJournalEntryScreen;
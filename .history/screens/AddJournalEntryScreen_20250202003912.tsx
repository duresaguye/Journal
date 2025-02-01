import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
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
      date: new Date().toISOString(),
    };
    addEntry(newEntry);
    navigation.goBack();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 px-6 py-8 bg-gray-100">
      <Text className="text-3xl font-semibold text-gray-800 mb-4">New Journal Entry</Text>

      {/* Writing Input */}
      <TextInput
        className="h-32 border border-gray-300 bg-white rounded-xl p-4 text-base text-gray-700 shadow-md w-full"
        multiline
        numberOfLines={5}
        onChangeText={setEntry}
        value={entry}
        placeholder="Write your journal entry here..."
        placeholderTextColor="gray"
      />

      {/* Image Upload */}
      <TouchableOpacity 
        onPress={pickImage} 
        className="bg-blue-600 p-4 rounded-xl mt-5 shadow-lg active:bg-blue-700"
      >
        <Text className="text-white text-lg text-center font-medium">Upload an Image</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          className="w-48 h-48 mt-4 rounded-lg shadow-md"
          resizeMode="cover"
        />
      )}

      {/* Save Button */}
      <TouchableOpacity 
        onPress={handleSave} 
        className="bg-green-600 p-4 rounded-xl mt-6 shadow-lg active:bg-green-700"
      >
        <Text className="text-white text-lg text-center font-medium">Save Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddJournalEntryScreen;

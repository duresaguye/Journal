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
    addEntry({ id: Date.now().toString(), title: 'New Entry', content: entry, image });
    navigation.goBack();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-lg mb-2">New Journal Entry</Text>
      <TextInput
        className="h-24 border border-gray-300 p-2 mb-4 text-base text-gray-700"
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

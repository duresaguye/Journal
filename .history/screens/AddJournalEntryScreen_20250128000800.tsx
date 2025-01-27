import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { JournalContext } from '../context/JournalContext';


interface AddJournalEntryScreenProps {
    navigation: any;
}

const AddJournalEntryScreen: React.FC<AddJournalEntryScreenProps> = ({ navigation }) => {
  const [entry, setEntry] = useState('');
  const { addEntry } = useContext(JournalContext);

  const handleSave = () => {
    addEntry(entry);
    navigation.goBack();
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
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default AddJournalEntryScreen;

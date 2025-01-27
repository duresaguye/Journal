import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
// Removed JournalContext import as it's no longer used

interface AddJournalEntryScreenProps {
    navigation: any;
}

const AddJournalEntryScreen: React.FC<AddJournalEntryScreenProps> = ({ navigation }) => {
  const [entry, setEntry] = useState('');

  const handleSave = () => {
    // Placeholder for future functionality to save entries
    // Since context and state management are not implemented, we just navigate back for now
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

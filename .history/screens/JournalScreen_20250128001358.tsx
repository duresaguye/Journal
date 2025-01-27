import React, { useContext } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { JournalContext } from '../context/JournalContext';

interface JournalScreenProps {
  navigation: any;
}

const JournalScreen: React.FC<JournalScreenProps> = ({ navigation }) => {
  // Using an empty context without entries
  const { entries } = useContext(JournalContext);

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl mb-4">Journal Entries</Text>
      <FlatList
        data={entries || []} // Default to empty array if entries is not provided
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-300">
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <Button title="Add New Entry" onPress={() => navigation.navigate('AddJournalEntry')} />
    </View>
  );
};

export default JournalScreen;

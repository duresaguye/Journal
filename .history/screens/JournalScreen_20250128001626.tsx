import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const JournalScreen = ({ navigation }) => {
  // Static data instead of context for now
  const entries = [
    { id: '1', text: 'My first journal entry' },
    { id: '2', text: 'Today was a great day!' },
  ];

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl mb-4">Journal Entries</Text>
      <FlatList
        data={entries}
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

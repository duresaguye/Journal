import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styled } from 'nativewind';

// 1. Define proper navigation types
type RootStackParamList = {
  Journal: undefined;
  AddJournalEntry: undefined;
};

type JournalScreenProps = NativeStackScreenProps<RootStackParamList, 'Journal'>;

// 2. Styled components with NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledFlatList = styled(FlatList);
const StyledPressable = styled(Pressable);

// 3. Strongly typed journal entry
interface JournalEntry {
  id: string;
  text: string;
  date: Date;
  // Add more fields as needed
}

const JournalScreen: React.FC<JournalScreenProps> = ({ navigation }) => {
  // 4. Typed static data
  const entries: JournalEntry[] = [
    { id: '1', text: 'My first journal entry', date: new Date('2024-03-01') },
    { id: '2', text: 'Today was a great day!', date: new Date() },
  ];

  return (
    <StyledView className="flex-1 p-4 bg-gray-50">
      <StyledText className="text-2xl font-bold mb-4 text-gray-800">
        Journal Entries
      </StyledText>

      <StyledFlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StyledView className="p-4 mb-2 bg-white rounded-lg shadow-sm">
            <StyledText className="text-gray-600">{item.text}</StyledText>
            <StyledText className="text-sm text-gray-400 mt-1">
              {item.date.toLocaleDateString()}
            </StyledText>
          </StyledView>
        )}
        ListEmptyComponent={
          <StyledText className="text-gray-500 text-center mt-8">
            No entries yet – start journaling!
          </StyledText>
        }
      />

      <StyledPressable
        className="absolute bottom-6 right-6 bg-blue-500 px-6 py-3 rounded-full shadow-lg"
        onPress={() => navigation.navigate('AddJournalEntry')}
      >
        <StyledText className="text-white font-semibold">+ New Entry</StyledText>
      </StyledPressable>
    </StyledView>
  );
};

export default JournalScreen;
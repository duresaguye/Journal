// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MoodSelector, { MoodOption } from '../components/MoodSelector';
import { LineChart } from 'react-native-chart-kit';

const moodOptions: MoodOption[] = [
  { mood: 'Happy', icon: '😊', color: 'yellow-300' },
  { mood: 'Sad', icon: '😢', color: 'blue-300' },
  { mood: 'Angry', icon: '😡', color: 'red-300' },
  // add more options...
];

export default function HomeScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState('');

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    // Optionally record the mood for the day
  };

  // Dummy data for journal entries
  const entries = [
    { id: '1', title: 'A Sunny Day', content: 'Today was bright and full of energy.' },
    { id: '2', title: 'Reflective Evening', content: 'Had a thoughtful conversation with a friend.' },
  ];

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-bold mb-2">How are you feeling today?</Text>
      <MoodSelector options={moodOptions} selectedMood={selectedMood} onSelect={handleMoodSelect} />

      <Text className="text-lg font-bold mt-4">Mood Trend</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: [3, 4, 2, 5, 3, 4, 4] }],
        }}
        width={320}
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white p-4 rounded-lg shadow mb-3"
            onPress={() => navigation.navigate('Entry', { entryId: item.id })}
          >
            <Text className="text-xl font-bold">{item.title}</Text>
            <Text numberOfLines={2}>{item.content}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-full absolute bottom-8 right-8 shadow-lg"
        onPress={() => navigation.navigate('Entry')}
      >
        <Text className="text-white text-lg font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
}

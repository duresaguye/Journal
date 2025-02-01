import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MoodSelector, { MoodOption } from '../components/MoodSelector';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const moodOptions: MoodOption[] = [
  { mood: 'Happy', icon: '😊', color: 'yellow-300' },
  { mood: 'Sad', icon: '😢', color: 'blue-300' },
  { mood: 'Angry', icon: '😡', color: 'red-300' },
  { mood: 'Neutral', icon: '😐', color: 'gray-300' },
  
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="bg-white p-4 mb-3 rounded-lg shadow"
      onPress={() => navigation.navigate('Entry', { entry: item })}
    >
      <Text className="text-xl font-bold text-gray-800">{item.title}</Text>
      <Text className="text-gray-600 mt-1" numberOfLines={2}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-full absolute bottom-8 right-8 shadow-lg"
        onPress={() => navigation.navigate('AddJournalEntry')}
      >
        <Text className="text-white text-lg font-bold">+</Text>
      </TouchableOpacity>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43]
            }
          ]
        }}
        width={Dimensions.get("window").width - 16} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
}
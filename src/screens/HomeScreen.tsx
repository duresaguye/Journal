import React, { useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MoodSelector, { MoodOption } from '../components/MoodSelector';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { JournalContext } from '../context/JournalContext';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Entry: { entry: JournalEntry }; // Type for Entry screen
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface JournalEntry {
  id: string;
  title: string;
  content: string;
}

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const moodOptions: MoodOption[] = [
  { mood: 'Happy', icon: '😊', color: 'yellow-300' },
  { mood: 'Sad', icon: '😢', color: 'blue-300' },
  { mood: 'Angry', icon: '😡', color: 'red-300' },
  { mood: 'Neutral', icon: '😐', color: 'gray-300' },
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [selectedMood, setSelectedMood] = useState('');
  const { entries } = useContext(JournalContext);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const renderItem = ({ item }: { item: JournalEntry }) => (
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
      <Text className="text-xl font-bold mb-2">How are you feeling today?</Text>
      <MoodSelector options={moodOptions} selectedMood={selectedMood} onSelect={handleMoodSelect} />

      <Text className="text-lg font-bold mt-4">Mood Trend</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: [3, 4, 2, 5, 3, 4, 4] }],
        }}
        width={Dimensions.get('window').width - 16}
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
        renderItem={renderItem}
      />
    </View>
  );
}









































































































































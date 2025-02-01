import React, { useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { JournalContext } from '../context/JournalContext';
import MoodSelector, { MoodOption } from '../components/MoodSelector';

const moodOptions: MoodOption[] = [
  { mood: 'Happy', icon: '😊', color: 'bg-amber-100' },
  { mood: 'Calm', icon: '😌', color: 'bg-emerald-100' },
  { mood: 'Neutral', icon: '😐', color: 'bg-slate-100' },
  { mood: 'Sad', icon: '😔', color: 'bg-sky-100' },
];

const HomeScreen = ({ navigation }) => {
  const [selectedMood, setSelectedMood] = useState('');
  const { entries } = useContext(JournalContext);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    // Add mood tracking logic
  };

  const renderEntry = ({ item }) => (
    <TouchableOpacity
      className="bg-white p-5 mb-3 rounded-xl border border-gray-100"
      onPress={() => navigation.navigate('Entry', { entry: item })}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-medium text-gray-900">{item.title}</Text>
          <Text className="text-gray-500 mt-1" numberOfLines={1}>
            {item.content}
          </Text>
        </View>
        <Text className="text-sm text-gray-400 ml-2">
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 p-5">
      {/* Mood Section */}
      <View className="mb-8">
        <Text className="text-2xl font-semibold text-gray-900 mb-4">
          How are you feeling?
        </Text>
        <MoodSelector 
          options={moodOptions} 
          selectedMood={selectedMood} 
          onSelect={handleMoodSelect}
        />
      </View>

      {/* Mood Insights */}
      <View className="mb-8">
        <Text className="text-xl font-semibold text-gray-900 mb-4">
          Weekly Mood Flow
        </Text>
        <LineChart
          data={{
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [{
              data: [3, 4, 2, 5, 3, 4, 4],
              color: (opacity) => `rgba(99, 102, 241, ${opacity})`,
            }]
          }}
          width={Dimensions.get('window').width - 40}
          height={160}
          withVerticalLines={false}
          withHorizontalLines={false}
          chartConfig={{
            backgroundGradientFrom: '#f8fafc',
            backgroundGradientTo: '#f8fafc',
            decimalPlaces: 0,
            color: () => '#94a3b8',
            propsForLabels: { fontSize: 12 }
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </View>

      {/* Recent Entries */}
      <Text className="text-xl font-semibold text-gray-900 mb-4">
        Recent Reflections
      </Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={renderEntry}
        ListEmptyComponent={
          <Text className="text-gray-400 text-center mt-8">
            No entries yet – tap + to begin
          </Text>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        className="bg-indigo-500 w-14 h-14 rounded-full absolute bottom-6 right-6 
        items-center justify-center shadow-lg active:bg-indigo-600"
        onPress={() => navigation.navigate('AddJournalEntry')}
      >
        <Text className="text-white text-2xl font-light">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
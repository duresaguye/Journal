import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types'; // Ensure you have a types file defining your navigation stack

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const dummyEntries = [
  { id: '1', title: 'A Sunny Day', content: 'Today was a bright and sunny day...' },
  { id: '2', title: 'Rainy Reflections', content: 'Rain brought introspection and calm...' },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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
        data={dummyEntries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-full absolute bottom-8 right-8 shadow-lg"
        onPress={() => navigation.navigate('AddJournalEntry')}
      >
        <Text className="text-white text-lg font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
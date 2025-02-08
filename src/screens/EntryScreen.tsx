import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';

type EntryScreenRouteProp = RouteProp<RootStackParamList, 'Entry'>;

interface EntryScreenProps {
  route: EntryScreenRouteProp;
  navigation: any; // Assuming navigation prop is passed down
}

const EntryScreen: React.FC<EntryScreenProps> = ({ route, navigation }) => {
  const { entry } = route.params;

  if (!entry) {
    return (
      <View className="flex-1 p-4 bg-white">
        <Text className="text-2xl font-bold">Entry not found</Text>
      </View>
    );
  }

  const handleEditPress = () => {
    navigation.navigate('EditEntry', { entry });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={handleBackPress} className="p-2">
          <Text className="text-2xl font-bold">X</Text>
        </TouchableOpacity>
        <Text className="text-sm text-gray-500">Today</Text> {/* Updated text */}
        <TouchableOpacity
          onPress={handleEditPress}
          className="bg-blue-500 py-1 px-3 rounded-full"
        >
          <Text className="text-white text-sm font-bold">Edit</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-2xl font-bold mb-2">{entry.title}</Text>
      {/* <Text className="text-sm text-gray-500 mb-4">{entry.date}</Text> */}
      <Text className="text-base text-black mb-6">{entry.content}</Text>
    </View>
  );
};

export default EntryScreen;

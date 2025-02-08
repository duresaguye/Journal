
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export interface MoodOption {
  mood: string;
  icon: string; // you could use an icon name from a library like react-native-vector-icons
  color: string;
}

interface MoodSelectorProps {
  options: MoodOption[];
  selectedMood: string;
  onSelect: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ options, selectedMood, onSelect }) => {
  return (
    <View className="flex-row justify-around p-4">
      {options.map(option => (
        <TouchableOpacity
          key={option.mood}
          onPress={() => onSelect(option.mood)}
          className={`p-2 rounded-full ${selectedMood === option.mood ? 'bg-' + option.color : ''}`}
        >
          <Text>{option.icon}</Text>
          <Text>{option.mood}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MoodSelector;

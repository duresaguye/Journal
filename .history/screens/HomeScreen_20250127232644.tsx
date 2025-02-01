import React from 'react';
import { Text, View, Button } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-lg'>Home Screen</Text>
      <Button title="Go to Journal" onPress={() => navigation.navigate('Journal')} />
    </View>
  );
};

export default HomeScreen;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';

type EntryScreenRouteProp = RouteProp<RootStackParamList, 'Entry'>;

interface EntryScreenProps {
  route: EntryScreenRouteProp;
}

const EntryScreen: React.FC<EntryScreenProps> = ({ route }) => {
  const { entry } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.content}>{entry.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: 'gray',
  },
});

export default EntryScreen;

// screens/EntryScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { RouteProp } from '@react-navigation/native';

type EntryScreenRouteProp = RouteProp<{ params: { entry: { title: string; content: string } } }, 'params'>;

const EntryScreen = ({ route }: { route: EntryScreenRouteProp }) => {
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
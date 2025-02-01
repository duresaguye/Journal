import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import JournalScreen from './screens/JournalScreen';
import AddJournalEntryScreen from './screens/AddJournalEntryScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import EntryScreen from './screens/EntryScreen'; // Ensure this import

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="AddJournalEntry" component={AddJournalEntryScreen} />
        <Stack.Screen name="Entry" component={EntryScreen} /> {/* Ensure this screen is added */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
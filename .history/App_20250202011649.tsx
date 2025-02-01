import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddJournalEntryScreen from './screens/AddJournalEntryScreen';
import EntryScreen from './screens/EntryScreen';
import { JournalProvider } from './context/JournalContext';
import CustomTabBar from './components/CustomTabBar'; 
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
  

    interface MainTabsProps {}

    const MainTabs: React.FC<MainTabsProps> = () => {
      return (
        <Tab.Navigator tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Add" component={AddJournalEntryScreen} options={{ tabBarButton: () => null }} />
          <Tab.Screen name="Library" component={LibraryScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      );
    };
  );
}

export default function App() {
  return (
    <JournalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="AddJournalEntry" component={AddJournalEntryScreen} />
          <Stack.Screen name="Entry" component={EntryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </JournalProvider>
  );
}
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { JournalProvider } from "@/context/JournalContext";

// Import Screens
import HomeScreen from "@/screens/HomeScreen";
import LibraryScreen from "@/screens/LibraryScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import AddJournalEntryScreen from "@/screens/AddJournalEntryScreen";
import EntryScreen from "@/screens/EntryScreen";

// Import Custom Tab Bar
import CustomTabBar from "@/components/CustomTabBar";

// Create Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      id={undefined}
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#f8f8f8",
          borderTopWidth: 0,
          elevation: 0, // Remove Android shadow
        },
        tabBarActiveTintColor: "#FF6347",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home", tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Add"
        component={AddJournalEntryScreen}
        options={{ tabBarButton: () => null }} // Hides from tab bar
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{ title: "Library", tabBarLabel: "Library" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile", tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <JournalProvider>
   
        <Stack.Navigator
          id={undefined}
          initialRouteName="MainTabs"
          screenOptions={{
            headerStyle: { backgroundColor: "#f8f8f8" },
            headerTintColor: "#333",
            headerTitleStyle: { fontWeight: "bold" },
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddJournalEntry"
            component={AddJournalEntryScreen}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="Entry"
            component={EntryScreen}
            options={{ title: "" }}
          />
        </Stack.Navigator>
    
    </JournalProvider>
  );
}

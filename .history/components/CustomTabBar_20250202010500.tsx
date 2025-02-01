import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View className="flex-row h-16 bg-white border-t border-gray-200 items-center justify-around relative">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        if (route.name === 'Add') {
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => navigation.navigate('AddJournalEntry')}
              className="absolute -bottom-5 w-16 h-16 rounded-full bg-red-500 items-center justify-center shadow-lg"
            >
              <Icon name="add" size={30} color="white" />
            </TouchableOpacity>
          );
        }

        const iconName = 
          route.name === 'Home' ? 'home' : 
          route.name === 'Library' ? 'book' : 
          'person';

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center"
          >
            <Icon 
              name={isFocused ? iconName : `${iconName}-outline`} 
              size={25} 
              color={isFocused ? '#ef4444' : '#6b7280'}  // red-500 and gray-500
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
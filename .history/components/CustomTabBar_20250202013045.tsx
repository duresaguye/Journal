import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface Route {
  key: string;
  name: string;
}

interface Descriptor {
  options: {
    tabBarAccessibilityLabel?: string;
    tabBarTestID?: string;
  };
}

interface CustomTabBarProps {
  state: {
    routes: Route[];
    index: number;
  };
  descriptors: { [key: string]: Descriptor };
  navigation: {
    emit: (event: { type: string; target: string }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
}

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const scaleValue = new Animated.Value(1); // Controls shrinking effect

  const handleScroll = (scrollY: number) => {
    const scale = Math.max(0.8, 1 - scrollY / 200);
    Animated.timing(scaleValue, {
      toValue: scale,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <StyledView className="absolute bottom-0 left-0 right-0 flex-row h-16 bg-gray-700 border-t border-gray-300 items-center justify-around shadow-md">
      {state.routes.map((route: Route, index: number) => {
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

        if (route.name === 'Add') return null; // Hide "Add" from normal tabs

        const iconName = route.name === 'Home' ? 'home' : route.name === 'Library' ? 'book' : 'person';

        return (
          <StyledTouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            className="flex-1 items-center justify-center"
          >
            <Icon name={isFocused ? iconName : `${iconName}-outline`} size={25} color={isFocused ? '#FF6347' : 'gray'} />
          </StyledTouchableOpacity>
        );
      })}

      {/* Floating + Button (Moved to Bottom-Right) */}
      <Animated.View style={{ transform: [{ scale: scaleValue }] }} className="absolute bottom-20 right-5 z-10">
        <StyledTouchableOpacity
          onPress={() => navigation.navigate('AddJournalEntry')}
          className="w-16 h-16 bg-red-500 rounded-full items-center justify-center shadow-lg"
        >
          <Icon name="add" size={32} color="white" />
        </StyledTouchableOpacity>
      </Animated.View>
    </StyledView>
  );
};

export default CustomTabBar;

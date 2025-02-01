import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const scaleValue = new Animated.Value(1); // Controls the shrinking effect

  const handleScroll = (scrollY: number) => {
    const scale = Math.max(0.8, 1 - scrollY / 200);
    Animated.timing(scaleValue, {
      toValue: scale,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.tabBar}>
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

        if (route.name === 'Add') {
          return null; // Hide "Add" from normal tabs
        }

        const iconName = route.name === 'Home' ? 'home' : route.name === 'Library' ? 'book' : 'person';

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Icon name={isFocused ? `${iconName}` : `${iconName}-outline`} size={25} color={isFocused ? '#FF6347' : 'gray'} />
          </TouchableOpacity>
        );
      })}

      {/* Floating Center Button */}
      <Animated.View style={[styles.addButtonContainer, { transform: [{ scale: scaleValue }] }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddJournalEntry')}
          style={styles.addButton}
        >
          <Icon name="add" size={32} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 30, // Makes sure it floats above the tab bar
    alignSelf: 'center',
    zIndex: 10,
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF6347', // Tomato color
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default CustomTabBar;

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const scaleValue = new Animated.Value(1); // Controls the shrinking effect

  const handleScroll = (scrollY: number) => {
    const scale = Math.max(0.7, 1 - scrollY / 200);
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
          return (
            <Animated.View key={route.key} style={[styles.addButtonContainer, { transform: [{ scale: scaleValue }] }]}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={() => navigation.navigate('AddJournalEntry')}
                style={styles.addButton}
              >
                <Icon name="add" size={32} color="white" />
              </TouchableOpacity>
            </Animated.View>
          );
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
    elevation: 10, // Adds shadow for depth
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 10,
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF6347', // Vibrant red-orange
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // Makes it float above the tab bar
  },
});

export default CustomTabBar;

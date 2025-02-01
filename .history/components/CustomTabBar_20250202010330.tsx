import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

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

interface Navigation {
    emit: (event: { type: string; target: string }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
}

interface State {
    routes: Route[];
    index: number;
}

interface CustomTabBarProps {
    state: State;
    descriptors: { [key: string]: Descriptor };
    navigation: Navigation;
}

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
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
                                style={styles.addButton}
                            >
                                <Icon name="add" size={30} color="white" />
                            </TouchableOpacity>
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
                            onLongPress={onLongPress}
                            style={styles.tabButton}
                        >
                            <Icon name={isFocused ? `${iconName}` : `${iconName}-outline`} size={25} color={isFocused ? 'tomato' : 'gray'} />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default CustomTabBar;
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DailySummaryScreen from './DailySummaryScreen';
import WeeklySummaryScreen from './WeeklySummaryScreen';
import MonthlySummaryScreen from './MonthlySummaryScreen';
import YearlySummaryScreen from './YearlySummaryScreen';

const TopTab = createMaterialTopTabNavigator();

export default function LibraryScreen() {
  return (
    <TopTab.Navigator className='bg-gray-800'>
      <TopTab.Screen name="Daily" component={DailySummaryScreen} />
      <TopTab.Screen name="Weekly" component={WeeklySummaryScreen} />
      <TopTab.Screen name="Monthly" component={MonthlySummaryScreen} />
      <TopTab.Screen name="Yearly" component={YearlySummaryScreen} />
    </TopTab.Navigator>
  );
}
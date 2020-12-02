import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OverviewList from './views/OverviewList';
import Settings from './views/Settings';
import NewEntry from './views/NewEntry';
import Optimization from './views/Optimization';
import FinanceAnalysis from './views/FinanceAnalysis';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Overview" component={OverviewList} />
        <Tab.Screen name="Optimization" component={Optimization} />
        <Tab.Screen name="NewEntry" component={NewEntry} />
        <Tab.Screen name="Analysis" component={FinanceAnalysis} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
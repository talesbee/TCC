import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import RootStack from './RootStack';

function RootNavigation() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default RootNavigation;
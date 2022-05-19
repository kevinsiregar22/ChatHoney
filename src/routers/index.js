import React from 'react';
import MainStack from './MainStack';
import {navigationRef} from '../helpers/navigate';
import {NavigationContainer} from '@react-navigation/native';

export default function Root() {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
}

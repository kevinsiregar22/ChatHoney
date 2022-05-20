import React from 'react';
import {navigationRef} from './src/helpers/navigate';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/routers/MainStack';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
}

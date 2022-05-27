import React from 'react';
import Screens from '../../screens';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Screens.Home} />
      <Stack.Screen name="Login" component={Screens.Login} />
      <Stack.Screen name="Chat" component={Screens.Chat} />
      <Stack.Screen name="Register" component={Screens.Register} />
    </Stack.Navigator>
  );
}

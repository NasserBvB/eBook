import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Read } from 'screens';
import StackHeader from './StackHeader';

export type AuthStackParamList = {
  Login: undefined;
};

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: StackHeader,
        }}
        name="Game"
        component={Read}
      />
    </Stack.Navigator>
  );
};

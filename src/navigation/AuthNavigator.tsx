import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Read } from 'screens';

export type AuthStackParamList = {
  Login: undefined;
};

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Game"
        component={Read}
      />
    </Stack.Navigator>
  );
};

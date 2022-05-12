import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Read, Settings, Listen, Explore } from 'screens';
import {
  Read as ReadIcon,
  Listen as ListenIcon,
  Explore as ExploreIcon,
  Settings as SettingsIcon,
} from 'ui';
import { SvgProps } from 'react-native-svg';
const Tab = createBottomTabNavigator();

const getRouteIcon = (
  routeName: string,
): (({ color, ...props }: SvgProps) => JSX.Element) => {
  let Icon = ReadIcon;
  switch (routeName) {
    case 'Read':
      Icon = ReadIcon;
      break;
    case 'Explore':
      Icon = ExploreIcon;
      break;
    case 'Listen':
      Icon = ListenIcon;
      break;
    case 'Settings':
      Icon = SettingsIcon;
      break;
  }

  return Icon;
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const Icon = getRouteIcon(route.name);
          return <Icon color={color} />;
        },
      })}>
      <Tab.Screen name="Read" component={Read} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Listen" component={Listen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

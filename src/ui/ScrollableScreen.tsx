import React from 'react';
import { ScrollView } from 'react-native';
import { View } from './View';

type Props = {
  children: React.ReactNode;
};

export const ScrollableScreen = ({ children }: Props) => (
  <View
    justifyContent="center"
    flexDirection="column"
    paddingHorizontal="m"
    flex={1}
    bg="background">
    <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
  </View>
);

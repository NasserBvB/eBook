import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'ui';

interface IProps {
  type?: 'space' | 'line';
}

export const Divider = ({ type = 'space' }: IProps) => {
  const {
    colors: { card },
  } = useTheme();
  return <View style={styles(card, type).divider} />;
};

const styles = (card: string, type: 'space' | 'line') =>
  StyleSheet.create({
    divider: {
      borderBottomColor: card,
      ...(type === 'line' && { backgroundColor: card }),
      marginBottom: 5,
      marginTop: 5,
      height: 2,
    },
  });

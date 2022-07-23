import { StackHeaderProps } from '@react-navigation/stack';
import { useAuth } from 'core';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from 'ui';

export default function StackHeader(_props: StackHeaderProps) {
  const { currentQuestion, questions, coins } = useAuth();
  return (
    <View style={styles.container}>
      <View
        borderColor="grey1"
        borderWidth={1}
        style={styles.coin}
        paddingHorizontal="s"
        borderRadius={4}>
        <Text fontWeight="700" fontStyle="italic">
          {currentQuestion?.ordre} / {questions?.length}
        </Text>
      </View>
      <View
        borderColor="grey1"
        borderWidth={1}
        style={styles.coin}
        paddingHorizontal="s"
        borderRadius={4}>
        <Text fontWeight="700" fontStyle="italic">
          {coins}
        </Text>
        <Image
          style={styles.coinIcon}
          source={require('../../assets/coin.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});

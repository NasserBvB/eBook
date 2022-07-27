import { StackHeaderProps } from '@react-navigation/stack';
import { useAuth } from 'core';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Pressable, Text, View } from 'ui';

export default function StackHeader(_props: StackHeaderProps) {
  const { currentQuestion, coins, showAd } = useAuth();
  const showAdModal = () => showAd(true);
  return (
    <View style={styles.container}>
      <View
        backgroundColor="primary"
        style={styles.coin}
        p="s"
        borderRadius={4}>
        <Text fontWeight="700" fontStyle="italic" color="white">
          Level {currentQuestion?.ordre}
        </Text>
      </View>
      <View flexDirection="row">
        <View
          backgroundColor="primary"
          style={styles.coin}
          p="s"
          borderRadius={4}>
          <Text fontWeight="700" color="white" fontStyle="italic">
            {coins}
          </Text>
          <Image
            style={styles.coinIcon}
            source={require('../../assets/coin.png')}
          />
        </View>
        <View
          justifyContent="center"
          alignItems="center"
          marginLeft="s"
          style={styles.addCoinContainer}
          borderRadius={4}>
          <Pressable onPress={showAdModal}>
            <Image
              style={styles.addCoin}
              source={require('../../assets/add.png')}
            />
          </Pressable>
        </View>
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
  addCoinContainer: {
    backgroundColor: '#fcbd41',
  },
  addCoin: {
    width: 40,
    height: 40,
  },
  coinIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});

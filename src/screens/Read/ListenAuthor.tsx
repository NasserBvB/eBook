import React from 'react';
import { Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text, MediaHeadphone, View } from 'ui';

export default function ListenAuthor() {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      useAngle
      angle={180}
      style={styles.container}
      colors={['#BD344B', '#082440']}>
      <Text style={styles.text} color="white" fontWeight="800" fontSize={24}>
        Listen to the Author
      </Text>
      <View flexDirection="row" alignItems="center">
        <View alignItems="center">
          <Image
            style={styles.avatar}
            source={{ uri: 'https://i.pravatar.cc/300', height: 50, width: 50 }}
          />
          <Text color="white" fontSize={10}>
            Name surname
          </Text>
        </View>
        <MediaHeadphone />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
  },
  text: {
    maxWidth: '50%',
  },
  container: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 23,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});

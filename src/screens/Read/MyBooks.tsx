import { useVolumes } from 'api';
import React from 'react';
import { FlatList, Image, ListRenderItem, StyleSheet } from 'react-native';
import {
  View,
  MyBooks as MyBooksIcon,
  Filter,
  Text,
  Divider,
  Pressable,
} from 'ui';
import { VolumeType } from '../../../types/Volume';
import { getDimensions } from 'utils';

const renderItem: ListRenderItem<VolumeType> = ({ item }) => {
  if (!item?.volumeInfo?.imageLinks?.thumbnail) {
    return null;
  }

  const {
    id,
    volumeInfo: {
      authors,
      title,
      imageLinks: { thumbnail },
    },
  } = item;

  const { width } = getDimensions();

  return (
    <View
      key={id}
      padding="m"
      style={styles.bookContainer}
      marginHorizontal="m"
      marginVertical="m"
      backgroundColor="white">
      <Pressable>
        <Image
          style={styles.bookCover}
          source={{
            uri: 'https' + thumbnail.substr(4),
          }}
        />
        <View alignSelf="flex-start" maxWidth={width * 0.65}>
          <Text color="black" fontWeight="700">
            {title}
          </Text>
          <Text color="grey2" fontWeight="700">
            {authors?.join(', ')}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default function MyBooks() {
  const { data } = useVolumes();

  return (
    <View paddingBottom="xl">
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <MyBooksIcon />
        <Filter />
      </View>
      <FlatList
        style={styles.bookList}
        renderItem={renderItem}
        data={data || []}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider type="line" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bookList: {
    // marginVertical: 10,
  },
  bookContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 8,
    borderRadius: 10,
    borderColor: '#E6E6E6',
    borderWidth: 3,
  },
  bookCover: {
    width: (() => getDimensions().width * 0.7)(),
    height: (() => getDimensions().height * 0.5)(),
    borderRadius: 5,
    borderColor: '#E6E6E6',
    borderWidth: 1,
  },
});

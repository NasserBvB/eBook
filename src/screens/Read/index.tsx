import React from 'react';
import { ScrollableScreen } from 'ui';
import Filter from './Filter';
import ListenAuthor from './ListenAuthor';
import MyBooks from './MyBooks';

export const Read = () => {
  return (
    <ScrollableScreen>
      <Filter />
      <MyBooks />
      <ListenAuthor />
    </ScrollableScreen>
  );
};

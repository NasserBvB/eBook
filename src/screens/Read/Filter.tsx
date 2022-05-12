import React from 'react';
import { useForm } from 'react-hook-form';
import { HeartSolid, Input, Microphone, Search, View } from 'ui';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  searchString: string;
};

const schema = yup.object().shape({
  searchString: yup.string(),
});

export default function Filter() {
  const { control, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const searchString = () => formState.touchedFields.searchString;

  return (
    <View flexDirection="row" justifyContent="space-evenly" marginTop="m">
      <View alignItems="flex-start" flex={1}>
        <HeartSolid />
      </View>
      <View position="relative" flex={5}>
        {!searchString() && (
          <View position="absolute" top="15%" left="5%">
            <Search />
          </View>
        )}
        <Input
          control={control}
          name="searchString"
          placeholder="         Search"
        />
        <View position="absolute" left="85%" top="15%">
          <Microphone />
        </View>
      </View>
    </View>
  );
}

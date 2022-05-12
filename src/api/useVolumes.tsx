import { useQuery } from 'react-query';
import { client } from './client';
import { API_KEY } from '@env';
import { VolumeType } from '../../types/Volume';

const getVolumes = async () => {
  const { data } = await client.get('/books/v1/volumes', {
    params: {
      q: 'science+intitle:philosophie',
      key: API_KEY,
      maxResults: 40,
    },
  });

  return data.items;
};

export function useVolumes() {
  return useQuery<VolumeType[]>('volumes', getVolumes);
}

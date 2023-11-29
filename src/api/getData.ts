import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';

export default async function getData(collection: string) {
  await axios
    .get(`https://localhost/api/${collection}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    })
    .then((res) => res.data.item);
}
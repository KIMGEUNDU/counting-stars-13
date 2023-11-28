import axios from 'axios';

export default async function getData(collection: string) {
  await axios
    .get(`https://localhost/api/${collection}`)
    .then((res) => res.data.item);
}
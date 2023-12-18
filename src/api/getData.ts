import axiosInstance from '@/utils/axiosInstance';

export default async function getData(collection: string) {
  await axiosInstance.get(`/${collection}`).then((res) => res.data.item);
}

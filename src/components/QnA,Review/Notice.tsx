import axiosInstance from '@/utils/axiosInstance';
import { sortQnaReviewData } from '@/utils/getProductsData';
import EachPost from 'components/EachPost';
import { useEffect, useState } from 'react';

export default function Notice({ collection }: { collection: string }) {
  const [notice, setNotice] = useState<Replies[]>([]);

  // 공지 데이터
  useEffect(() => {
    const getReplies = async () => {
      const res = await axiosInstance.get('/posts?type=notice');

      const sortNotice = sortQnaReviewData(res.data.item.item);

      setNotice(sortNotice);
    };

    getReplies();
  }, []);

  return notice.map((v, i) => (
    <EachPost
      key={i}
      link={
        collection === 'qna' ? `/qnaNotice/${v._id}` : `/reviewNotice/${v._id}`
      }
      tag={(v as Replies).extra?.tag}
      title={(v as Replies).title}
      writer="별해달"
      date={(v as Replies).updatedAt?.split(' ')[0]}
      collection={collection}
    />
  ));
}

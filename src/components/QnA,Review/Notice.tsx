import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import { sortQnaReviewData } from '@/utils/getProductsData';
import axios from 'axios';
import EachPost from 'components/EachPost';
import { useEffect, useState } from 'react';

export default function Notice({ collection }: { collection: string }) {
  const [notice, setNotice] = useState<Replies[]>([]);

  // 공지 데이터
  useEffect(() => {
    const getReplies = async () => {
      const res = await axios.get('https://localhost/api/replies/all', {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      const sortNotice = sortQnaReviewData(res.data.item);
      const filterNotice = sortNotice.filter((v) => v.extra?.type === 'notice');

      setNotice(filterNotice);
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
      title={
        (v as Replies).extra?.title
          ? (v as Replies).extra?.title
          : (v as Replies).content
      }
      writer="별해달"
      date={(v as Replies).createdAt}
      collection={collection}
    />
  ));
}

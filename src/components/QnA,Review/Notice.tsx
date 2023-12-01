import { dummyData } from '@/store/dummyData';
import { sortQnaReviewData } from '@/utils/getProductsData';
import EachPost from 'components/EachPost';

export default function Notice({ collection }: { collection: string }) {
  // 공지사항
  const { notice } = dummyData();

  // id순으로 정렬
  const sortNotice = sortQnaReviewData(notice);

  return sortNotice.map((v, i) => (
    <EachPost
      key={i}
      link={`/notice/${v._id}`}
      tag={v.tag ? v.tag : ''}
      title={v.title}
      writer={v.writer}
      date={v.date}
      collection={collection}
    />
  ));
}

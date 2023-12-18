import PageMap from '@/components/PageMap';
import PaginationNumber from '@/components/PaginationNumber';
import Notice from '@/components/QnA,Review/Notice';
import Thead from '@/components/QnA,Review/Thead';
import WriterButton from '@/components/QnA,Review/WriterButton';
import { useData } from '@/store/useData';
import { useForm } from '@/store/useForm';
import axiosInstance from '@/utils/axiosInstance';
import { dateSortQnaReviewData } from '@/utils/getProductsData';
import { setAnonymousName } from '@/utils/setAnonymousName';
import EachPost from 'components/EachPost';
import PageMainTitle from 'components/PageMainTitle';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Qna() {
  const { setAttachFile } = useForm();
  const {
    allData,
    setAllData,
    pageData,
    setPageData,
    setDataLength,
    dataLengthPage,
    setDataLengthPage,
    setPageNumber,
    setSelectId,
    setSelectData,
    setSelectOrderId,
  } = useData();

  // 새로 Qna 페이지 들어올때는 리셋
  useEffect(() => {
    setSelectId(null);
    setSelectData(null);
    setSelectOrderId(null);
    setAttachFile('');
  }, []);

  useEffect(() => {
    const getReplies = async () => {
      const res = await axiosInstance.get('/posts?type=qna');

      const sortQna = dateSortQnaReviewData(res.data.item.item);

      setAllData(sortQna);
      setDataLength(sortQna.length);
      setPageNumber(1);
      setPageData(sortQna.slice(0, 10));
      setDataLengthPage(Math.ceil(sortQna.length / 10));
    };

    getReplies();
  }, [setAllData]);

  return (
    <>
      <Helmet>
        <title>Q&A</title>
      </Helmet>

      <main className="min-h-[60vh]">
        <PageMap route="qna" />
        <PageMainTitle title="상품 Q&A" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300 relative">
          <table className="w-full">
            <Thead info="상품 정보" />
            <tbody className="text-center">
              <Notice collection="qna" />
              {allData &&
                pageData &&
                pageData.map((v, i) => (
                  <EachPost
                    key={i}
                    tag={allData.length - i}
                    title={(v as Replies).title}
                    writer={setAnonymousName((v as Replies).user?.name)}
                    date={(v as Replies).updatedAt?.split(' ')[0]}
                    itemLink={(v as Replies).product_id}
                    item={(v as Replies).product?.name}
                    itemImg={(v as Replies).product?.image}
                    link={`/qna-detail/${v._id}`}
                    attachFile={
                      (v as Replies).extra?.attachFile
                        ? (v as Replies).extra?.attachFile
                        : ''
                    }
                  />
                ))}
            </tbody>
          </table>
          <PaginationNumber length={allData ? dataLengthPage : 1} />
          <WriterButton link="/write-qna" />
        </section>
      </main>
    </>
  );
}

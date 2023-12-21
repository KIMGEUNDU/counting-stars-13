import PageMap from '@/components/PageMap';
import PaginationNumber from '@/components/PaginationNumber';
import Notice from '@/components/QnA,Review/Notice';
import Thead from '@/components/QnA,Review/Thead';
import WriterButton from '@/components/QnA,Review/WriterButton';
import { useData } from '@/store/useData';
import { useForm } from '@/store/useForm';
import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import EachPost from 'components/EachPost';
import PageMainTitle from 'components/PageMainTitle';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Review() {
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

  const getReview = () => {
    return axiosInstance.get(`/replies/all`);
  };

  const { isLoading, data } = useQuery({
    queryKey: ['replies'],
    queryFn: getReview,
    staleTime: 5000,
  });

  // 새로 Review 페이지 들어올때는 리셋
  useEffect(() => {
    setSelectId(null);
    setSelectData(null);
    setSelectOrderId(null);
    setAttachFile('');
  }, []);

  // 데이터 집어넣기
  useEffect(() => {
    setAllData(data?.data.item);
    setDataLength(data?.data.item.length);
    setPageData(data?.data.item.slice(0, 10));
    setDataLengthPage(Math.ceil(data?.data.item.length / 10));
    setPageNumber(1);
  }, [data?.data.item, setAllData]);

  return (
    <>
      <Helmet>
        <title>Review</title>
      </Helmet>

      <main className="min-h-[60vh]">
        <PageMap route="review" routeName="Review" />
        <PageMainTitle title="상품 후기" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300 relative">
          <table className="w-full">
            <Thead info="상품 정보" score="평점" />
            <tbody className="text-center">
              <Notice collection="review" />
              {allData &&
                pageData &&
                pageData.map((v, i) => (
                  <EachPost
                    key={i}
                    tag={allData.length - i}
                    title={(v as Replies).extra?.title}
                    grade={(v as Replies).rating}
                    writer={(v as Replies).user?.name}
                    date={(v as Replies).createdAt?.split(' ')[0]}
                    itemLink={(v as Replies).product?._id}
                    item={(v as Replies).product?.name}
                    itemImg={(v as Replies).product?.image}
                    link={`/review-detail/${v._id}`}
                    collection="review"
                    attachFile={
                      (v as Replies).extra?.attachFile
                        ? (v as Replies).extra?.attachFile
                        : ''
                    }
                  />
                ))}
            </tbody>
          </table>
          {isLoading && (
            <p className="text-center pb-5">데이터를 불러오는 중입니다</p>
          )}
          <PaginationNumber length={allData ? dataLengthPage : 1} />
          <WriterButton link="/write-review" />
        </section>
      </main>
    </>
  );
}

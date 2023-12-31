import PageMap from '@/components/PageMap';
import Notice from '@/components/qnaAndReview/Notice';
import SearchBar from '@/components/qnaAndReview/SearchBar';
import Thead from '@/components/qnaAndReview/Thead';
import WriterButton from '@/components/qnaAndReview/WriterButton';
import QueryPagination from '@/components/QueryPagination';
import { useData } from '@/store/useData';
import { useForm } from '@/store/useForm';
import axiosInstance from '@/utils/axiosInstance';
import { setAnonymousName } from '@/utils/setAnonymousName';
import { useQuery } from '@tanstack/react-query';
import EachPost from 'components/EachPost';
import PageMainTitle from 'components/PageMainTitle';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Qna() {
  const { setAttachFile } = useForm();
  const {
    allData,
    setAllData,
    dataLength,
    setDataLength,
    dataLengthPage,
    setDataLengthPage,
    setSelectId,
    setSelectData,
    setSelectOrderId,
    pageNumber,
    currentPage,
  } = useData();

  const getQna = (pageNum: number) => {
    return axiosInstance.get(`/posts?type=qna&page=${pageNum}&limit=10`);
  };

  const { isLoading, data } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => getQna(currentPage),
    staleTime: 5000,
  });

  // 새로 Qna 페이지 들어올때는 리셋
  useEffect(() => {
    setSelectId(null);
    setSelectData(null);
    setSelectOrderId(null);
    setAttachFile('');
  }, []);

  useEffect(() => {
    setAllData(data?.data.item);
    setDataLength(data?.data.pagination.total);
    setDataLengthPage(Math.ceil(data?.data.pagination.total / 10));
  }, [data?.data.item, setAllData]);

  return (
    <>
      <Helmet>
        <title>Q&A</title>
      </Helmet>

      <main className="min-h-[60vh]">
        <PageMap route="qna" routeName="Qna" />
        <div className="center flex justify-between">
          <PageMainTitle title="상품 Q&A" />
          <SearchBar />
        </div>
        <section className="w-4/5 mx-auto border-t-2 border-gray-300 relative">
          <table className="w-full">
            <Thead info="상품 정보" />
            <tbody className="text-center">
              <Notice collection="qna" />
              {allData &&
                allData.map((v, i) => (
                  <EachPost
                    key={i}
                    tag={dataLength - i}
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
          {isLoading && (
            <p className="text-center pb-5">데이터를 불러오는 중입니다</p>
          )}
          {allData && allData.length === 0 && (
            <p className="text-center py-5">검색 결과가 없습니다 : ）</p>
          )}
          {pageNumber > 0 && dataLengthPage > 0 && (
            <QueryPagination length={allData ? dataLengthPage : 1} />
          )}
          <WriterButton link="/write-qna" />
        </section>
      </main>
    </>
  );
}

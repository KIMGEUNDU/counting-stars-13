import getData from '@/api/getData';
import Thead from '@/components/QnA,Review/Thead';
import WriterButton from '@/components/QnA,Review/WriterButton';
import { useData } from '@/store/useData';
import { useQuery } from '@tanstack/react-query';
import EachPost from 'components/EachPost';
import PageMainTitle from 'components/PageMainTitle';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Review() {
  const { data, setData } = useData();
  const { data: fetchData, isLoading } = useQuery(['replies'], () =>
    getData('replies')
  );

  useEffect(() => {
    if (fetchData) {
      // setData(fetchData);
      console.log(fetchData);
    }
  }, [fetchData, setData]);

  return (
    <>
      <Helmet>
        <title>Review</title>
      </Helmet>

      <main className="min-h-[60vh]">
        <PageMainTitle title="상품 후기" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300">
          <table className="w-full">
            <Thead info="상품 정보" score="평점" />
            <tbody className="text-center">
              <EachPost
                tag="3"
                title="이벤트 타이틀"
                writer="윤**"
                date="2023-11-21 17:11:18"
                item="당근 와플"
                grade="⭐⭐⭐⭐⭐"
                link="/review-detail"
              />
              <EachPost
                tag="2"
                title="이벤트 타이틀"
                writer="윤**"
                date="2023-11-21 17:11:18"
                item="멍피자 멍치킨 피크닉 세트"
                grade="⭐⭐⭐⭐⭐"
                link="/review-detail"
              />
              <EachPost
                tag="1"
                title="이벤트 타이틀"
                writer="윤**"
                date="2023-11-21 17:11:18"
                item="한우 소간 육포"
                grade="⭐⭐⭐⭐⭐"
                link="/review-detail"
              />
            </tbody>
          </table>
          <WriterButton link="/write-review" />
        </section>
      </main>
    </>
  );
}

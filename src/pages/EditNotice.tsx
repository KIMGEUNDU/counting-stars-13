import PageMainTitle from '@/components/PageMainTitle';
import FormCkEditor from '@/components/qnaAndReview/FormCkEditor';
import FormTitleInput from '@/components/qnaAndReview/FormTitleInput';
import WriteButton from '@/components/qnaAndReview/WriteButton';
import { useData } from '@/store/useData';
import { useForm } from '@/store/useForm';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditNotice() {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const { content, attachFile, setContent, setAttachFile } = useForm();
  const { setAllData, setPageData } = useData();
  const { id } = useParams();

  // Notice 등록하기 (Axios)
  const handleRegistNotice = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      toast('내용을 입력해주세요 :)', {
        icon: '⭐',
        duration: 2000,
      });
    } else if (titleRef.current) {
      const editNotice = {
        title: titleRef.current.value,
        content,
        extra: {
          tag: '공지',
          attachFile: attachFile,
        },
      };

      const response = await axiosInstance.patch(`/posts/${id}`, editNotice);

      if (response.data.ok === 1) {
        toast('수정되었습니다 :)', {
          icon: '⭐',
          duration: 2000,
        });

        navigate(`/qnaNotice/${response.data.updated._id}`);
      }
    }
  };

  // 데이터 가져오기
  useEffect(() => {
    const getCurrentQnaData = async () => {
      const res = await axiosInstance.get(`/posts/${id}`);

      const currentNotice = res.data.item;

      if (titleRef && titleRef.current) {
        titleRef.current.value = currentNotice.title;
        setContent(currentNotice.content);
        if (currentNotice.extra.attachFile) {
          setAttachFile(currentNotice.extra.attachFile);
        }
      }
    };

    getCurrentQnaData();
  }, [setContent]);

  // data, pageData 리셋
  useEffect(() => {
    setAllData([]);
    setPageData([]);
  }, []);

  return (
    <>
      <Helmet>
        <title>Q&A 작성하기</title>
      </Helmet>

      <main>
        <PageMainTitle title="공지 등록" />
        <form className="w-4/5 mx-auto" onSubmit={handleRegistNotice}>
          <table className="w-full border-t border-gray-300">
            <tbody>
              <FormTitleInput titleRef={titleRef} />
              <FormCkEditor type="수정" />
              <tr className="border-b">
                <td className="bg-gray-50 py-3">첨부파일</td>
                {attachFile && (
                  <td className="pl-5 flex gap-3">
                    <img
                      className="w-10"
                      src={attachFile}
                      alt="첨부파일 있음"
                    />
                    <button type="button" onClick={() => setAttachFile('')}>
                      지우기
                    </button>
                  </td>
                )}
                {!attachFile && <td className="pl-5">없음</td>}
              </tr>
            </tbody>
          </table>
          <WriteButton link="-1" />
        </form>
      </main>
    </>
  );
}

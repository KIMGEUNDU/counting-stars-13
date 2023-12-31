import PageMainTitle from '@/components/PageMainTitle';
import FormCkEditor from '@/components/qnaAndReview/FormCkEditor';
import FormTitleInput from '@/components/qnaAndReview/FormTitleInput';
import WriteButton from '@/components/qnaAndReview/WriteButton';
import { useForm } from '@/store/useForm';
import axiosInstance from '@/utils/axiosInstance';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function WriteNotice() {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const { content, attachFile } = useForm();

  // Notice 등록하기 (Axios)
  const handleRegistNotice = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      toast('내용을 입력해주세요 :)', {
        icon: '⭐',
        duration: 2000,
      });
    } else if (titleRef.current) {
      const newNotice = {
        title: titleRef.current.value,
        type: 'notice',
        content,
        extra: {
          tag: '공지',
          attachFile: attachFile,
        },
      };

      const response = await axiosInstance.post('/posts', newNotice);

      if (response.data.ok === 1) {
        toast('업로드하였습니다 :)', {
          icon: '⭐',
          duration: 2000,
        });

        navigate(`/qnaNotice/${response.data.item._id}`);
      }
    }
  };

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
              <FormCkEditor />
            </tbody>
          </table>
          <WriteButton link="-1" />
        </form>
      </main>
    </>
  );
}

export default WriteNotice;

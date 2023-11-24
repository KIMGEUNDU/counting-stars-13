import PageMainTitle from '@/components/PageMainTitle';
import FormAttachFile from '@/components/QnA,Review/FormAttachFile';
import FormCkEditor from '@/components/QnA,Review/FormCkEditor';
import FormTitleInput from '@/components/QnA,Review/FormTitleInput';
import ProductSelect from '@/components/QnA,Review/ProductSelect';
import WriteButton from '@/components/QnA,Review/WriteButton';
import { useForm } from '@/store/useForm';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function WriteQna() {
  const { title, content, attachFile } = useForm();

  const handleRegistQna = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      toast('내용을 입력해주세요 :)', {
        icon: '⭐',
        duration: 2000,
      });
    }

    const newQna = {
      title,
      content,
      attachFile,
    };

    try {
      // {ok: 0, message: 'authorization 헤더가 없습니다.'}
      // 아마 로그인안해서 에러나는 듯?
      await axios.post('https://localhost/api/replies', newQna);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Q&A 작성하기</title>
      </Helmet>

      <main>
        <PageMainTitle title="상품 Q&A" />
        <form className="w-4/5 mx-auto" onSubmit={handleRegistQna}>
          <ProductSelect title="상품 선택" />
          <table className="w-full border-t border-gray-300">
            <tbody>
              <FormTitleInput />
              <FormCkEditor />
              <FormAttachFile />
            </tbody>
          </table>
          <WriteButton link="/qna" />
        </form>
      </main>
    </>
  );
}

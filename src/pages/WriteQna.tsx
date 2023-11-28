import PageMainTitle from '@/components/PageMainTitle';
import FormAttachFile from '@/components/QnA,Review/FormAttachFile';
import FormCkEditor from '@/components/QnA,Review/FormCkEditor';
import FormTitleInput from '@/components/QnA,Review/FormTitleInput';
import Modal from '@/components/QnA,Review/Modal';
import ProductSelect from '@/components/QnA,Review/ProductSelect';
import WriteButton from '@/components/QnA,Review/WriteButton';
import { useData } from '@/store/useData';
import { useForm } from '@/store/useForm';
import axios from 'axios';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function WriteQna() {
  const { title, content, attachFile } = useForm();
  const { modal, setModal, selectId, setSelectId, setSelectData } = useData();
  const navigate = useNavigate();

  // Qna 등록하기
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
      selectId,
    };

    console.log(title);
    console.log(content);
    console.log(attachFile);
    console.log(selectId);

    // {ok: 0, message: 'authorization 헤더가 없습니다.'}
    // 아마 로그인안해서 에러나는 듯?
    // replies는 구매후기이니 카테고리 생기면 변경
    const response = await axios.post('https://localhost/api/replies', newQna);

    if (response.data.ok === 1) {
      toast('업로드하였습니다 :)', {
        icon: '⭐',
        duration: 2000,
      });

      navigate(`/qna-detail/${response.data.id}`);
    }
  };

  // Esc키로 모달창 닫기
  if (modal) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setModal(!modal);
      }
    });
  }

  // 새로 Qna 페이지 들어올때는 리셋, 왜 안돼?
  useEffect(() => {
    if (selectId) {
      setSelectId(null);
      setSelectData(null);
    }
  }, [selectId, setSelectData, setSelectId]);

  return (
    <>
      <Helmet>
        <title>Q&A 작성하기</title>
      </Helmet>

      <main>
        <PageMainTitle title="상품 Q&A" />
        <form className="w-4/5 mx-auto" onSubmit={handleRegistQna}>
          <ProductSelect title="상품 선택" onClick={() => setModal(!modal)} />
          {modal && <Modal onClick={() => setModal(!modal)} />}
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

import PageMainTitle from '@/components/PageMainTitle';
import FormCkEditor from '@/components/QnA,Review/FormCkEditor';
import FormTitleInput from '@/components/QnA,Review/FormTitleInput';
import Modal from '@/components/QnA,Review/Modal';
import ProductSelect from '@/components/QnA,Review/ProductSelect';
import WriteButton from '@/components/QnA,Review/WriteButton';
import { useData } from '@/store/useData';
import { useForm } from '@/store/useForm';
import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditQna() {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const { content, attachFile, setContent } = useForm();
  const {
    modal,
    setModal,
    selectId,
    selectData,
    setSelectId,
    setAllData,
    setPageData,
  } = useData();
  const { id } = useParams();

  // Qna 등록하기 (Axios)
  const handleRegistQna = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      toast('내용을 입력해주세요 :)', {
        icon: '⭐',
        duration: 2000,
      });
    } else if (!selectData) {
      toast('상품을 선택해주세요 :)', {
        icon: '⭐',
        duration: 2000,
      });
    } else if (titleRef.current) {
      const editQna = {
        title: titleRef.current.value,
        content,
        product_id: selectId,
        extra: {
          attachFile: attachFile,
          product_name: selectData.name,
          product_image: selectData.detailImages[0],
        },
      };

      const response = await axios.patch(
        `https://localhost/api/posts/${id}`,
        editQna,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN()}`,
          },
        }
      );

      if (response.data.ok === 1) {
        toast('수정되었습니다 :)', {
          icon: '⭐',
          duration: 2000,
        });

        navigate(`/qna-detail/${id}`);
      }
    }
  };

  // Esc키로 모달창 닫기
  if (modal) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setModal(!modal);
      }
    });

    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  // 데이터 가져오기
  useEffect(() => {
    const getCurrentQnaData = async () => {
      const res = await axios.get(`https://localhost/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      const currentQna = res.data.item;

      if (titleRef && titleRef.current) {
        titleRef.current.value = currentQna.title;
        setContent(currentQna.content);
        setSelectId(currentQna.product_id);
      }
    };

    getCurrentQnaData();
  }, []);

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
        <PageMainTitle title="상품 Q&A" />
        <form className="w-4/5 mx-auto" onSubmit={handleRegistQna}>
          <ProductSelect title="상품 선택" onClick={() => setModal(!modal)} />
          {modal && <Modal onClick={() => setModal(!modal)} />}
          <table className="w-full border-t border-gray-300">
            <tbody>
              <FormTitleInput titleRef={titleRef} />
              <FormCkEditor />
            </tbody>
          </table>
          <WriteButton link="/qna" />
        </form>
      </main>
    </>
  );
}

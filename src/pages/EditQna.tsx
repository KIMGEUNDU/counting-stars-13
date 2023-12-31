import PageMainTitle from '@/components/PageMainTitle';
import FormCkEditor from '@/components/qnaAndReview/FormCkEditor';
import FormTitleInput from '@/components/qnaAndReview/FormTitleInput';
import Modal from '@/components/qnaAndReview/Modal';
import ProductSelect from '@/components/qnaAndReview/ProductSelect';
import WriteButton from '@/components/qnaAndReview/WriteButton';
import { useData } from '@/store/useData';
import { useForm } from '@/store/useForm';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditQna() {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const { content, attachFile, setContent, setAttachFile } = useForm();
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

      const response = await axiosInstance.patch(`/posts/${id}`, editQna);

      if (response.data.ok === 1) {
        toast('수정되었습니다 :)', {
          icon: '⭐',
          duration: 2000,
        });

        navigate(`/qna-detail/${response.data.updated._id}`);
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
      const res = await axiosInstance.get(`/posts/${id}`);

      const currentQna = res.data.item;

      if (titleRef && titleRef.current) {
        titleRef.current.value = currentQna.title;
        setContent(currentQna.content);
        setSelectId(currentQna.product_id);
        if (currentQna.extra.attachFile) {
          setAttachFile(currentQna.extra.attachFile);
        }
      }
    };

    getCurrentQnaData();
  }, [setContent, setSelectId]);

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
          <ProductSelect title="수정" />
          {modal && <Modal onClick={() => setModal(!modal)} />}
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
          <WriteButton link="/qna" />
        </form>
      </main>
    </>
  );
}

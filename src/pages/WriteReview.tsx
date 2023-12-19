import PageMainTitle from '@/components/PageMainTitle';
import FormCkEditor from '@/components/QnA,Review/FormCkEditor';
import FormTitleInput from '@/components/QnA,Review/FormTitleInput';
import ModalSelectOrder from '@/components/QnA,Review/ModalSelectOrder';
import ProductSelect from '@/components/QnA,Review/ProductSelect';
import WriteButton from '@/components/QnA,Review/WriteButton';
import { useData } from '@/store/useData';
import { useForm } from '@/store/useForm';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function WriteReview() {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const scoreRef = useRef<HTMLSelectElement | null>(null);
  const { content, attachFile, setAttachFile } = useForm();

  const {
    modal,
    setModal,
    setSelectId,
    selectData,
    setSelectData,
    selectOrderId,
    setSelectOrderId,
  } = useData();
  // 로그인유저정보

  // Review 등록하기 (Axios)
  const handleRegistReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      toast('내용을 입력해주세요 :)', {
        icon: '💛',
        duration: 2000,
      });
    } else if (!selectData) {
      toast('상품을 선택해주세요 :)', {
        icon: '⭐',
        duration: 2000,
      });
    } else if (selectData && selectOrderId && titleRef.current) {
      const newReview = {
        content,
        rating: scoreRef.current?.value,
        product_id: selectOrderId,
        extra: {
          type: 'review',
          title: titleRef.current.value,
          attachFile: attachFile,
        },
      };

      const response = await axiosInstance.post('/replies', newReview);

      if (response.data.ok === 1) {
        toast('업로드하였습니다 :)', {
          icon: '⭐',
          duration: 2000,
        });

        navigate(`/review-detail/${response.data.item._id}`);
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

  // 새로 Review 페이지 들어올때는 리셋
  useEffect(() => {
    setSelectId(null);
    setSelectData(null);
    setSelectOrderId(null);
    setAttachFile('');
  }, []);

  return (
    <>
      <Helmet>
        <title>Review 작성하기</title>
      </Helmet>

      <main>
        <PageMainTitle title="상품 사용 후기" />
        <form className="w-4/5 mx-auto" onSubmit={handleRegistReview}>
          <ProductSelect
            title="주문 상품 선택"
            onClick={() => setModal(!modal)}
          />
          {modal && <ModalSelectOrder onClick={() => setModal(!modal)} />}
          <table className="w-full border-t border-gray-300">
            <tbody>
              <FormTitleInput titleRef={titleRef} />
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="inputGrade">평점</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="flex flex-row p-3">
                  <select name="grade" id="inputGrade" ref={scoreRef} required>
                    <option value="5" selected>
                      ⭐⭐⭐⭐⭐
                    </option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                  </select>
                </td>
              </tr>
              <FormCkEditor />
            </tbody>
          </table>
          <WriteButton link="/review" />
        </form>
      </main>
    </>
  );
}

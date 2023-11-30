import PageMainTitle from '@/components/PageMainTitle';
import FormAttachFile from '@/components/QnA,Review/FormAttachFile';
import FormCkEditor from '@/components/QnA,Review/FormCkEditor';
import FormTitleInput from '@/components/QnA,Review/FormTitleInput';
import ModalSelectOrder from '@/components/QnA,Review/ModalSelectOrder';
import ProductSelect from '@/components/QnA,Review/ProductSelect';
import WriteButton from '@/components/QnA,Review/WriteButton';
import { dummyData } from '@/store/dummyData';
import { useData } from '@/store/useData';
import { useForm } from '@/store/useForm';
import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import { writeDate } from '@/utils/writeDate';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function WriteReview() {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const { content, attachFile, setAttachFile } = useForm();
  const scoreRef = useRef<HTMLSelectElement | null>(null);
  const navigate = useNavigate();
  // const [modal, setModal] = useState(false);
  const {
    modal,
    setModal,
    setSelectId,
    selectData,
    setSelectData,
    selectOrderId,
    setSelectOrderId,
  } = useData();
  const { reviewData, setReviewData } = dummyData();
  // 로그인유저정보
  const { userInfo, setUserInfo } = useUserInfo();

  // Review 등록하기 (Axios)
  // const handleRegistAxiosReview = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!content) {
  //     toast('내용을 입력해주세요 :)', {
  //       icon: '💛',
  //       duration: 2000,
  //     });
  //   } else if (!selectData) {
  //     toast('상품을 선택해주세요 :)', {
  //       icon: '⭐',
  //       duration: 2000,
  //     });
  //   }
  //   if (userInfo && selectData && selectId) {
  //     const newReview = {
  //       _id: reviewData.length + 1,
  //       title,
  //       writer: userInfo.name,
  //       date: writeDate(),
  //       content,
  //       attachFile,
  //       grade: scoreRef.current?.value,
  //       productId: selectOrderId,
  //       productName: selectData.name,
  //       productPrice: selectData.price,
  //       productImg: selectData.detailImages[0],
  //     };

  //     const response = await axios.post(
  //       'https://localhost/api/replies',
  //       newReview,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${AUTH_TOKEN()}`,
  //         },
  //       }
  //     );

  //     if (response.data.ok === 1) {
  //       toast('업로드하였습니다 :)', {
  //         icon: '⭐',
  //         duration: 2000,
  //       });

  //       navigate(`/review-detail${newReview._id}`);
  //     }
  //   }
  // };

  // 리뷰 등록하기 DummyData
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
    }
    if (
      titleRef.current &&
      scoreRef.current &&
      userInfo &&
      selectData &&
      selectOrderId
    ) {
      const newReview = {
        _id: reviewData.length + 1,
        title: titleRef.current.value,
        writer: userInfo.name,
        date: writeDate(),
        content,
        attachFile,
        grade: Number(scoreRef.current.value),
        productId: selectOrderId,
        productName: selectData.name,
        productPrice: selectData.price,
        productImg: selectData.detailImages[0],
      };

      setReviewData(newReview);

      toast('업로드하였습니다 :)', {
        icon: '⭐',
        duration: 2000,
      });

      navigate(`/review-detail${newReview._id}`);
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

  // 새로 Review 페이지 들어올때는 리셋, 왜 안돼?
  useEffect(() => {
    setSelectId(null);
    setSelectData(null);
    setSelectOrderId(null);

    // 이건 됨
    setAttachFile('');
  }, []);

  // 로그인유저정보 받아오기
  useEffect(() => {
    async function getUsers() {
      const res = await axios.get(`https://localhost/api/users/${AUTH_ID()}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      setUserInfo(res.data.item);
    }

    getUsers();
  }, [setUserInfo]);

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
                    <option defaultValue="5">⭐⭐⭐⭐⭐</option>
                    <option defaultValue="4">⭐⭐⭐⭐</option>
                    <option defaultValue="3">⭐⭐⭐</option>
                    <option defaultValue="2">⭐⭐</option>
                    <option defaultValue="1">⭐</option>
                  </select>
                </td>
              </tr>
              <FormCkEditor />
              <FormAttachFile />
            </tbody>
          </table>
          <WriteButton link="/review" />
        </form>
      </main>
    </>
  );
}

import PageMainTitle from '@/components/PageMainTitle';
import FormAttachFile from '@/components/QnA,Review/FormAttachFile';
import FormCkEditor from '@/components/QnA,Review/FormCkEditor';
import FormTitleInput from '@/components/QnA,Review/FormTitleInput';
import Modal from '@/components/QnA,Review/Modal';
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

export default function WriteQna() {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const { content, attachFile } = useForm();
  const { modal, setModal, selectId, selectData, setData, setPageData } =
    useData();
  const { qnaData, setQnaData } = dummyData();
  const navigate = useNavigate();
  // 로그인유저정보
  const { userInfo, setUserInfo } = useUserInfo();

  // Qna 등록하기 (Axios)
  // const handleAxiosRegistQna = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!content) {
  //     toast('내용을 입력해주세요 :)', {
  //       icon: '⭐',
  //       duration: 2000,
  //     });
  //   } else if (!selectData) {
  //   toast('상품을 선택해주세요 :)', {
  //     icon: '⭐',
  //     duration: 2000,
  //   });
  // }

  // const newQna = {
  //   _id: qnaData.length + 1,
  //   title,
  //   writer: userInfo.name,
  //   date: writeDate(),
  //   content,
  //   attachFile,
  //   productId: selectId,
  //   productName: selectData.name,
  //   productPrice: selectData.price,
  //   productImg: selectData.detailImages[0],
  // };

  // if (userInfo && selectData && selectId) {
  //   // replies는 구매후기이니 카테고리 생기면 변경
  //   const response = await axios.post(
  //     'https://localhost/api/replies/',
  //     newQna,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${AUTH_TOKEN()}`,
  //       },
  //     }
  //   );

  //   if (response.data.ok === 1) {
  //     toast('업로드하였습니다 :)', {
  //       icon: '⭐',
  //       duration: 2000,
  //     });

  //     navigate(`/qna-detail/${newQna._id}`);
  //   }
  // }
  // };

  // Qna 등록하기 (DummyData)
  const handleRegistQna = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      toast('내용을 입력해주세요 :)', {
        icon: '⭐',
        duration: 2000,
      });
    } else if (!selectId) {
      toast('상품을 선택해주세요 :)', {
        icon: '⭐',
        duration: 2000,
      });
    }

    if (titleRef.current && userInfo && selectData && selectId) {
      const newQna = {
        _id: qnaData.length + 1,
        title: titleRef.current.value,
        writer: userInfo.name,
        date: writeDate(),
        content,
        attachFile,
        productId: selectId,
        productName: selectData.name,
        productPrice: selectData.price,
        productImg: selectData.detailImages[0],
      };

      setQnaData(newQna);

      toast('업로드하였습니다 :)', {
        icon: '⭐',
        duration: 2000,
      });

      navigate(`/qna-detail/${newQna._id}`);
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

  // data, pageData 리셋
  useEffect(() => {
    setData([]);
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
              <FormAttachFile />
            </tbody>
          </table>
          <WriteButton link="/qna" />
        </form>
      </main>
    </>
  );
}

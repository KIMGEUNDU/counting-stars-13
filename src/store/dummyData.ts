import { create } from 'zustand';

interface dummyData {
  qnaData: QnaReviewData[];
  notice: QnaReviewData[];
  reviewData: QnaReviewData[];
}

export const dummyData = create<dummyData>(() => ({
  qnaData: [
    {
      _id: '1',
      title: '배송일정문의',
      writer: '윤동주',
      date: '2023-10-23 10:23:27',
      content: '오늘 주문했는데 언제오나요',
      productId: 5,
      productName: "오리 핫도그 (대)",
      productPrice: 4500,
      productImg: "//ggaggamukja.com/web/product/small/202112/dd7df883482a33eeb35531357064785e.jpg",
    },
    {
      _id: '2',
      title: '재입고 언제 되나요',
      writer: '김건주',
      date: '2023-11-02 10:23:27',
      content: '재입고 예정있나요',
      productId: 70,
      productName: "가랜드 (로즈골드)",
      productPrice: 3500,
      productImg: "//ggaggamukja.com/web/product/small/202110/ab0d865765c60acb7226e41b45ca60ad.png",
    },
    {
      _id: '3',
      title: '배송지 변경 문의',
      writer: '이동호',
      date: '2023-11-03 10:23:27',
      content: '카카오톡 문의 드렸습니다',
      productId: 43,
      productName: "한우 소간 육포",
      productPrice: 4500,
      productImg: "//ggaggamukja.com/web/product/small/202207/85dee6196cd7c947a6252ee0131949e5.jpg",
    },
    {
      _id: '4',
      title: '계좌은행변경',
      writer: '장효윤',
      date: '2023-11-05 10:23:27',
      content: '우리은행으로 시켰는데 국민은행으로 변경하고싶습니다',
      productId: 5,
      productName: "오리 핫도그 (대)",
      productPrice: 4500,
      productImg: "//ggaggamukja.com/web/product/small/202112/dd7df883482a33eeb35531357064785e.jpg",
    },
  ],
  reviewData: [
    {
      _id: '1',
      title: '만족',
      writer: '장효윤',
      date: '2023-09-05 12:30:27',
      content: '까다로운아인데 잘 먹어요.',
      grade: 4,
      attachFile: 'blob:http://localhost:5173/a63853f1-d507-4d14-9834-2156c65fbd1f',
      productId: 43,
      productName: "가랜드 (로즈골드)",
      productPrice: 3500,
      productImg: "//ggaggamukja.com/web/product/small/202110/ab0d865765c60acb7226e41b45ca60ad.png",
    },
    {
      _id: '2',
      title: '재입고 언제 되나요',
      writer: '김건주',
      date: '2023-10-16 08:47:30',
      content: '잘먹고 용량도 괜찮습니다',
      grade: 5,
      attachFile: 'blob:http://localhost:5173/a63853f1-d507-4d14-9834-2156c65fbd1f',
      productId: 43,
      productName: "한우 소간 육포",
      productPrice: 4500,
      productImg: "//ggaggamukja.com/web/product/small/202207/85dee6196cd7c947a6252ee0131949e5.jpg",
    },
    {
      _id: '3',
      title: '너무 잘먹어요',
      writer: '이동호',
      date: '2023-10-25 10:23:27',
      content: '산책다녀와서 배고픈 것 같아줬는데 바로바로 너무 잘 먹네요^^ ㅋㅋ 좋아해요',
      grade: 5,
      productId: 5,
      productName: "오리 핫도그 (대)",
      productPrice: 4500,
      productImg: "//ggaggamukja.com/web/product/small/202112/dd7df883482a33eeb35531357064785e.jpg",
    },
  ],
  notice: [
    {
      _id: "1",
      tag: "공지",
      title: "별해달 5,000원 쇼핑 쿠폰 받기",
      writer: "별해달",
      date: "2023-03-08 10:30:53"
    },
    {
      _id: "2",
      tag: "공지",
      title: "카카오톡 채널 친구추가 EVENT",
      writer: "별해달",
      date: "2023-09-25 22:13:52"
    }
  ]
}));
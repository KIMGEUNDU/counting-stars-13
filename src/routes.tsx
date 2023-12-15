import { lazy } from 'react';
import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';
const Home = lazy(() => import('pages/Home'));
const RootLayout = lazy(() => import('layout/RootLayout'));
const Brand = lazy(() => import('pages/Brand'));
const Shop = lazy(() => import('pages/Shop'));
const NoticeDetail = lazy(() => import('pages/NoticeDetail'));
const WriteNotice = lazy(() => import('pages/WriteNotice'));
const EditNotice = lazy(() => import('./pages/EditNotice'));
const Qna = lazy(() => import('pages/Qna'));
const QnaDetail = lazy(() => import('pages/QnaDetail'));
const WriteQna = lazy(() => import('./pages/WriteQna'));
const EditQna = lazy(() => import('./pages/EditQna'));
const Review = lazy(() => import('pages/Review'));
const ReviewDetail = lazy(() => import('pages/ReviewDetail'));
const WriteReview = lazy(() => import('./pages/WriteReview'));
const EditMember = lazy(() => import('pages/EditMember'));
const Detail = lazy(() => import('pages/Detail'));
const Join = lazy(() => import('pages/Join'));
const Login = lazy(() => import('pages/Login'));
const FindId = lazy(() => import('pages/FindId'));
const FindPw = lazy(() => import('pages/FindPw'));
const MyCart = lazy(() => import('pages/MyCart'));
const MyShopping = lazy(() => import('pages/MyShopping'));
const MyOrder = lazy(() => import('pages/MyOrder'));
const MyOrderDetail = lazy(() => import('pages/MyOrderDetail'));
const Search = lazy(() => import('pages/Search'));
const Wish = lazy(() => import('pages/Wish'));
const Order = lazy(() => import('pages/Order'));
const MyBoard = lazy(() => import('pages/MyBoard'));

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="brand" element={<Brand />} />
      <Route path="shop/:id" element={<Shop />} />
      <Route path="qnaNotice/:id" element={<NoticeDetail />} />
      <Route path="reviewNotice/:id" element={<NoticeDetail />} />
      <Route path="write-notice" element={<WriteNotice />} />
      <Route path="edit-notice/:id" element={<EditNotice />} />
      <Route path="detail/:id" element={<Detail />} />
      <Route path="qna" element={<Qna />} />
      <Route path="qna-detail/:id" element={<QnaDetail />} />
      <Route path="edit-qna/:id" element={<EditQna />} />
      <Route path="write-qna" element={<WriteQna />} />
      <Route path="review" element={<Review />} />
      <Route path="review-detail/:id" element={<ReviewDetail />} />
      <Route path="write-review" element={<WriteReview />} />
      <Route path="search" element={<Search />} />

      <Route path="join" element={<Join />} />
      <Route path="edit" element={<EditMember />} />
      <Route path="login" element={<Login />} />
      <Route path="findid" element={<FindId />} />
      <Route path="findpw" element={<FindPw />} />

      <Route path="myCart" element={<MyCart />} />
      <Route path="myShopping" element={<MyShopping />} />
      <Route path="myOrder" element={<MyOrder />} />
      <Route path="myOrderDetail" element={<MyOrderDetail />} />
      <Route path="wish" element={<Wish />} />
      <Route path="order" element={<Order />} />
      <Route path="myBoard" element={<MyBoard />} />
    </Route>
  )
);

export default router;

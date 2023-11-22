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
const Community = lazy(() => import('pages/Community'));
const Qna = lazy(() => import('pages/Qna'));
const Review = lazy(() => import('pages/Review'));
const EditMember = lazy(() => import('pages/EditMember'));
const Detail = lazy(() => import('pages/Detail'));
const Join = lazy(() => import('pages/Join'));
const Login = lazy(() => import('pages/Login'));
const FindId = lazy(() => import('pages/FindId'));
const FindPw = lazy(() => import('pages/FindPw'));
const MyCart = lazy(() => import('pages/MyCart'));
const MyShopping = lazy(() => import('pages/MyShopping'));
const MyOrder = lazy(() => import('pages/MyOrder'));

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="brand" element={<Brand />} />
      <Route path="shop" element={<Shop />} />
      <Route path="detail" element={<Detail />} />
      <Route path="community" element={<Community />} />
      <Route path="qna" element={<Qna />} />
      <Route path="review" element={<Review />} />

      <Route path="join" element={<Join />} />
      <Route path="edit" element={<EditMember />} />
      <Route path="login" element={<Login />} />
      <Route path="findid" element={<FindId />} />
      <Route path="findpw" element={<FindPw />} />

      <Route path="myCart" element={<MyCart />} />
      <Route path="myShopping" element={<MyShopping />} />
      <Route path="myOrder" element={<MyOrder />} />
    </Route>
  )
);

export default router;

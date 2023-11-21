import { lazy } from 'react';
import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';
const Home = lazy(() => import('pages/Home'));
const RootLayout = lazy(() => import('layout/RootLayout'));
const Brand = lazy(() => import('./pages/Brand'));
const Shop = lazy(() => import('./pages/Shop'));
const Community = lazy(() => import('./pages/Community'));
const EditMember = lazy(() => import('./pages/EditMember'));
const Join = lazy(() => import('./pages/Join'));
const Login = lazy(() => import('./pages/Login'));
const MyCart = lazy(() => import('./pages/MyCart'));
const MyShopping = lazy(() => import('./pages/MyShopping'));
const MyOrder = lazy(() => import('./pages/MyOrder'));

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="brand" element={<Brand />} />
      <Route path="shop" element={<Shop />} />
      <Route path="community" element={<Community />} />

      <Route path="join" element={<Join />} />
      <Route path="edit" element={<EditMember />} />
      <Route path="login" element={<Login />} />

      <Route path="myCart" element={<MyCart />} />
      <Route path="myShopping" element={<MyShopping />} />
      <Route path="myOrder" element={<MyOrder />} />
    </Route>
  )
);

export default router;

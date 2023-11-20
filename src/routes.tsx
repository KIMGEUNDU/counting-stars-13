import { lazy } from 'react';
import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';
const RootLayout = lazy(() => import('layout/RootLayout'));
const Home = lazy(() => import('pages/Home'));
const Regist = lazy(() => import('pages/Regist'));

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="regist" element={<Regist />} />
    </Route>
  )
);

export default router;

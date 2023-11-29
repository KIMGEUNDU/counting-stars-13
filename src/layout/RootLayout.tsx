import { Outlet } from 'react-router-dom';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import ScrollToTop from '@/utils/ScrollToTop';

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

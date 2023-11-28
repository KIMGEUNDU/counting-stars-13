import { useData } from '@/store/useData';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import PaginationNumber from '../PaginationNumber';
import ModalSearch from './ModalSearch';
import ModalSearchResult from './ModalSearchResult';

function Modal({ onClick }: Pick<ContainerTitle, 'onClick'>) {
  const {
    data,
    setData,
    dataLengthPage,
    setDataLengthPage,
    dataLength,
    setDataLength,
    pageData,
    setPageData,
    setPageNumber,
    pageNumber,
  } = useData();

  const getProducts = async () =>
    await axios
      .get(`https://localhost/api/products`)
      .then((res) => res.data.item);

  const { data: fetchData, isLoading } = useQuery(['products'], getProducts);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData);
      setDataLength(fetchData.length);
      setPageData(data.slice(0, 10));
      setDataLengthPage(Math.ceil(data.length / 10));
      setPageNumber(1);
    }
  }, [
    data,
    fetchData,
    setData,
    setDataLength,
    setDataLengthPage,
    setPageData,
    setPageNumber,
  ]);

  return (
    <div
      id="modal"
      className="bg-white border border-gray-300 w-[600px] h-[700px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 overflow-y-scroll"
    >
      <div className="flex justify-between bg-starPink p-3 font-bold">
        <h3>상품 선택</h3>
        <button type="button" onClick={onClick}>
          x
        </button>
      </div>
      <ModalSearch />
      <p className="px-10 pb-2">
        총
        <span className="font-bold text-amber-900 pl-1">
          {data ? dataLength : 0}
        </span>
        개의 상품이 검색되었습니다.
      </p>
      <table className="w-[85%] m-auto mb-7">
        <thead className="border-t border-t-gray-400 border-b border-b-gray-300 bg-gray-50">
          <tr>
            <th className="font-normal py-1 w-[20%]">상품 이미지</th>
            <th className="font-normal py-1">상품 정보</th>
            <th className="font-normal py-1 w-[20%]">선택</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            pageData &&
            pageData.map((v, i) => (
              <ModalSearchResult
                key={i}
                src={v.detailImages[0]}
                title={v.name}
                price={String(v.price)}
                id={v._id}
              />
            ))}
          {isLoading && (
            <tr>
              <td
                colSpan={4}
                className="text-center py-3 text-starPink font-bold"
              >
                불러오는중
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
      {pageNumber > 0 && (
        <PaginationNumber length={data ? dataLengthPage : 1} />
      )}
    </div>
  );
}

export default Modal;

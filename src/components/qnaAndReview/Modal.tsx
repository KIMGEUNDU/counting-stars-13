import { useData } from '@/store/useData';
import { axiosBase } from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import QueryPagination from '../QueryPagination';
import ModalSearch from './ModalSearch';
import ModalSearchResult from './ModalSearchResult';

function Modal({ onClick }: Pick<ContainerTitle, 'onClick'>) {
  const {
    allData,
    setAllData,
    dataLength,
    setDataLength,
    dataLengthPage,
    setDataLengthPage,
    pageNumber,
    setSelectId,
    setSelectData,
    currentPage,
  } = useData();

  const getProducts = (pageNum: number) => {
    return axiosBase.get(`/products?page=${pageNum}&limit=10`);
  };

  const { isLoading, data } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => getProducts(currentPage),
  });

  useEffect(() => {
    setDataLength(data?.data.pagination.total);
    setDataLengthPage(Math.ceil(data?.data.pagination.total / 10));
    setAllData(data?.data.item);
    setSelectId(null);
    setSelectData(null);
  }, [data?.data.item, setAllData]);

  return (
    <div className="absolute top-0 left-0 z-50 overflow-hidden bg-opacity-[0.9] bg-starBlack w-screen h-full flex items-center justify-center">
      <div
        id="modal"
        className="bg-white border border-gray-300 w-[600px] h-[700px] overflow-y-scroll"
      >
        <div className="flex justify-between bg-starPink p-3 font-bold">
          <h3>상품 선택</h3>
          <button type="button" onClick={onClick}>
            x
          </button>
        </div>
        <ModalSearch />
        {allData && (
          <p className="px-10 pb-2">
            총
            <span className="font-bold text-amber-900 pl-1">{dataLength}</span>
            개의 상품이 검색되었습니다.
          </p>
        )}
        <table className="w-[85%] m-auto mb-7">
          <thead className="border-t border-t-gray-400 border-b border-b-gray-300 bg-gray-50">
            <tr>
              <th className="font-normal py-1 w-[20%]">상품 이미지</th>
              <th className="font-normal py-1">상품 정보</th>
              <th className="font-normal py-1 w-[20%]">선택</th>
            </tr>
          </thead>
          <tbody>
            {allData &&
              allData.map((v, i) => (
                <ModalSearchResult
                  key={i}
                  src={(v as Data).detailImages[0]}
                  title={(v as Data).name}
                  price={String((v as Data).price.toLocaleString())}
                  id={v._id}
                />
              ))}
          </tbody>
        </table>
        {isLoading && (
          <p className="text-center pb-5">데이터를 불러오는 중입니다</p>
        )}
        {pageNumber > 0 && dataLengthPage > 0 && (
          <QueryPagination length={allData ? dataLengthPage : 1} />
        )}
      </div>
    </div>
  );
}

export default Modal;

import { useOrderUserInfo } from '@/store/useOrderUserInfo';
import { useState, useEffect } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';

export default function EditAddress() {
  const { orderUserInfo, setOrderUserInfo, isAddress, setAddress } =
    useOrderUserInfo();
  const [isOpen, setIsOpen] = useState(false);
  const onToggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleAdressDetailEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...isAddress, [e.target.name]: e.target.value });
  };

  const handleComplete = (data: Address) => {
    setAddress({
      ...isAddress,
      zonecode: data?.zonecode,
      address: data?.address,
    });
    setOrderUserInfo({
      ...orderUserInfo,
      address: {
        zonecode: isAddress?.zonecode,
        address: isAddress?.address,
        addressDetail: isAddress?.addressDetail,
      },
    });
    setIsOpen(false);
  }; // handleComplete 함수

  useEffect(() => {
    setOrderUserInfo({
      ...orderUserInfo,
      address: {
        zonecode: isAddress?.zonecode,
        address: isAddress?.address,
        addressDetail: isAddress?.addressDetail,
      },
    });
  }, [isAddress?.zonecode]);

  return (
    <tr className="border-b border-gray-300">
      <td className="bg-gray-50 p-3">주소</td>
      <td className="p-3">
        <div className="mb-2">
          <input
            value={isAddress?.zonecode}
            type="text"
            className="border border-gray-300 rounded w-16 mr-2"
            id="inputZipCode"
            onChange={handleAdressDetailEdit}
            name="zonecode"
          />
          <label htmlFor="inputZipCode">
            <button
              onClick={onToggleModal}
              type="button"
              className="border border-gray-300 px-2"
            >
              우편번호
            </button>
          </label>
        </div>
        {isOpen && (
          <div
            className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 text-center"
            onClick={onToggleModal}
          >
            <div
              className="bg-white rounded w-4/5 md:w-2/3 m-5 p-8"
              onClick={onToggleModal}
            >
              <DaumPostcode
                className="w-96 h-3/4 md:text-sm"
                onComplete={handleComplete}
              ></DaumPostcode>
            </div>
          </div>
        )}
        <div className="mb-2">
          <input
            value={isAddress?.address}
            type="text"
            className="border border-gray-300 rounded w-80 mr-2"
            id="inputAddress"
            onChange={handleAdressDetailEdit}
            name="address"
          />
          <label htmlFor="inputAddress">기본 주소</label>
        </div>
        <div>
          <input
            value={isAddress?.addressDetail}
            onChange={handleAdressDetailEdit}
            type="text"
            className="border border-gray-300 rounded w-80 mr-2"
            id="inputDetailAddress"
            name="addressDetail"
          />
          <label htmlFor="inputDetailAddress">상세 주소(선택)</label>
        </div>
      </td>
    </tr>
  );
}

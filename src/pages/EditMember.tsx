import { usePhoneNumber } from '@/store/usePhoneNumber';
import { useEffect, useState } from 'react';
import { phoneNumber } from '@/components/editMember/phoneNumber';
import { useNavigate } from 'react-router-dom';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import DaumPostcode, { Address } from 'react-daum-postcode';
import PageMainTitle from 'components/PageMainTitle';
import axiosInstance from '@/utils/axiosInstance';
import debounce from '@/utils/debounce';
import toast from 'react-hot-toast';

export default function EditMember() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  //회원정보조회 정보
  const { isPhoneNumber, setPhoneNumber } = usePhoneNumber();
  const [isOpen, setIsOpen] = useState(false);
  const [editMemberInfo, setEditMemberInfo] = useState<editMemberInfo>({
    email: '',
    name: '',
    phone: '',
    address: { zonecode: '', address: '', addressDetail: '' },
    type: '',
    emailAgree: false,
    birthday: '',
  });

  const [isAddress, setAddress] = useState<address>({
    zonecode: '',
    address: '',
    addressDetail: '',
  });

  // 번호 앞자리, 뒷자리 나누기 값
  useEffect(() => {
    phoneNumber(editMemberInfo?.phone, setPhoneNumber);
  }, [editMemberInfo?.phone]);
  // 번호 합쳐서 정보수정 인포에 넣어주기
  useEffect(() => {
    setEditMemberInfo({
      ...editMemberInfo,
      phone:
        isPhoneNumber.phoneFirst +
        isPhoneNumber.phoneMiddle +
        isPhoneNumber.phoneLast,
    });
  }, [isPhoneNumber]);

  const handleGetUserInfo = async () => {
    try {
      const response = await axiosInstance.get(`/users/${AUTH_ID()}`);
      const item = response.data.item;
      setEditMemberInfo(item);
      if (item.email === 'admin@market.com') {
        setAdmin(true);
      }

      //가져온정보 넣기
    } catch (e) {
      return toast('정보가 불러와지지 않음', {
        icon: '😢',
        duration: 2000,
      });
    }
  };
  useEffect(() => {
    handleGetUserInfo();
  }, []);

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditMemberInfo({ ...editMemberInfo, [e.target.name]: e.target.value });
  };

  const handleCheckboxEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditMemberInfo({ ...editMemberInfo, [e.target.name]: e.target.checked });
  };

  const handleChangePhoneFirst = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneNumber({ ...isPhoneNumber, phoneFirst: e.target.value });
  };

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber({ ...isPhoneNumber, [e.target.name]: e.target.value });
  };

  const handleComplete = (data: Address) => {
    setAddress({
      ...isAddress,
      zonecode: data.zonecode,
      address: data.address,
    });
    setEditMemberInfo({
      ...editMemberInfo,
      address: {
        zonecode: isAddress.zonecode,
        address: isAddress.address,
        addressDetail: isAddress.addressDetail,
      },
    });
  };

  useEffect(() => {
    setIsOpen(false);
  }, [isAddress.zonecode]);

  //우편번호 값
  useEffect(() => {
    setEditMemberInfo({
      ...editMemberInfo,
      address: {
        zonecode: isAddress.zonecode,
        address: isAddress.address,
        addressDetail: isAddress.addressDetail,
      },
    });
  }, [isAddress.zonecode]);
  //주소 검색 모달창
  const onToggleModal = () => {
    setIsOpen(!isOpen);
  };
  // 상세 주소값 넣기
  const handleAdressDetailEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...isAddress, [e.target.name]: e.target.value });

    if (e.target.name === 'addressDetail') {
      setEditMemberInfo({
        ...editMemberInfo,
        address: {
          zonecode: editMemberInfo.address?.zonecode,
          address: editMemberInfo.address?.address,
          addressDetail: e.target.value,
        },
      });
    }
  };
  // zonecode주소값 넣기
  useEffect(() => {
    setEditMemberInfo({
      ...editMemberInfo,
      address: {
        zonecode: isAddress.zonecode,
        address: isAddress.address,
        addressDetail: isAddress.addressDetail,
      },
    });
  }, [isAddress.zonecode]);

  const handleBirthdayEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditMemberInfo({ ...editMemberInfo, birthday: e.target.value });
  };

  const handlePatchUserInfo = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      e.preventDefault();

      const response = await axiosInstance.patch(
        `/users/${AUTH_ID()}`,
        editMemberInfo
      );
      const item = response.data.item;

      setEditMemberInfo(item);
      toast('회원님의 정보가 수정 되었습니다.', {
        icon: '😀',
        duration: 2000,
      });
      navigate('/myShopping');
      //가져온정보 넣기
    } catch (e) {
      return toast('정보가 불러와지지 않음', {
        icon: '😢',
        duration: 2000,
      });
    }
  };

  return (
    <>
      <main className="w-full">
        <PageMainTitle title="회원 정보 수정" />
        <section className="w-4/5 mx-auto">
          <article className="border border-gray-300 mb-4 flex items-center p-4">
            <img
              src="/avatar.gif"
              alt=""
              className="border-r border-gray-200 pr-4"
            />
            <p className="pl-4 align-middle">
              {admin ? '✨별,해달 ' : '✨별,해달을 이용해주셔서 감사합니다.'}
              <span className="text-blue-700 font-bold m-1">
                {editMemberInfo?.name}
              </span>
              님은
              <span className="font-bold">
                {admin ? ' [관리자] ' : ' [일반회원] '}
              </span>
              입니다.
            </p>
          </article>
          <table className="w-full border-t border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 w-40 p-3">
                  <label htmlFor="inputId">이메일</label>
                </td>
                <td className="flex flex-row p-3">
                  <p className="font-medium">{editMemberInfo?.email}</p>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="inputPw">비밀번호</label>
                </td>
                <td className="flex flex-row p-3">
                  <input
                    name="password"
                    // value={editMemberInfo.password}
                    type="password"
                    className="border border-gray-300 rounded w-32 mr-1"
                    id="inputPw"
                  />
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="inputPwConfirm">비밀번호 확인</label>
                </td>
                <td className="p-3">
                  <input
                    type="password"
                    className="border border-gray-300 rounded w-32"
                    id="inputPwConfirm"
                  />
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="inputName">이름</label>
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    className="border border-gray-300 rounded w-32"
                    id="inputName"
                    defaultValue={editMemberInfo?.name}
                    name="name"
                    onChange={handleEdit}
                  />
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">주소</td>
                <td className="p-3">
                  <div className="mb-2">
                    <input
                      value={editMemberInfo?.address?.zonecode}
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
                      value={editMemberInfo?.address?.address}
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
                      value={editMemberInfo?.address?.addressDetail}
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
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="inputPhone0" className="sr-only">
                    휴대전화
                  </label>
                  <label htmlFor="inputPhone1">휴대전화</label>
                  <label htmlFor="inputPhone2" className="sr-only">
                    휴대전화
                  </label>
                </td>
                <td className="p-3">
                  <select
                    name="phoneNumber"
                    id="inputPhone0"
                    value={isPhoneNumber.phoneFirst}
                    onChange={handleChangePhoneFirst}
                  >
                    <option value="011">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                  -
                  <input
                    name="phoneMiddle"
                    type="text"
                    className="border border-gray-300 rounded w-16"
                    id="inputPhone1"
                    defaultValue={isPhoneNumber.phoneMiddle}
                    onChange={debounce(handlePhoneNumber, 1000)}
                  />
                  -
                  <input
                    name="phoneLast"
                    type="text"
                    className="border border-gray-300 rounded w-16"
                    id="inputPhone2"
                    defaultValue={isPhoneNumber.phoneLast}
                    onChange={debounce(handlePhoneNumber, 500)}
                  />
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">SMS 수신 여부</td>
                <td className="p-3">
                  <input
                    type="checkbox"
                    name="emailAgree"
                    id="smsOk"
                    className="mr-1"
                    checked={editMemberInfo?.emailAgree}
                    onChange={handleCheckboxEdit}
                  />
                  <label htmlFor="smsOk" className="mr-2">
                    수신 여부
                  </label>

                  <p className="font-extralight">
                    쇼핑몰에서 제공하는 유익한 이벤트 소식을 SMS로 받으실 수
                    있습니다.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <h2 className="font-bold text-lg mt-10 mb-2">추가 정보</h2>
          <table className="w-full border-t border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 w-40 p-3">
                  <label htmlFor="inputBirthday">생년월일</label>
                </td>
                <td className="flex flex-row p-3">
                  <input
                    value={editMemberInfo?.birthday}
                    onChange={handleBirthdayEdit}
                    type="date"
                    name=""
                    id="inputBirthday"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <article className="flex justify-center mt-2">
            <button
              onClick={handlePatchUserInfo}
              className=" text-white bg-slate-500 py-3 mr-1 w-36"
            >
              회원 정보 수정
            </button>
            <button className="text-white bg-slate-500 w-36">취소</button>
          </article>
        </section>
      </main>
    </>
  );
}

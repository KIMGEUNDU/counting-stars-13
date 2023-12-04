import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
import PageMainTitle from 'components/PageMainTitle';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { usePhoneNumber } from '@/store/usePhoneNumber';
import { phoneNumber } from '@/components/EditMember/phoneNumber';
import DaumPostcode from 'react-daum-postcode';

export default function EditMember() {
  //회원정보조회 정보
  const { isPhoneNumber, setPhoneNumber } = usePhoneNumber();

  console.log(isPhoneNumber);

  const [editMemberInfo, setEditMemberInfo] = useState<editMemberInfo>({
    email: '',
    name: '',
    password: '',
    phone: '',

    address: { zonecode: '', address: '', addressDetail: '' },
    type: '',
    emailAgree: false,
    birthday: '',
    updatedAt: '',
    createdAt: '',
  });

  console.log(editMemberInfo);

  // 번호 앞자리, 뒷자리 나누기 값
  useEffect(() => {
    phoneNumber(editMemberInfo.phone, setPhoneNumber);
  }, []);
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
      const response = await axios.get(
        `https://localhost/api/users/${AUTH_ID()}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN()}`,
          },
        }
      );
      const item = response.data.item;
      setEditMemberInfo(item);
      console.log(item);

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
  console.log(isPhoneNumber);

  const handlePhoneNumber = (e) => {
    setPhoneNumber({ ...isPhoneNumber, [e.target.name]: e.target.value });
  };

  const [isAddress, setAdress] = useState({
    zonecode: '',
    address: '',
    addressDetail: '',
  });

  const handleComplete = (data) => {
    console.log(data);
    setAdress({ ...isAddress, zonecode: data.zonecode, address: data.address });
    setEditMemberInfo({
      ...editMemberInfo,
      address: {
        zonecode: isAddress.zonecode,
        address: isAddress.address,
        addressDetail: isAddress.addressDetail,
      },
    });
  }; // handleComplete 함수

  useEffect(() => {
    setIsOpen(false);
  }, [isAddress.zonecode]);

  useEffect(() => {
    setEditMemberInfo({
      ...editMemberInfo,
      address: {
        zonecode: isAddress.zonecode,

        address: isAddress.address,
        addressDetail: isAddress.addressDetail,
      },
    });
  }, [isAddress]);

  const [isOpen, setIsOpen] = useState(false);
  const onToggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleAdressDetailEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdress({ ...isAddress, addressDetail: e.target.value });
  };

  const handleBirthdayEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditMemberInfo({ ...editMemberInfo, birthday: e.target.value });
  };

  //비밀번호 확인 유효성감사
  const [checkPassword, setCheckPassword] = useState('');
  const [checkPasswordP, setCheckPasswordP] = useState('');
  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  //비밀번호 확인 유효성감사
  useEffect(() => {
    if (editMemberInfo.password === '' || checkPassword === '') {
      return setCheckPasswordP('');
    }

    if (checkPassword === editMemberInfo.password) {
      setCheckPasswordP('😀확인 되었습니다.');
    }
    if (checkPassword !== editMemberInfo.password) {
      setCheckPasswordP('🥲비밀번호가 일치하지 않습니다.');
    }
    console.log(checkPassword.length);
  }, [checkPassword, editMemberInfo.password]);

  const handlePatchUserInfo = async () => {
    if (checkPassword !== editMemberInfo.password) {
      return toast('비밀번호를 확인해주세요.', {
        icon: '😢',
        duration: 2000,
      });
    }
    try {
      const response = await axios.patch(
        `https://localhost/api/users/${AUTH_ID()}`,
        editMemberInfo,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN()}`,
          },
        }
      );
      const item = response.data.item;
      setEditMemberInfo(item);
      console.log(item);
      toast('회원님의 정보가 수정 되었습니다.', {
        icon: '😀',
        duration: 2000,
      });
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
              ✨별,해달을 이용해주셔서 감사합니다.
              <span className="text-blue-700 font-bold m-1">
                {editMemberInfo.name}
              </span>
              님은
              <span className="font-bold"> [일반회원]</span>
              입니다.
            </p>
          </article>
          <table className="w-full border-t border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 w-40 p-3">
                  <label htmlFor="inputId">이메일</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="flex flex-row p-3">
                  <input
                    name="email"
                    type="text"
                    className="border border-gray-300 rounded w-32 mr-1"
                    id="inputId"
                    value={editMemberInfo.email}
                    defaultValue={editMemberInfo.email}
                    onChange={handleEdit}
                  />
                  <p>(영문 소문자/숫자, 4~16자)</p>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="inputPw">비밀번호</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="flex flex-row p-3">
                  <input
                    name="password"
                    onChange={handleEdit}
                    value={editMemberInfo.password}
                    type="password"
                    className="border border-gray-300 rounded w-32 mr-1"
                    id="inputPw"
                  />
                  <p>
                    (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16자)
                  </p>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="inputPwConfirm">비밀번호 확인</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="p-3">
                  <input
                    type="password"
                    className="border border-gray-300 rounded w-32"
                    id="inputPwConfirm"
                    onChange={handleCheckPassword}
                  />
                  <p>{checkPasswordP}</p>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="inputName">이름</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    className="border border-gray-300 rounded w-32"
                    id="inputName"
                    defaultValue={editMemberInfo.name}
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
                      value={editMemberInfo.address.zonecode}
                      type="text"
                      className="border border-gray-300 rounded w-16 mr-2"
                      id="inputZipCode"
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
                      value={editMemberInfo.address.address}
                      type="text"
                      className="border border-gray-300 rounded w-80 mr-2"
                      id="inputAddress"
                    />
                    <label htmlFor="inputAddress">기본 주소</label>
                  </div>
                  <div>
                    <input
                      value={editMemberInfo.address.addressDetail}
                      onChange={handleAdressDetailEdit}
                      type="text"
                      className="border border-gray-300 rounded w-80 mr-2"
                      id="inputDetailAddress"
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
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="p-3">
                  <select
                    name="phoneNumber"
                    id="inputPhone0"
                    //TODO: 휴대폰 앞자리 바꾸기
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
                    onChange={handlePhoneNumber}
                  />
                  -
                  <input
                    name="phoneLast"
                    type="text"
                    className="border border-gray-300 rounded w-16"
                    id="inputPhone2"
                    defaultValue={isPhoneNumber.phoneLast}
                    onChange={handlePhoneNumber}
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
                    checked={editMemberInfo.emailAgree}
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
              {/* <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="emailInput">이메일</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="p-3">
                  <input
                    type="email"
                    className="border border-gray-300 rounded w-32"
                    id="emailInput"
                  />
                </td>
              </tr> */}
              {/* <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">이메일 수신 여부</td>
                <td className="p-3">
                  <input
                    type="checkbox"
                    name=""
                    id="emailOk"
                    className="mr-1"
                  />
                  <label htmlFor="emailOk" className="mr-2">
                    수신함
                  </label>
                  <input
                    type="checkbox"
                    name=""
                    id="emailNo"
                    className="mr-1"
                  />
                  <label htmlFor="emailNo" className="mr-2">
                    수신안함
                  </label>
                  <p className="font-extralight">
                    쇼핑몰에서 제공하는 유익한 이벤트 소식을 이메일로 받으실 수
                    있습니다.
                  </p>
                </td>
              </tr> */}
            </tbody>
          </table>
          <h2 className="font-bold text-lg mt-10 mb-2">추가 정보</h2>
          <table className="w-full border-t border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 w-40 p-3">
                  <label htmlFor="inputBirthday">생년월일</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="flex flex-row p-3">
                  <input
                    value={editMemberInfo.birthday}
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

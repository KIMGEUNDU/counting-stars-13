import { terms } from 'components/terms';
import PageMainTitle from 'components/PageMainTitle';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { idReg, emailReg, pwReg, phoneReg } from '@/utils/loginReg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Join() {
  const navigate = useNavigate();

  const [joinInfo, setJoinInfo] = useState({
    id: '',
    email: '',
    password: '',
    name: '',
    phone: '',
    type: 'user',
    emailAgree: '',
  });

  const [phoneNumberList, setPhoneNumberList] = useState({
    phoneFont: '010',
    phoneMiddle: '',
    phoneLast: '',
  });
  const { phoneFont, phoneMiddle, phoneLast } = phoneNumberList;

  useEffect(() => {});
  const [checkPassword, setCheckPassword] = useState('');

  // 회원가입정보값 가져오기
  const { phone, password, name, id, email } = joinInfo;

  //비밀번호 중복체크
  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  // 인풋에 값을 쓰면 값이 담김
  const handleJoinInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinInfo({ ...joinInfo, [e.target.name]: e.target.value });
  };
  const handleSelectPhoneNumberList = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPhoneNumberList({ ...phoneNumberList, phoneFont: e.target.value });
  };
  const handlePhoneNumberList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumberList({
      ...phoneNumberList,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setJoinInfo({ ...joinInfo, phone: phoneFont + phoneMiddle + phoneLast });
  }, [phoneNumberList]);

  const handleAgreeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);

    setJoinInfo({ ...joinInfo, [e.target.name]: e.target.checked });
  };
  console.log(joinInfo);

  const handleJoin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(joinInfo);

    if (!idReg(id) || !id) {
      return alert(
        '아이디는 영문자로 시작하는 영문자 또는 숫자 4~16자로 입력해주세요.'
      );
    }
    if (!pwReg(password) || !password) {
      return alert('비밀번호는 영문, 숫자 조합으로 8~16자로 입력해주세요.');
    }
    if (password !== checkPassword) {
      return alert('비밀번호 확인이 비밀번호와 일치하지 않습니다.');
    }
    if (!name || name.length > 6) {
      return alert('이름을 확인해주세요.');
    }
    if (!name || name.length > 6) {
      return alert('이름을 확인해주세요.');
    }
    if (!phone || phoneReg(phone)) {
      return alert('전화번호 형식을 확인해주세요.');
    }

    if (!emailReg(email) || !email) {
      return alert('비밀번호는 영문, 숫자 조합으로 8~16자로 입력해주세요.');
    }
    try {
      const response = await axios.post(
        'https://localhost/api/users',
        joinInfo
      );
      // const responseItem = response.data.item;

      if (response.data.ok === 1) {
        navigate('/');
        console.log('회원가입 성공');
      }
    } catch (e) {
      return alert('회원가입 오류.');
    }
  };

  const [isAllAgree, setAllAgree] = useState(false);

  const allAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setAllAgree(true) : setAllAgree(false);
  };

  const allAgreeElem = (e: React.ChangeEvent<HTMLInputElement>) => {
    isAllAgree ? (e.target.checked = true) : (e.target.checked = false);
  };

  return (
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <main className="w-full">
        <PageMainTitle title="회원 가입" />
        <section className="w-4/5 mx-auto">
          <table className="w-full border-t border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-100 w-40 p-3">
                  <label htmlFor="inputId">아이디</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="flex flex-row p-3">
                  <input
                    name="id"
                    onChange={handleJoinInfo}
                    type="text"
                    className="border border-gray-300 rounded w-32 mr-1"
                    id="inputId"
                    required
                  />
                  <p>(영문 소문자/숫자, 4~16자)</p>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-100 p-3">
                  <label htmlFor="inputPw">비밀번호</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="flex flex-row p-3">
                  <input
                    name="password"
                    onChange={handleJoinInfo}
                    type="password"
                    className="border border-gray-300 rounded w-32 mr-1"
                    id="inputPw"
                    required
                  />
                  <p>
                    (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8~16자)
                  </p>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-100 p-3">
                  <label htmlFor="inputPwConfirm">비밀번호 확인</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="p-3">
                  <input
                    name="checkPassword"
                    type="password"
                    className="border border-gray-300 rounded w-32"
                    id="inputPwConfirm"
                    required
                    onChange={handleCheckPassword}
                  />
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-100 p-3">
                  <label htmlFor="inputName">이름</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="p-3">
                  <input
                    name="name"
                    onChange={handleJoinInfo}
                    type="text"
                    className="border border-gray-300 rounded w-32"
                    id="inputName"
                    required
                  />
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-100 p-3">
                  <label htmlFor="inputPhone">휴대전화</label>
                  <label htmlFor="inputPhone2" className="sr-only">
                    휴대전화
                  </label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="p-3">
                  <select
                    name="phoneFont"
                    id=""
                    onChange={handleSelectPhoneNumberList}
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
                    type="text"
                    name="phoneMiddle"
                    onChange={handlePhoneNumberList}
                    className="border border-gray-300 rounded w-16"
                    id="inputPhone"
                  />
                  -
                  <input
                    type="text"
                    name="phoneLast"
                    onChange={handlePhoneNumberList}
                    className="border border-gray-300 rounded w-16"
                    id="inputPhone2"
                  />
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-100 p-3">
                  <label htmlFor="emailInput">이메일</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="p-3">
                  <input
                    name="email"
                    onChange={handleJoinInfo}
                    type="email"
                    className="border border-gray-300 rounded w-32"
                    id="emailInput"
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className="font-bold text-lg mt-10 mb-2">전체 동의</h2>
          <table className="bg-gray-100 w-full border border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-4 flex flex-row">
                  <input
                    type="checkbox"
                    className="mr-1 w-5"
                    name="allAgree"
                    id="allAgree"
                    onChange={allAgree}
                  />
                  <label htmlFor="allAgree">
                    이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두
                    동의합니다.
                  </label>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-4">
                  <p className="mb-2">[필수] 이용약관 동의</p>
                  <textarea
                    name=""
                    id=""
                    className="w-full border border-gray-200 h-32 resize-none p-4 text-gray-400 text-sm"
                    readOnly
                    value={terms.term}
                  ></textarea>
                  <div className="flex flex-row">
                    <p className="mr-2">이용 약관에 동의하십니까?</p>
                    <input
                      type="checkbox"
                      className="mr-1"
                      name="agreeUse"
                      id="termAgree"
                      onChange={allAgreeElem}
                    />
                    <label htmlFor="termAgree">동의함</label>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-4">
                  <p className="mb-2">[필수] 개인정보 수집 및 이용 동의</p>
                  <textarea
                    name=""
                    id=""
                    className="w-full border border-gray-200 h-32 resize-none p-4 text-gray-400 text-sm"
                    readOnly
                    value={terms.privacy}
                  ></textarea>
                  <div className="flex flex-row">
                    <p className="mr-2">
                      개인정보 수집 및 이용에 동의하십니까?
                    </p>
                    <input
                      type="checkbox"
                      className="mr-1"
                      name="privacyAgree"
                      id="privacyAgree"
                      onChange={allAgreeElem}
                    />
                    <label htmlFor="privacyAgree">동의함</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4">
                  <p className="mb-2">[선택] 쇼핑정보 수신 동의</p>
                  <textarea
                    name=""
                    id=""
                    className="w-full border border-gray-200 h-32 resize-none p-4 text-gray-400 text-sm"
                    readOnly
                    value={terms.shopInfo}
                  ></textarea>

                  <div className="flex flex-row">
                    <p className="mr-2">이메일/SMS 수신을 동의하십니까?</p>
                    <input
                      type="checkbox"
                      onChange={handleAgreeInfo}
                      className="mr-1"
                      name="emailAgree"
                      id="emailAgree"
                      // onChange={allAgreeElem}
                    />
                    <label htmlFor="emailAgree">동의함</label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={handleJoin}
            className="block text-white bg-slate-500 py-2 px-8 mt-4 mb-10 mx-auto"
          >
            회원 가입
          </button>
        </section>
      </main>
    </>
  );
}

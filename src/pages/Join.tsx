import { useEffect, useRef, useState } from 'react';
import { emailReg, phoneReg } from '@/utils/loginReg';
import { useNavigate } from 'react-router-dom';
import { axiosBase } from '@/utils/axiosInstance';
import { Helmet } from 'react-helmet-async';
import { terms } from 'components/terms';
import EmailCheckButton from 'components/Login,Join/EmailCheckButton';
import PageMainTitle from 'components/PageMainTitle';
import toast from 'react-hot-toast';

export default function Join() {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const checkPasswordInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const LastPhoneInput = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const [joinInfo, setJoinInfo] = useState({
    id: '',
    email: '',
    password: '',
    name: '',
    phone: '',
    type: 'user',
    emailAgree: false,
  });
  // 유효성검사 상태관리
  const [validationInfo, setValidationInfo] = useState({
    password: '',
    name: '',
    phone: '',
  });
  //이메일 중복체크 여부
  const [checkEmail, setCheckEmail] = useState(false);
  const [phoneNumberList, setPhoneNumberList] = useState({
    phoneFont: '010',
    phoneMiddle: '',
    phoneLast: '',
  });
  const [isAgree, setAgree] = useState({
    allAgree: false,
    useAgree: false,
    privacyAgree: false,
    emailAgree: false,
  });
  const [checkPassword, setCheckPassword] = useState('');

  // 회원가입정보값 가져오기
  const { phone, password, name, email } = joinInfo;
  const { phoneFont, phoneMiddle, phoneLast } = phoneNumberList;

  //비밀번호 중복체크
  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  // 인풋에 값을 쓰면 값이 joinInfo에 담김
  const handleJoinInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinInfo({ ...joinInfo, [e.target.name]: e.target.value });
  };
  // 비밀번호 확인 검사
  useEffect(() => {
    if (checkPassword.length === 0) {
      return setValidationInfo({
        ...validationInfo,
        password: '',
      });
    }
    password !== checkPassword
      ? setValidationInfo({
          ...validationInfo,
          password: '😢비밀번호 확인이 일치하지 않습니다.',
        })
      : setValidationInfo({
          ...validationInfo,
          password: '😀완료 되었습니다',
        });
  }, [checkPassword, password]);

  // 이름 유효성 검사
  useEffect(() => {
    if (joinInfo.name.length === 0) {
      return setValidationInfo({
        ...validationInfo,
        name: '',
      });
    }
    joinInfo.name.length >= 20
      ? setValidationInfo({
          ...validationInfo,
          name: '😢이름 형식을 확인해주세요.',
        })
      : setValidationInfo({ ...validationInfo, name: '' });
  }, [joinInfo.name]);

  //휴대전화 유효성 검사
  useEffect(() => {
    if (joinInfo.phone.length <= 3) {
      return setValidationInfo({
        ...validationInfo,
        phone: '',
      });
    }
    phoneNumberList.phoneMiddle.length < 3 ||
    phoneNumberList.phoneLast.length < 4
      ? setValidationInfo({
          ...validationInfo,
          phone: '✏️휴대전화 번호를 10자리이상 적어주세요.',
        })
      : setValidationInfo({
          ...validationInfo,
          phone: '',
        });
  }, [joinInfo.phone]);

  //핸드폰 맨앞지리 담는 함수
  const handleSelectPhoneNumberList = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPhoneNumberList({ ...phoneNumberList, phoneFont: e.target.value });
  };
  //핸드폰 중간자리, 끝자리 담는 함수
  const handlePhoneNumberList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumberList({
      ...phoneNumberList,
      [e.target.name]: e.target.value,
    });
  };
  // 핸드폰 번호 합쳐서 JoinInfo에 담기
  useEffect(() => {
    setJoinInfo({ ...joinInfo, phone: phoneFont + phoneMiddle + phoneLast });
    if (phoneNumberList.phoneMiddle.length > 3) {
      (LastPhoneInput.current as HTMLInputElement).focus();
    }
  }, [phoneNumberList]);

  //회원가입 버튼 눌렀을 때
  const handleJoin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!emailReg(email) || !email) {
      (emailInput.current as HTMLInputElement).focus();
      return toast('이메일 형식을 확인해주세요.', {
        icon: '😢',
        duration: 2000,
      });
    }
    if (!checkEmail) {
      return toast('이메일 중복체크를 진행해주세요.', {
        icon: '😢',
        duration: 2000,
      });
    }
    if (password !== checkPassword) {
      (checkPasswordInput.current as HTMLInputElement).focus();

      return toast('비밀번호 확인이 비밀번호와 일치하지 않습니다.', {
        icon: '😢',
        duration: 2000,
      });
    }
    if (!name || name.length >= 20) {
      (nameInput.current as HTMLInputElement).focus();

      return toast('이름을 확인해주세요.', {
        icon: '😢',
        duration: 2000,
      });
    }

    if (!phone || phoneReg(phone) || phone.length <= 9) {
      (phoneInput.current as HTMLInputElement).focus();
      return toast('전화번호 형식을 확인해주세요.', {
        icon: '😢',
        duration: 2000,
      });
    }

    if (!isAgree.useAgree || !isAgree.privacyAgree) {
      return toast('필수 약관 동의란을 확인해주세요.', {
        icon: '😢',
        duration: 2000,
      });
    }
    try {
      const response = await axiosBase.post('/users', joinInfo);

      if (response.data.ok === 1) {
        navigate('/');
        toast(`회원가입이 완료 되었습니다.`, {
          icon: '🎉',
          duration: 2500,
        });
      }
    } catch (e) {
      return alert('회원가입 오류.');
    }
  };

  const [isAllAgree, setAllAgree] = useState(false);
  //모두 동의 체크박스 기능
  const allAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setAllAgree(true) : setAllAgree(false);
    e.target.checked
      ? setAgree({ ...isAgree, allAgree: true })
      : setAgree({ ...isAgree, allAgree: false });
  };
  //각자 동의 체크박스 기능
  useEffect(() => {
    isAllAgree === true
      ? setAgree({
          ...isAgree,
          useAgree: true,
          privacyAgree: true,
          emailAgree: true,
        })
      : setAgree({
          ...isAgree,
          useAgree: false,
          privacyAgree: false,
          emailAgree: false,
        });
  }, [isAllAgree]);

  //email 수신 동의 값 유저값에 올리기
  useEffect(() => {
    setJoinInfo({ ...joinInfo, emailAgree: isAgree.emailAgree });
  }, [isAgree]);

  const allAgreeElem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgree({ ...isAgree, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    if (!isAgree.emailAgree && !isAgree.privacyAgree && !isAgree.useAgree) {
      setAllAgree(false);
    }
    if (!isAgree.emailAgree || !isAgree.privacyAgree || !isAgree.useAgree) {
      setAgree({ ...isAgree, allAgree: false });
    }
    if (isAgree.emailAgree && isAgree.privacyAgree && isAgree.useAgree) {
      return setAgree({ ...isAgree, allAgree: true });
    }
  }, [isAgree.emailAgree, isAgree.privacyAgree, isAgree.useAgree]);

  useEffect(() => {
    if (isAgree.allAgree) {
      setAgree({
        allAgree: true,
        emailAgree: true,
        privacyAgree: true,
        useAgree: true,
      });
    }
    if (isAgree.allAgree) {
      return setAllAgree(true);
    }
  }, [isAgree.allAgree]);

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
                  <label htmlFor="inputId">이메일</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="flex flex-row p-3">
                  <input
                    ref={emailInput}
                    name="email"
                    onChange={handleJoinInfo}
                    type="text"
                    className="border border-gray-300 rounded w-32 mr-1"
                    id="inputId"
                    required
                  />

                  <EmailCheckButton
                    email={email}
                    setCheckEmail={setCheckEmail}
                    itemEmail={joinInfo.email}
                  />
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
                    ref={passwordInput}
                    name="password"
                    onChange={handleJoinInfo}
                    type="password"
                    className="border border-gray-300 rounded w-32 mr-1"
                    id="inputPw"
                    required
                  />
                  <p className="text-gray-500 ">(영문, 숫자 조합으로 8~16자)</p>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-100 p-3">
                  <label htmlFor="inputPwConfirm">비밀번호 확인</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="p-3 flex items-center gap-2">
                  <input
                    ref={checkPasswordInput}
                    name="checkPassword"
                    type="password"
                    className="border border-gray-300 rounded w-32"
                    id="inputPwConfirm"
                    required
                    onChange={handleCheckPassword}
                  />
                  <p
                    className={
                      password !== checkPassword
                        ? 'text-red-400 text-sm font-semibold '
                        : 'text-blue-400 text-sm font-semibold'
                    }
                  >
                    {validationInfo.password}
                  </p>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-100 p-3">
                  <label htmlFor="inputName">이름</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="p-3 flex items-center gap-2">
                  <input
                    ref={nameInput}
                    name="name"
                    onChange={handleJoinInfo}
                    type="text"
                    className="border border-gray-300 rounded w-32"
                    id="inputName"
                    required
                  />
                  <p className="text-red-400 text-sm font-semibold">
                    {validationInfo.name}
                  </p>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-100 p-3 ">
                  <label htmlFor="inputPhone">휴대전화</label>
                  <label htmlFor="inputPhone2" className="sr-only">
                    휴대전화
                  </label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="p-3 flex items-center gap-0.5">
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
                    ref={phoneInput}
                    type="text"
                    name="phoneMiddle"
                    onChange={handlePhoneNumberList}
                    className="border border-gray-300 rounded w-16"
                    id="inputPhone"
                  />
                  -
                  <input
                    ref={LastPhoneInput}
                    type="text"
                    name="phoneLast"
                    onChange={handlePhoneNumberList}
                    className="border border-gray-300 rounded w-16"
                    id="inputPhone2"
                  />
                  <p
                    className={
                      phoneReg(joinInfo.phone) || joinInfo.phone.length <= 10
                        ? 'text-red-400 text-sm font-semibold '
                        : ''
                    }
                  >
                    {validationInfo.phone}
                  </p>
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
                    checked={isAgree.allAgree}
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
                      name="useAgree"
                      id="termAgree"
                      onChange={allAgreeElem}
                      checked={isAgree.useAgree}
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
                      checked={isAgree.privacyAgree}
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
                      checked={isAgree.emailAgree}
                      type="checkbox"
                      onChange={allAgreeElem}
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

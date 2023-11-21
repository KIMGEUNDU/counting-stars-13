import PageMainTitle from 'components/PageMainTitle';

export default function Join() {
  return (
    <>
      <main className="w-full">
        <PageMainTitle title="회원 가입" />
        <section className="w-4/5 mx-auto">
          <table className="border-t border-gray-300">
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
                    type="text"
                    className="border border-gray-300 rounded w-32 mr-1"
                    id="inputId"
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
                <td className="bg-gray-100 p-3">
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
                    type="text"
                    className="border border-gray-300 rounded w-32"
                    id="inputName"
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
                  <select name="" id="">
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
                    className="border border-gray-300 rounded w-16"
                    id="inputPhone"
                  />
                  -
                  <input
                    type="text"
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
                    type="email"
                    className="border border-gray-300 rounded w-32"
                    id="emailInput"
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
                    name=""
                    id="allAgree"
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
                  >
                    제1조
                  </textarea>
                  <div className="flex flex-row">
                    <p className="mr-2">이용 약관에 동의하십니까?</p>
                    <input
                      type="checkbox"
                      className="mr-1"
                      name=""
                      id="termAgree"
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
                  >
                    제1조
                  </textarea>
                  <div className="flex flex-row">
                    <p className="mr-2">
                      개인정보 수집 및 이용에 동의하십니까?
                    </p>
                    <input
                      type="checkbox"
                      className="mr-1"
                      name=""
                      id="privacyAgree"
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
                  >
                    제1조
                  </textarea>
                  <div className="flex flex-row">
                    <p className="mr-2">SMS 수신을 동의하십니까?</p>
                    <input
                      type="checkbox"
                      className="mr-1"
                      name=""
                      id="SmsAgree"
                    />
                    <label htmlFor="SmsAgree">동의함</label>
                  </div>
                  <div className="flex flex-row">
                    <p className="mr-2">이메일 수신을 동의하십니까?</p>
                    <input
                      type="checkbox"
                      className="mr-1"
                      name=""
                      id="emailAgree"
                    />
                    <label htmlFor="emailAgree">동의함</label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="block text-white bg-slate-500 py-2 px-8 mt-4 mb-10 mx-auto">
            회원 가입
          </button>
        </section>
      </main>
    </>
  );
}

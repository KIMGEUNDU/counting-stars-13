import PageMainTitle from 'components/PageMainTitle';
export default function EditMember() {
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
              <span className="text-blue-700 font-bold"> 이동호 </span>
              님은
              <span className="font-bold"> [일반회원]</span>
              입니다.
            </p>
          </article>
          <table className="w-full border-t border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 w-40 p-3">
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
                <td className="bg-gray-50 p-3">
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
                  />
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
                  />
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">주소</td>
                <td className="p-3">
                  <div className="mb-2">
                    <input
                      type="text"
                      className="border border-gray-300 rounded w-16 mr-2"
                      id="inputZipCode"
                    />
                    <label htmlFor="inputZipCode">
                      <button
                        type="button"
                        className="border border-gray-300 px-2"
                      >
                        우편번호
                      </button>
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="border border-gray-300 rounded w-80 mr-2"
                      id="inputAddress"
                    />
                    <label htmlFor="inputAddress">기본 주소</label>
                  </div>
                  <div>
                    <input
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
                  <select name="phoneNumber" id="inputPhone0">
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
                    id="inputPhone1"
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
                <td className="bg-gray-50 p-3">SMS 수신 여부</td>
                <td className="p-3">
                  <input type="checkbox" name="" id="smsOk" className="mr-1" />
                  <label htmlFor="smsOk" className="mr-2">
                    수신함
                  </label>
                  <input type="checkbox" name="" id="smsNo" className="mr-1" />
                  <label htmlFor="smsNo" className="mr-2">
                    수신안함
                  </label>
                  <p className="font-extralight">
                    쇼핑몰에서 제공하는 유익한 이벤트 소식을 SMS로 받으실 수
                    있습니다.
                  </p>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
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
              </tr>
              <tr className="border-b border-gray-300">
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
              </tr>
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
                  <input type="date" name="" id="inputBirthday" />
                </td>
              </tr>
            </tbody>
          </table>
          <article className="flex justify-center mt-2">
            <button className=" text-white bg-slate-500 py-3 mr-1 w-36">
              회원 정보 수정
            </button>
            <button className="text-white bg-slate-500 w-36">취소</button>
          </article>
        </section>
      </main>
    </>
  );
}

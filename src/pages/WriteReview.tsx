import PageMainTitle from '@/components/PageMainTitle';

export default function WriteReview() {
  return (
    <>
      <main>
        <PageMainTitle title="상품 사용 후기" />
        <section className="w-4/5 mx-auto">
          <article className="border border-gray-300 mb-4 flex items-center p-4">
            <img
              src="/noImage.gif"
              alt="상품 기본 이미지"
              className="border-r border-gray-200 pr-4"
            />
            <p className="pl-4 align-middle">
              <button type="button" className="border py-3 w-36">
                주문 상품 선택
              </button>
            </p>
          </article>
          <table className="w-full border-t border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 w-40 p-3">
                  <label htmlFor="inputId">제목</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="flex flex-row p-3">
                  <input
                    type="text"
                    className="border border-gray-300 rounded w-60 mr-1"
                    id="inputId"
                  />
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="inputGrade">평점</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="flex flex-row p-3">
                  <select name="grade" id="inputGrade">
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                  </select>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td colSpan={2} className="bg-gray-50 p-3">
                  <textarea
                    name=""
                    id=""
                    className="w-full h-80 resize-none"
                  ></textarea>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="inputPhoto">첨부파일</label>
                  <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                    *
                  </span>
                </td>
                <td className="p-3">
                  <input
                    type="file"
                    accept="image/jpg,image/png,image/jpeg,image/webp,image/avif"
                    name="photo"
                    id="inputPhoto"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <article className="flex justify-between mt-4">
            <button type="button" className="border py-3 mr-1 w-36">
              목록
            </button>
            <div>
              <button className="text-white bg-slate-500 py-3 mr-1 w-36">
                등록
              </button>
              <button
                type="button"
                className="text-gray-500 bg-gray-200 py-3 w-36"
              >
                취소
              </button>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

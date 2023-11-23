import InformationTableTr from './InformationTableTr';

function InformationTable({
  title,
  length,
}: {
  title: string;
  length?: number;
}) {
  return (
    <>
      <div className="flex justify-between pt-6 pb-3">
        <h2 className="font-bold text-lg">{title}</h2>
        <div className="flex gap-4">
          <button type="button" className="detailProductListButton">
            {title} 전체보기
          </button>
          <button
            type="button"
            className="detailProductListButton bg-starBlack text-white"
          >
            {title} 전체쓰기
          </button>
        </div>
      </div>
      {length && (
        <section className="border-t border-starBlack">
          <table className="w-full">
            {Array(length)
              .fill('')
              .map((_, i) => (
                <InformationTableTr
                  key={i}
                  link="/detail"
                  length={length}
                  number={i}
                  content="생일파티용으로 주문했는데 이뻤어용^^ 아쉬운건 생각보다 사이즈가 작은게 ....... 메인메뉴가 아니여서 다행이긴했지만 색감이랑 모양은 진짜 이뻐용 ㅋㅋ"
                  writer="윤**"
                  date="2023-11-21 17:11:18"
                />
              ))}
          </table>
        </section>
      )}
      {!length && (
        <section className="border-b border-t border-t-starBlack border-b-gray-300 py-10 text-center">
          <p>게시물이 없습니다</p>
        </section>
      )}
    </>
  );
}

export default InformationTable;

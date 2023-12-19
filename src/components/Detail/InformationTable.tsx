import InformationTableTr from './InformationTableTr';

function InformationTable({
  title,
  reply,
}: {
  title: string;
  length?: number;
  reply: [];
}) {
  return (
    <>
      <div className="flex justify-between pt-6 pb-3">
        <h2 className="font-bold text-lg">{title}</h2>
        <div className="flex gap-4">
          <button type="button" className="detailProductListButton">
            {title} 전체 보기
          </button>
          <button
            type="button"
            className="detailProductListButton bg-starBlack text-white"
          >
            {title} 전체 쓰기
          </button>
        </div>
      </div>
      <section className="border-t border-starBlack">
        <table className="w-full">
          {reply?.length > 0 &&
            reply.map((item: Review, i) => {
              return (
                <InformationTableTr
                  key={i}
                  link={item._id}
                  number={i}
                  content={item.extra.title}
                  writer={item.user.name}
                  date={item.createdAt.split(' ')[0]}
                />
              );
            })}
        </table>
      </section>
      {reply?.length === 0 && (
        <section className="border-b border-t border-t-starBlack border-b-gray-300 py-10 text-center">
          <p>게시물이 없습니다.</p>
        </section>
      )}
    </>
  );
}

export default InformationTable;

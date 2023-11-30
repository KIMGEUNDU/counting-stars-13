import { Link } from 'react-router-dom';

type board = {
  tag: string | number;
  title: string | undefined;
  writer: string;
  link?: string;
  date: string | undefined;
  item?: string;
  grade?: number;
  itemImg?: string;
  attachFile?: string | undefined;
};

export default function EachPost({
  tag,
  title,
  writer,
  date,
  item,
  grade,
  link,
  itemImg,
  attachFile,
}: board) {
  const writerPrivate = (writer: string) => {
    if (writer !== '별해달') {
      return writer.substring(0, 1) + '*'.repeat(`${writer}`.length - 1);
    } else {
      return '별해달';
    }
  };

  const starGrade = (grade: number) => {
    return '⭐'.repeat(grade);
  };

  return (
    <>
      <tr className="border-b border-gray-200">
        <td className={`py-4 w-1/12 ${tag === '공지' ? 'font-bold' : ''}`}>
          {tag}
        </td>
        {item && (
          <td className="w-[13%] whitespace-nowrap h-10">
            <div className="flex justify-left items-center">
              <img className="w-10 h-full pr-1" src={itemImg} alt={item} />
              <span className="">{item}</span>
            </div>
          </td>
        )}
        {grade && <td className="truncate w-[12%]">{starGrade(grade)}</td>}
        {link && (
          <td className="text-left w-1/3 px-3">
            <Link to={link} className="line-clamp-1">
              {title}
              {attachFile && (
                <img
                  className="w-2 inline ml-2"
                  src="/attachFile.png"
                  alt="첨부파일 있음"
                />
              )}
            </Link>
          </td>
        )}
        {!link && (
          <td className="text-left w-1/3 px-3">
            <span className="line-clamp-1">{title}</span>
          </td>
        )}
        <td className="w-[10%]">{writerPrivate(writer)}</td>
        <td className="font-extralight w-[12%]">{date}</td>
      </tr>
    </>
  );
}

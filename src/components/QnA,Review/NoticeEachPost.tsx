import { useState } from 'react';
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
  collection?: string;
};

export default function NoticeEachPost({
  tag,
  title,
  writer,
  date,
  item,
  grade,
  link,
  itemImg,
  attachFile,
  collection,
}: board) {
  const [view, setView] = useState(false);

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
          <td className="max-w-fit whitespace-nowrap h-10 bg-starPink">
            <div className="flex justify-left items-center px-2">
              <img className="w-10 h-full pr-1" src={itemImg} alt={item} />
              <span className="">{item}</span>
            </div>
          </td>
        )}
        {grade && <td className="truncate w-1/12 pl-6">{starGrade(grade)}</td>}
        {link && (
          <td
            className={`text-left w-1/12 px-5 ${
              tag === '공지' && collection === 'qna'
                ? 'col-span-2 '
                : tag === '공지' && collection === 'review'
                ? 'col-span-3'
                : ''
            }`}
          >
            <Link
              to={link}
              onMouseOver={() => setView(true)}
              onMouseLeave={() => setView(false)}
            >
              <div className="flex relative max-w-fit">
                <span
                  className={`line-clamp-1 ${
                    tag === '공지' ? 'font-bold' : ''
                  }`}
                >
                  {title}
                </span>
                {attachFile && (
                  <>
                    <img
                      className="inline w-2 ml-2"
                      src="/attachFile.png"
                      alt="첨부파일 있음"
                    />
                    <img
                      className={`absolute top-0 -right-16 ${
                        view ? 'w-14' : 'w-0'
                      }`}
                      src={attachFile}
                      alt={title + '첨부파일'}
                      aria-hidden
                    />
                  </>
                )}
              </div>
            </Link>
          </td>
        )}
        {tag === '공지' && collection === 'qna' && <td></td>}
        {tag === '공지' && collection === 'review' && (
          <>
            <td></td>
            <td></td>
          </>
        )}
        {writer && <td className="w-[10%]">{writerPrivate(writer)}</td>}
        <td className="font-extralight w-[12%]">{date}</td>
      </tr>
    </>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';

type board = {
  tag: string | number | undefined;
  title: string | undefined;
  writer: string | undefined;
  link?: string;
  date: string | undefined;
  item?: string;
  grade?: number | string;
  itemImg?: string;
  attachFile?: string | undefined;
  collection?: string;
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
  collection,
}: board) {
  const [view, setView] = useState(false);

  const starGrade = (grade: number) => {
    return '⭐'.repeat(grade);
  };

  return (
    <>
      <tr className="border-b border-gray-200">
        <td className={`py-4 ${typeof tag === 'string' ? 'font-bold' : ''}`}>
          {tag}
        </td>

        {item && (
          <td className="whitespace-nowrap h-10 px-2">
            <div className="flex justify-left items-center px-2">
              <img className="w-10 h-full pr-1" src={itemImg} alt={item} />
              <span className="">{item}</span>
            </div>
          </td>
        )}

        {grade && (
          <td className="truncate pl-6 text-left">
            {starGrade(Number(grade))}
          </td>
        )}

        {link && (
          <td
            className={`text-left px-5 ${
              tag === '공지' && collection === 'qna'
                ? 'col-span-2'
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
              <div className="flex relative">
                <span
                  className={`${
                    tag === '공지'
                      ? 'font-bold whitespace-nowrap'
                      : 'line-clamp-1'
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
                      className={`absolute top-0 right-0 ${
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

        {writer && <td className="w-[10%]">{writer}</td>}

        <td className="font-extralight w-[12%]">{date}</td>
      </tr>
    </>
  );
}

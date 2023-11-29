import { Link } from 'react-router-dom';

type board = {
  tag: number | string | undefined;
  title: string;
  writer: string;
  link?: string;
  date: string;
  item?: string;
  grade?: number;
};

export default function EachPost({
  tag,
  title,
  writer,
  date,
  item,
  grade,
  link,
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
        <td className="py-4 w-1/12">{tag}</td>
        {item && <td className=" whitespace-nowrap w-[12%]">{item}</td>}
        {grade && <td className="truncate w-[12%]">{starGrade(grade)}</td>}
        {link && (
          <td className="text-left w-1/2">
            <Link to={link} className="line-clamp-1">
              {title}
            </Link>
          </td>
        )}
        {!link && (
          <td className="text-left">
            <span className="">{title}</span>
          </td>
        )}
        <td className="w-[10%]">{writerPrivate(writer)}</td>
        <td className="font-extralight w-[10%]">{date}</td>
      </tr>
    </>
  );
}

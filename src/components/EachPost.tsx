import { Link } from 'react-router-dom';

type board = {
  tag: number | string;
  title: string;
  writer: string;
  link?: string;
  date: string;
  item?: string;
  grade?: string;
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
    return writer.substring(0, 1) + '*'.repeat(`${writer}`.length - 1);
  };

  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="py-4">{tag}</td>
        {item && <td className="w-1/4">{item}</td>}
        {grade && <td>{grade}</td>}
        {link && (
          <td className="text-left">
            <Link to={link}>{title}</Link>
          </td>
        )}
        {!link && <td className="text-left">{title}</td>}
        <td>{writerPrivate(writer)}</td>
        <td className="font-extralight w-1/6">{date}</td>
      </tr>
    </>
  );
}

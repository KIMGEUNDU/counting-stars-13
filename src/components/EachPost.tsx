import { Link } from 'react-router-dom';

type board = {
  tag: string;
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
  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="py-4">{tag}</td>
        {item && <td>item</td>}
        {grade && <td>{grade}</td>}
        {link && (
          <td className="text-left">
            <Link to={link}>{title}</Link>
          </td>
        )}
        {!link && <td className="text-left">{title}</td>}
        <td>{writer}</td>
        <td className="font-extralight">{date}</td>
      </tr>
    </>
  );
}

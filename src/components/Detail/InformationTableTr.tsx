import { Link } from 'react-router-dom';

type InformationTableTr = {
  length: number;
  number: number;
  content: string;
  writer: string;
  date: string;
  link: string;
};

function InformationTableTr({
  length,
  number,
  content,
  writer,
  date,
  link,
}: InformationTableTr) {
  return (
    <tr className="border-b border-gray-200 flex items-center gap-2 text-center">
      <td className="py-4 w-1/12">{length - number}</td>
      <td className="w-9/12 truncate">
        <Link to={link}>{content}</Link>
      </td>
      <td className="w-1/12">{writer}</td>
      <td className="font-extralight w-2/12">{date}</td>
    </tr>
  );
}

export default InformationTableTr;

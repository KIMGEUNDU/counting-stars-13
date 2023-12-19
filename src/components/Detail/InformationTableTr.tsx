import { Link } from 'react-router-dom';

type InformationTableTr = {
  number: number;
  content: string;
  writer: string;
  date: string;
  link: number;
};

function InformationTableTr({
  number,
  content,
  writer,
  date,
  link,
}: InformationTableTr) {
  return (
    <tbody>
      <tr className="border-b border-gray-200 flex items-center gap-2 text-center">
        <td className="py-4 w-1/12">{number + 1}</td>
        <td className="w-9/12 truncate">
          <Link to={`/review-detail/${link}`}>{content}</Link>
        </td>
        <td className="w-1/12">{writer}</td>
        <td className="font-extralight w-2/12">{date}</td>
      </tr>
    </tbody>
  );
}

export default InformationTableTr;

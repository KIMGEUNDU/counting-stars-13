import { Link } from 'react-router-dom';

interface RelatedPostsTbody {
  num: number;
  name: string;
  title: string;
  writer: string;
  link: string;
}

function RelatedPostsTbody({
  num,
  name,
  title,
  writer,
  link,
}: RelatedPostsTbody) {
  const writerPrivate = (writer: string) => {
    return writer.substring(0, 2) + '*'.repeat(`${writer}`.length - 2);
  };

  return (
    <>
      <td className="py-3">{num + 1}</td>
      <td className="py-3">{name}</td>
      <td className="py-3 text-left px-3">
        <Link to={link}>
          <span className="w-1/5 truncate">{title}</span>
        </Link>
      </td>
      <td className="py-3">{writerPrivate(writer)}</td>
    </>
  );
}

export default RelatedPostsTbody;

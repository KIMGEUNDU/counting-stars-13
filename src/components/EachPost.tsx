type board = {
  tag: string;
  title: string;
  writer: string;
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
}: board) {
  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="py-4">{tag}</td>
        {item && <td>item</td>}
        {grade && <td>{grade}</td>}
        <td className="text-left">{title}</td>
        <td>{writer}</td>
        <td className="font-extralight">{date}</td>
      </tr>
    </>
  );
}

function CommentItem({
  writer,
  date,
  content,
}: Pick<QnaReviewTable, 'writer' | 'date' | 'content'>) {
  return (
    <div className="center border border-gray-300 text-sm">
      <div className="flex gap-4 border-b border-b-gray-300 p-3">
        <span className="font-semibold">{writer}</span>
        <span>{date}</span>
      </div>
      <p className="p-3">{content}</p>
    </div>
  );
}

export default CommentItem;

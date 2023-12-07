function CommentItem({ writer, createdAt, content }: Replies) {
  return (
    <div className="center border border-gray-300 text-sm my-3">
      <div className="flex gap-4 border-b border-b-gray-300 p-3">
        <span className="font-semibold">
          {writer === '무*' ? '별해달' : writer}
        </span>
        <span>{createdAt}</span>
      </div>
      <p className="p-3">{content}</p>
    </div>
  );
}

export default CommentItem;

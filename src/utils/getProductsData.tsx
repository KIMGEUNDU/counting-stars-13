export function sortQnaReviewData(data: Replies[] | CommentData[]) {
  return data.slice().sort((a, b) => Number(b._id) - Number(a._id));
}

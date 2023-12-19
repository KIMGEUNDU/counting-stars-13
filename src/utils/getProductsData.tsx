export function sortQnaReviewData(data: Replies[] | CommentData[]) {
  return data.slice().sort((a, b) => Number(b._id) - Number(a._id));
}
export function dateSortQnaReviewData(array: Replies[]) {
  return array.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return 0;
    }
  });
}

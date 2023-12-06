export function sortQnaReviewData(data: Replies[]) {
  return data.slice().sort((a, b) => Number(b._id) - Number(a._id));
}

export function sortQnaReviewData(data: QnaReviewData[]) {
  return data.slice().sort((a, b) => Number(b._id) - Number(a._id));
}

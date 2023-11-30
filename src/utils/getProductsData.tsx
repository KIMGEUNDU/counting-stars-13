export function sortQnaReviewData(data: QnaReviewData[]) {
  return data.slice().sort((a, b) => Number(b._id) - Number(a._id));
}

export function commaPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

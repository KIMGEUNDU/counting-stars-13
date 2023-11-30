export function AUTH_TOKEN() {
  return localStorage.getItem('accessToken');
}

export function AUTH_ID() {
  return localStorage.getItem('id');
}
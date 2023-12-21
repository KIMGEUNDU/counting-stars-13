export function AUTH_TOKEN() {
  return localStorage.getItem('accessToken');
}

export function AUTH_ID() {
  return localStorage.getItem('id');
}

export function AUTH_RefreshTOKEN() {
  return localStorage.getItem('refreshToken');
}

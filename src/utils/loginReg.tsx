//아이디: 영문자로 시작하는 영문자 또는 숫자 4~16자
export function emailReg(text: string) {
  const re = /^[a-z]+[a-z0-9]{3,15}$/g;

  return re.test(String(text).toLowerCase());
}
//비밀번호: 영문, 숫자 조합으로 8~16자
export function pwReg(text: string) {
  const re = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  return re.test(String(text).toLowerCase());
}

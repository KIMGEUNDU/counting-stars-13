//아이디: 영문자로 시작하는 영문자 또는 숫자 4~16자
export function idReg(text: string) {
  const re = /^[a-z]+[a-z0-9]{3,15}$/g;

  return re.test(String(text).toLowerCase());
}
//비밀번호: 영문, 숫자 조합으로 8~16자
export function pwReg(text: string) {
  const re = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  return re.test(String(text).toLowerCase());
}
//이메일: 영문자로 시작하는 영문자 또는 숫자 4~16자
export function emailReg(text: string) {
  const re =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  return re.test(String(text).toLowerCase());
}
//핸드폰 번호 유효성 검사
export function phoneReg(text: string) {
  const re = /^\d{3}-\d{3,4}-\d{4}$/;

  return re.test(String(text).toLowerCase());
}

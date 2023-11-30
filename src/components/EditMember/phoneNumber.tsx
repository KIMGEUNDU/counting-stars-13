type phoneNumber = {
  phoneFirst: string;
  phoneMiddle: string;
  phoneLast: string;
};

export const phoneNumber = (
  phone: string,

  setPhoneNumber: (val: phoneNumber) => void
) => {
  if (phone.length <= 10) {
    setPhoneNumber({
      phoneFirst: `${phone.slice(0, 3)}`,
      phoneMiddle: `${phone.slice(3, 6)}`,
      phoneLast: `${phone.slice(6, 10)}`,
    });
  }
  if (phone.length > 10) {
    setPhoneNumber({
      phoneFirst: `${phone.slice(0, 3)}`,
      phoneMiddle: `${phone.slice(3, 7)}`,
      phoneLast: `${phone.slice(7, 11)}`,
    });
  }
};

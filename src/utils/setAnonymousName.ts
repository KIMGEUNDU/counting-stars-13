export const setAnonymousName = (userName: string | undefined) => {
  if (userName === "무지" || userName === "무*") {
    return "⭐ 별해달";
  } else if (userName) {
    return userName.slice(0, 1) + '*'.repeat(userName.length - 1);
  }
};
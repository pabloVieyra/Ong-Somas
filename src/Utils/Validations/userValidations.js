export const containsSixCharacters = (value) => value.length < 6;
export const containsOneNumber = (value) => /[\d]{1}/g.test(value);
export const containSpecialCharacter = (value) =>
  /[!@#$%^&*(),.?":{}|<>]/g.test(value);
export const containsOneLetter = (value) => /[a-zA-Z]/.test(value);
export const validEmail = (value) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

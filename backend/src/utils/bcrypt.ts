import bcrypt from "bcrypt";

export const hashValue = (password: string, salt?: number) =>
  bcrypt.hash(password, salt || 10);

export const compareValue = (value: string, hashedValue: string) => {
  bcrypt.compare(value, hashedValue).catch(() => false);
};

export const limitString = (
  str: string,
  maxLength: number,
  fromEnd?: number,
): string => {
  if (!str) {
    return '';
  }

  if (str.length <= maxLength) {
    return str;
  }

  if (fromEnd) {
    return `...${str.slice(str.length - maxLength)}`;
  }

  return `${str.slice(0, Math.max(0, maxLength - 3))}...`;
};

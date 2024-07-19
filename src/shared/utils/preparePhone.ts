export const preparePhone = (value: string): string => {
  if (value.length < 10 || value.length > 10) return value;

  const firstPart = value.substring(0, 3);
  const secondPart = value.substring(3, 6);
  const thirdPart = value.substring(6, 8);
  const fourthPart = value.substring(8, 10);

  return `+7 (${firstPart}) ${secondPart}-${thirdPart}-${fourthPart}`;
};

export const formatDate = (date: string) => {
  const formattedDate = date.split("-").reverse().join(".");
  return formattedDate;
};

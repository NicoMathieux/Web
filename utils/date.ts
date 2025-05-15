export const formatDate = (date: string) => {
  const formattedDate = date.split("-").reverse().join(".");
  return formattedDate;
};

export const letterDate = (date: string) => {
  const [year, month] = date.split("-");
  const dateObj = new Date(parseInt(year), parseInt(month) - 1);
  const monthName = dateObj.toLocaleString('fr', { month: 'long' });
  return `${monthName} ${year}`;
};
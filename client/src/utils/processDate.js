
const processDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dayOfWeek = date.getDay();
  return { day, month, year, dayOfWeek };
};

export default processDate;

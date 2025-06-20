import dayjs from "dayjs";

export const getMonthDays = (month, year) => {
  const start = dayjs().year(year).month(month).startOf("month");
  const end = dayjs().year(year).month(month).endOf("month");

  const days = [];

  for (let i = 0; i < start.day(); i++) {
    days.push(null);
  }

  for (let i = 1; i <= end.date(); i++) {
    days.push(dayjs().year(year).month(month).date(i));
  }

  return days;
};

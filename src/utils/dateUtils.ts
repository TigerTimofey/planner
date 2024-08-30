import {
  addDays,
  eachWeekOfInterval,
  format,
  getISOWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameMonth,
} from "date-fns";

import { Week } from "../utils/interfaces";

export function getCurrentQuarter(date: Date): number {
  const month = date.getMonth() + 1;
  return Math.ceil(month / 3);
}

export function getQuarterMonths(quarter: number): string[] {
  switch (quarter) {
    case 1:
      return ["January", "February", "March"];
    case 2:
      return ["April", "May", "June"];
    case 3:
      return ["July", "August", "September"];
    case 4:
      return ["October", "November", "December"];
    default:
      return [];
  }
}

export function getWeeksInQuarter(quarter: number, year: number): Week[] {
  const months = getQuarterMonths(quarter).map(
    (month) => new Date(`${month} 1, ${year}`)
  );

  let weeks: Week[] = [];

  months.forEach((monthDate) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);

    eachWeekOfInterval(
      { start: monthStart, end: monthEnd },
      { weekStartsOn: 1 }
    ).forEach((weekStart) => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

      const daysInCurrentMonth = [weekStart, weekEnd].filter((date) =>
        isSameMonth(date, monthDate)
      ).length;

      const daysInNextMonth = 7 - daysInCurrentMonth;

      const month =
        daysInCurrentMonth >= daysInNextMonth
          ? format(monthStart, "MMMM")
          : format(addDays(monthStart, 7), "MMMM");

      weeks.push({
        weekNumber: getISOWeek(weekStart),
        month: month,
      });
    });
  });

  return weeks;
}

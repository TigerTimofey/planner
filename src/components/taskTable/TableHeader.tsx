import React from "react";
import { Week } from "../../utils/interfaces";

interface TableHeaderProps {
  weeks: Week[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ weeks }) => {
  return (
    <>
      <thead>
        <tr>
          <th rowSpan={2}>Task Name</th>
          <th rowSpan={2}>Start Date</th>
          <th rowSpan={2}>End Date</th>
          {weeks.map((week, index, array) => {
            if (index === 0 || week.month !== array[index - 1].month) {
              const sameMonthWeeks = array.filter(
                (w) => w.month === week.month
              ).length;
              return (
                <th key={index} colSpan={sameMonthWeeks}>
                  {week.month}
                </th>
              );
            }
            return null;
          })}
        </tr>
        <tr>
          {weeks.map((week, index) => (
            <th key={index}>{week.weekNumber}</th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;

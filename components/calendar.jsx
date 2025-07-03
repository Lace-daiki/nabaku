"use client";

import {
  format,
  addWeeks,
  subWeeks,
  startOfWeek,
  addDays,
  isSameDay,
  isBefore,
  isAfter,
  isWithinInterval,
} from 'date-fns';
import { useState } from 'react';

export default function TimeStamp() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  const start = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  const handleDayClick = (day) => {
    if (isBefore(day, today)) return;

    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(day);
      setRangeEnd(null);
    } else if (isAfter(day, rangeStart)) {
      setRangeEnd(day);
    } else {
      setRangeStart(day);
    }
  };

  const isInRange = (day) =>
    rangeStart &&
    rangeEnd &&
    isWithinInterval(day, { start: rangeStart, end: rangeEnd });

  const isSelected = (day) =>
    isSameDay(day, rangeStart) || isSameDay(day, rangeEnd);

  const isToday = (day) => isSameDay(day, today);
  const isDisabled = (day) => isBefore(day, today);

  return (
    <div className="w-full h-[180px] bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setCurrentDate(subWeeks(currentDate, 1))} className="text-gray-600 hover:text-indigo-500">&lt;</button>
        <h2 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentDate(addWeeks(currentDate, 1))} className="text-gray-600 hover:text-indigo-500">&gt;</button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const inRange = isInRange(day);
          const todayHighlight = isToday(day);

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={disabled}
              className={`
                flex flex-col items-center py-2 px-1 rounded-[22px] transition-all text-sm
                ${disabled ? 'text-gray-300 cursor-not-allowed' : ''}
                ${selected ? 'bg-indigo-600 text-white font-bold' : ''}
                ${inRange ? 'bg-indigo-100 text-indigo-700' : ''}
                ${todayHighlight ? 'bg-[#EBEEF9] text-gray-700 font-bold' : ''}
                ${!selected && !inRange && !todayHighlight && !disabled ? 'hover:bg-gray-100 text-gray-800' : ''}
              `}
            >
              <span className="uppercase text-[12px] font-medium tracking-wide mb-4">
                {format(day, 'EEE')}
              </span>
              <span className="w-[32px] h-[32px] text-[12px] font-medium bg-gray-200 p-2 rounded-[40px]">{format(day, 'd')}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
import React, { useState } from "react";
import dayjs from "dayjs";
import { getMonthDays } from "../utils/dateHelpers";

export default function Calendar({ events }) {
  const today = dayjs();
  const [month, setMonth] = useState(today.month());
  const [year, setYear] = useState(today.year());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const days = getMonthDays(month, year);

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(prev => prev + 1);
    } else {
      setMonth(prev => prev + 1);
    }
  };
  const handleMoreClick = (date) => {
  setSelectedDate(date);
  setShowModal(true);
};

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(prev => prev - 1);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const isToday = (date) =>
    date && date.isSame(dayjs(), "day");

  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(e => dayjs(e.date).isSame(date, 'day'));
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="px-3 py-1 bg-gray-200 rounded">←</button>
        <h2 className="text-2xl font-bold">
          {dayjs().month(month).format("MMMM")} {year}
        </h2>
        <button onClick={nextMonth} className="px-3 py-1 bg-gray-200 rounded">→</button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2 text-gray-700">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          const eventList = getEventsForDate(date);
          const visibleEvents = eventList.slice(0, 2);
          const remainingCount = eventList.length - visibleEvents.length;

          return (
            <div
              key={index}
              className={`h-36 border rounded p-2 text-xs relative flex flex-col justify-between
               ${isToday(date) ? "border-red-500 bg-pink-100" : "border-gray-200 bg-white"}
              `}>
              <div className={`text-sm font-semibold mb-1 ${isToday(date) ? 
                "text-red-700" : "text-gray-700"}`}>
                {date ? date.date() : ""}
              </div>
              <div className="space-y-1 overflow-hidden">
                {visibleEvents.map((e) => (
                  <div
                    key={e.id}
                    className="bg-gray-200 rounded px-1 py-0.5 text-[11px] truncate"
                  >
                    <div className="font-medium">{e.title}</div>
                    <div className="text-[10px] text-gray-600">{e.time}</div>
                  </div>
                ))}

                {remainingCount > 0 && (
                  <button onClick={() => handleMoreClick(date)}
                    className="text-blue-600 text-[11px] mt-1 underline hover:text-blue-800">
                    +{remainingCount} more
                  </button>

                )}
              </div>
              {showModal && selectedDate && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-bold mb-2">
        Events on {selectedDate.format("DD MMM YYYY")}
      </h2>

      <ul className="space-y-2">
        {getEventsForDate(selectedDate).map((e) => (
          <li key={e.id} className="bg-gray-100 rounded p-2 text-sm">
            <div className="font-semibold">{e.title}</div>
            <div className="text-gray-600 text-xs">Time: {e.time}</div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setShowModal(false)}
        className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Close
      </button>
    </div>
  </div>
)}

            </div>
          );
        })}
      </div>
    </div>
  );
}

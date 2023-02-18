import { IconCircle, IconArrow, IconArrowDown } from "@tabler/icons";
import React, { useState } from "react";

const DateHeader = () => {
  // Get the current date
  const now = new Date();

  // Determine the beginning and end of the current week
  const currentWeekStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay()
  );
  const currentWeekEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + (6 - now.getDay())
  );

  // Create an array of days within the current week
  const currentWeek = [];
  for (
    let date = currentWeekStart;
    date <= currentWeekEnd;
    date.setDate(date.getDate() + 1)
  ) {
    const day = new Date(date);
    currentWeek.push({
      dayName: day.toLocaleString("default", { weekday: "short" }),
      day: day.getDate(),
      date: day.toISOString().slice(0, 10),
    });
  }
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      {/* {`${currentWeek[0].date} - ${currentWeek[6].date}`} */}
      <div
        className=" flex justify-center items-center"
        style={{ backgroundColor: "#393D47" }}
      >
        {currentWeek.map((day) => (
          <div
            key={day.date}
            className="flex flex-col justify-between items-center w-1/6"
            onClick={() => setSelectedDate(day.date)}
          >
            {day.date === now.toISOString().slice(0, 10) ? (
              <IconArrowDown size={20} color="yellow" />
            ) : (
              <IconArrowDown
                style={{ backgroundColor: "#393D47" }}
                size={20}
                color="#393D47"
              />
            )}
            <p className="text-white my-0">{day.day}</p>
            <IconCircle
              className="mt-0"
              size={30}
              stroke={1.5}
              color={day.date === selectedDate ? "yellow" : "white"}
            />
            <p className=" text-white mt-0">{day.dayName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateHeader;

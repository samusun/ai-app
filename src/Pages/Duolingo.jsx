import React from "react";

const DayProgressItem = ({ day, color, top, left, zIndex }) => {
  return (
    <div
      className="day-progress absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg cursor-pointer transition-colors duration-200"
      style={{ top, left, zIndex }}
    >
      <div
        className={`day-progress-item w-20 h-20 rounded-full bg-${color}-400 flex justify-center items-center hover:bg-${color}-500 transition-colors duration-200`}
      >
        {day}
      </div>
    </div>
  );
};

const Duolingo = () => {
  const positionMap = [
    { top: "33%", left: "50%", zIndex: 1 },
    { top: "45%", left: "60%", zIndex: 2 },
    { top: "58%", left: "70%", zIndex: 3 },
    { top: "70%", left: "80%", zIndex: 4 },
    { top: "82%", left: "70%", zIndex: 3 },
    { top: "94%", left: "60%", zIndex: 2 },
    { top: "107%", left: "50%", zIndex: 1 },
    { top: "120%", left: "40%", zIndex: 2 },
    { top: "132%", left: "30%", zIndex: 3 },
    { top: "144%", left: "20%", zIndex: 4 },
    { top: "156%", left: "30%", zIndex: 3 },
    { top: "168%", left: "40%", zIndex: 2 },
    { top: "180%", left: "50%", zIndex: 1 },
    { top: "192%", left: "60%", zIndex: 2 },
    { top: "204%", left: "70%", zIndex: 3 },
    { top: "216%", left: "80%", zIndex: 4 },
    { top: "228%", left: "70%", zIndex: 3 },
  ];

  const dayProgress = [
    { day: 1, color: "green" },
    { day: 2, color: "yellow" },
    { day: 3, color: "red" },
    { day: 4, color: "blue" },
    { day: 5, color: "purple" },
    { day: 6, color: "pink" },
    { day: 7, color: "orange" },
    { day: 8, color: "green" },
    { day: 9, color: "yellow" },
    { day: 10, color: "red" },
    { day: 11, color: "blue" },
    { day: 12, color: "purple" },
    { day: 13, color: "pink" },
    { day: 14, color: "orange" },
    { day: 15, color: "green" },
    { day: 16, color: "yellow" },
    { day: 17, color: "red" },
  ];

  return (
    <div className="bg-black text-white h-screen flex justify-center items-center">
      {dayProgress.map((day, index) => (
        <DayProgressItem
          key={day.day}
          day={day.day}
          color={day.color}
          top={positionMap[index].top}
          left={positionMap[index].left}
          zIndex={positionMap[index].zIndex}
        />
      ))}
    </div>
  );
};

export default Duolingo;

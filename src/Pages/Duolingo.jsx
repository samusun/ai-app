import { Image } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import maskotFlying from "../Assets/maskotFlying.svg";

const DayProgressItem = ({ day, color, top, left, zIndex, onClick }) => {
  return (
    <div
      className="day-progress absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg cursor-pointer transition-colors duration-200"
      style={{ top, left, zIndex }}
      onClick={onClick}
    >
      <div
        className="day-progress-item w-20 h-20 rounded-full flex justify-center items-center hover:opacity-75 transition-opacity duration-200"
        style={{ backgroundColor: color }}
      >
        Day {day}
      </div>
    </div>
  );
};

const DayProgressExtra = ({ top, left, zIndex }) => {
  return (
    <div
      className="day-progress absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg cursor-pointer transition-colors duration-200"
      style={{ top, left, zIndex }}
    >
      <Image height={120} src={maskotFlying} alt="dumbbells" />
    </div>
  );
};

const Duolingo = () => {
  const navigate = useNavigate();
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
    { day: 1, color: "#FFA726" },
    { day: 2, color: "#29B6F6" },
    { day: 3, color: "#66BB6A" },
    { day: 4, color: "#FF7043" },
    { day: 5, color: "#9575CD" },
    { day: 6, color: "#FFCA28" },
    { day: 7, color: "#4DD0E1" },
    { day: 8, color: "#FFA726" },
    { day: 9, color: "#29B6F6" },
    { day: 10, color: "#66BB6A" },
    { day: 11, color: "#FF7043" },
    { day: 12, color: "#9575CD" },
    { day: 13, color: "#FFCA28" },
    { day: 14, color: "#4DD0E1" },
    { day: 15, color: "#FFA726" },
    { day: 16, color: "#29B6F6" },
    { day: 17, color: "#66BB6A" },
  ];

  return (
    <div className="bg-black text-white h-screen flex justify-center items-center">
      {dayProgress.map((day, index) => {
        // Determine if the current index corresponds to a position of 0, 4, 8, etc.
        const shouldRenderExtra = index === 3 || index === 9;
        // Determine the value of the "left" variable based on the position
        const left = (index + 1) % 10 === 0 ? 250 : 100;

        return (
          <div key={day.day}>
            <DayProgressItem
              key={day.day}
              day={day.day}
              color={day.color}
              top={positionMap[index].top}
              left={positionMap[index].left}
              zIndex={positionMap[index].zIndex}
              onClick={() => navigate(`/challange`)}
            />
            {/* Only render the DayProgressExtra component if the index corresponds to a position of 0, 4, 8, etc. */}
            {shouldRenderExtra && (
              <DayProgressExtra
                top={positionMap[index].top}
                left={left}
                zIndex={positionMap[index].zIndex}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Duolingo;

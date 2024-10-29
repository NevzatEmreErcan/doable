import React, { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { startOfDay } from "date-fns";

const ItemRoutine = ({
  routine,
  setSelectedRoutine,
  handleEditRoutine,
  handleDeleteRoutine,
  setSelectedSlide,
  setIsSlideInOpen,
}) => {
  const [isClickable, setIsClickable] = useState(true);

  useEffect(() => {
    const todaysDay = startOfDay(new Date()).getDay();
    if (
      !routine.repeat.includes(String(todaysDay)) &&
      routine.repeat !== "daily"
    ) {
      setIsClickable(false);
    }
  });

  const checkboxClass = routine.isDone
    ? "bg-black/50 rounded-md p-1 text-white ease-in-out duration-300"
    : "bg-black/50 rounded-md p-1 text-transparent ease-in-out duration-300 hover:bg-black/75";

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function handleRoutineCheckbox() {
    const updatedRoutine = {
      ...routine,
      isDone: !routine.isDone,
    };
    handleEditRoutine(updatedRoutine);
  }

  function handleRepeatDay() {
    if (routine.repeat === "daily") return "Daily";

    return routine.repeat
      .sort((a, b) => a - b)
      .map((day) => daysOfWeek[day])
      .join(", ");
  }

  return (
    <div className={`${routine.colorTag} min-h-[60px] rounded-xl`}>
      <div className="flex">
        {/* Checkbox */}
        <div className="flex justify-center items-center h-[40px] w-[40px]">
          <button
            className={`${checkboxClass} ${
              !isClickable && "cursor-not-allowed"
            }`}
            onClick={handleRoutineCheckbox}
            disabled={!isClickable}>
            <FaCheck className="text-md" />
          </button>
        </div>

        {/* Title */}
        <div className="h-[40px] flex items-center text-xl flex-grow">
          <span
            className={routine.isDone ? "line-through text-white/80" : null}>
            {routine.title}
          </span>
        </div>

        {/* Setting Buttons */}
        <div className="flex items-center justify-center gap-2 w-[80px]">
          <button
            type="button"
            onClick={() => {
              setSelectedSlide("edit-routine");
              setSelectedRoutine(routine);
              setIsSlideInOpen(true);
            }}>
            <FaEdit />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteRoutine(routine.id)}
            className="hover:text-red-500">
            <FaTrashAlt />
          </button>
        </div>
      </div>

      <div>
        <div className="text-sm flex items-center gap-1 pl-3 pb-1 text-white/90">
          <FaRepeat />
          <span>{handleRepeatDay()}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemRoutine;

import { format } from "date-fns";
import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactSlider from "react-slider";

const ItemGoal = ({
  goal,
  setSelectedGoal,
  handleEditGoal,
  handleDeleteGoal,
  setSelectedSlide,
  setIsSlideInOpen,
}) => {
  const [value, setValue] = useState(goal.target.value);

  function handleDeadline(deadline) {
    const todaysDate = new Date();
    if (deadline.month - todaysDate.getMonth() < 0) {
      return "Overdue";
    } else if (deadline.month === todaysDate.getMonth()) {
      return "End of this year";
    } else if (deadline.month - todaysDate.getMonth() === 1) {
      return "End of next month";
    } else if (deadline.year === todaysDate.getFullYear()) {
      return "End of this year";
    } else if (deadline.year - todaysDate.getFullYear() < 0) {
      return "Overdue";
    } else if (deadline === "someday") {
      return "someday";
    } else {
      const deadlineObj = new Date(goal.deadline);
      return `${deadlineObj.getDate()} 
              ${format(deadlineObj, "MMM")}
              ${deadlineObj.getFullYear()}`;
    }
  }

  function handleSlideUpdate(value) {
    const updatedGoal = {
      ...goal,
      target: {
        ...goal.target,
        value: value,
      },
    };

    handleEditGoal(updatedGoal);
  }

  return (
    <>
      <div className={`${goal.colorTag} min-h-[60px] rounded-xl py-2 px-6`}>
        <div className="flex">
          {/* Title */}
          <div className="flex items-center text-xl flex-grow">
            <span className={goal.isDone ? "line-through text-white/80" : null}>
              {goal.title}
            </span>
          </div>

          {/* Setting Buttons */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedSlide("edit-goal");
                setSelectedGoal(goal);
                setIsSlideInOpen(true);
              }}>
              <FaEdit />
            </button>
            <button
              type="button"
              onClick={() => handleDeleteGoal(goal.id)}
              className="hover:text-red-500">
              <FaTrashAlt />
            </button>
          </div>
        </div>

        {/* Deadline */}
        <div className="text-sm text-gray-200 pl-2">
          {handleDeadline(goal.deadline)}
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex gap-x-6">
            <div className="flex-grow h-6">
              <ReactSlider
                className="p-2"
                thumbClassName="top-[2px] w-4 h-4 bg-background-800 ring-2 ring-background-500 rounded-full flex items-center justify-center text-white"
                trackClassName="bg-background-300 h-1"
                renderThumb={(props, state) => {
                  const { key, ...rest } = props;
                  return <div {...rest} key={key}></div>;
                }}
                min={0}
                max={+goal.target.target}
                defaultValue={+value}
                onChange={(newValue) => setValue(newValue)}
                onAfterChange={handleSlideUpdate}
              />
            </div>
            <div className="flex items-center justify-center gap-2 w-8">
              {Math.floor((+value / +goal.target.target) * 100)}%
            </div>
          </div>
          <div className={goal.target.unit === "%" ? "hidden" : ""}>
            {value} / {goal.target.target} {goal.target.unit}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemGoal;

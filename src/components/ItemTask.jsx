import React, { useState } from "react";
import { format } from "date-fns";
import { FaCheck, FaEdit, FaTrashAlt, FaCalendarAlt } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { HiBars3BottomLeft } from "react-icons/hi2";

const ItemTask = ({
  task,
  setSelectedTask,
  handleEditTask,
  handleDeleteTask,
  setSelectedSlide,
  setIsSlideInOpen,
}) => {
  const [isSubtaskCollapse, setIsSubtaskCollapse] = useState(true);

  const deadlineObj = new Date(task.deadline);

  const checkboxClass = task.isDone
    ? "bg-black/50 rounded-md p-1 text-white ease-in-out duration-300"
    : "bg-black/50 rounded-md p-1 text-transparent ease-in-out duration-300 hover:bg-black/75";

  const checkedSubtaskCheckboxStyle =
    "w-4 h-4 bg-black/50 rounded-sm text-[10px] flex justify-center items-center text-white ";
  const uncheckedSubtaskCheckboxStye =
    "w-4 h-4 bg-black/50 rounded-sm text-[10px] flex justify-center items-center text-transparent ease-in-out duration-300 hover:bg-black/75";

  function handleTaskCheckbox() {
    const updatedTask = {
      ...task,
      isDone: !task.isDone,
    };
    handleEditTask(updatedTask);
  }

  function handleSubtaskCheckbox(id) {
    const updatedSubtask = task.subtaskList.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
    });

    const updatedTask = {
      ...task,
      subtasks: updatedSubtask,
    };

    handleEditTask(updatedTask);
  }

  function handleSubtaskCollapse() {
    setIsSubtaskCollapse((prevState) => !prevState);
  }

  function capitalizeFirstLetter(string) {
    return (
      string.charAt(0).toLocaleUpperCase() + string.slice(1).toLocaleLowerCase()
    );
  }

  return (
    <div className={`${task.colorTag} min-h-[60px] rounded-xl`}>
      <div className="flex">
        {/* Checkbox */}
        <div className="flex justify-center items-center h-[40px] w-[40px]">
          <button className={checkboxClass} onClick={handleTaskCheckbox}>
            <FaCheck className="text-md" />
          </button>
        </div>

        {/* Title */}
        <div className="h-[40px] flex items-center text-xl flex-grow">
          <span className={task.isDone ? "line-through text-white/80" : null}>
            {task.title}
          </span>
        </div>

        {/* Setting Buttons */}
        <div className="flex items-center justify-center gap-2 w-[80px]">
          <button
            type="button"
            onClick={() => {
              setSelectedSlide("edit-task");
              setSelectedTask(task);
              setIsSlideInOpen(true);
            }}>
            <FaEdit />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteTask(task.id)}
            className="hover:text-red-500">
            <FaTrashAlt />
          </button>
        </div>
      </div>

      {/* Subtask List */}
      {task.subtaskList.length > 0 && (
        <div className="ml-[40px] mb-1">
          <button
            onClick={handleSubtaskCollapse}
            className="flex items-center gap-x-1 text-xs bg-black/75 rounded-md p-1">
            <HiBars3BottomLeft />
            Subtask
            {isSubtaskCollapse ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </button>
          <ul>
            {isSubtaskCollapse &&
              task.subtaskList.map((item, index) => (
                <li key={index}>
                  <div className="text-sm flex items-center gap-x-2 my-[2px] ml-1">
                    <button
                      onClick={() => handleSubtaskCheckbox(item.id)}
                      className={
                        item.isDone
                          ? checkedSubtaskCheckboxStyle
                          : uncheckedSubtaskCheckboxStye
                      }>
                      <FaCheck />
                    </button>
                    <span
                      className={
                        item.isDone ? "line-through text-white/80" : null
                      }>
                      {item.title}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Deadline */}
      <div className="text-sm flex items-center gap-1 pl-3 pb-1 text-white/90">
        <FaCalendarAlt />
        <span className={task.isDone ? "line-through text-white/80" : null}>
          {!isNaN(deadlineObj.getDate())
            ? `${deadlineObj.getDate()} ${format(deadlineObj, "MMM")}`
            : capitalizeFirstLetter(task.deadline)}
        </span>
      </div>
    </div>
  );
};
export default ItemTask;

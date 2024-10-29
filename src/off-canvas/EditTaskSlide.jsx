import React, { useState } from "react";
import DateCalender from "../components/DateCalender";
import { IoMdClose, IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { startOfDay } from "date-fns";

const EditTaskSlide = ({ task, setIsSlideInOpen, handleEditTask }) => {
  /* DOM States  */
  const [isColorTagOpen, setIsColorTagOpen] = useState(false);
  const [selectedDeadlineButton, setSelectedDeadlineButton] = useState(
    task.deadline
  );
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isSubtaskOpen, setIsSubtaskOpen] = useState(false);
  const [subtaskListItem, setSubtaskListItem] = useState("");
  const [isTitleWarningCollapse, setIsTitleWarningCollapse] = useState(true);
  const [isDateWarningCollapse, setIsDateWarningCollapse] = useState(true);

  const [title, setTitle] = useState(task.title);
  const [selectedColorTag, setSelectedColorTag] = useState(task.colorTag);
  const [selectedDeadline, setSelectedDeadline] = useState(task.deadline);
  const [note, setNote] = useState(task.note);
  const [subtaskList, setSubtaskList] = useState(task.subtaskList);

  /* Styles */
  const colorButtonStyle =
    "w-4 h-4 rounded-full ring-2 ease-in-out delay-50 duration-150 hover:scale-110";
  const deadlineStyle =
    "flex items-center gap-x-2 ease-in-out delay-50 duration-150  hover:scale-110 ";
  const deadlineButtonStyle = "w-4 h-4 rounded-full ring-2 ring-gray-300 ";
  const toggleButtonStyle =
    "text-lg ease-in-out duration-300 hover:scale-110 hover:text-primary-300";

  /* Color Tag Functions */
  function handleColorToggle(value) {
    setSelectedColorTag(value);
  }

  /* Deadline Functions */
  function getTodaysDate() {
    return startOfDay(new Date());
  }

  function getTomorrowsDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return startOfDay(tomorrow);
  }

  function handleDeadline(value) {
    setSelectedDeadlineButton(value);

    switch (value) {
      case "today":
        setSelectedDeadline(getTodaysDate());
        break;
      case "tomorrow":
        setSelectedDeadline(getTomorrowsDate());
        break;
      case "specific-day":
        break;
      default:
        setSelectedDeadline(value);
    }
  }

  function handleSpecificDateChange(date) {
    setSelectedDeadline(date);
  }

  /* Note Functions */
  function noteAutoGrow(element) {
    element.style.height = element.scrollHeight + "px";
  }

  /* Sub Task Functions */
  function handleAddSubtaskItem() {
    if (subtaskListItem.trim()) {
      setSubtaskList([
        ...subtaskList,
        {
          id: generateId(),
          title: subtaskListItem,
          isDone: false,
        },
      ]);
      setSubtaskListItem("");
    }
  }

  function handleDeleteSubtaskItem(index) {
    const newSubtaskList = subtaskList.filter((_, i) => i !== index);
    setSubtaskList(newSubtaskList);
  }

  function handleSubmit() {
    if (!title.trim()) {
      setIsTitleWarningCollapse(false);
    } else if (!selectedDeadline) {
      setIsDateWarningCollapse(false);
    } else {
      const updatedTask = {
        id: task.id,
        title,
        colorTag: selectedColorTag,
        deadline: selectedDeadline,
        note,
        subtaskList,
        isDone: task.isDone,
      };

      handleEditTask(updatedTask);
      setIsSlideInOpen(false);
    }
  }
  return (
    <>
      <div>
        <div className="flex items-center justify-between text-3xl py-4 px-5 border-b border-gray-700 self-center">
          <h1>Edit {task.title}</h1>
          <button onClick={() => setIsSlideInOpen(false)}>
            <IoMdClose />
          </button>
        </div>
        <div>
          <form>
            <div className="flex flex-col items-center gap-y-8 mt-10">
              {/* Title */}
              <div>
                <div className="flex flex-col items-center gap-y-2">
                  <h2 className="text-xl">Title</h2>
                  <input
                    type="text"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                    className="w-[450px] bg-background-700 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <div
                  className={
                    isTitleWarningCollapse
                      ? "hidden"
                      : "text-red-500 text-sm text-center pt-1"
                  }>
                  The title field is required
                </div>
              </div>

              {/* Color Tag */}
              <div className="w-1/3">
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    onClick={() => setIsColorTagOpen(!isColorTagOpen)}>
                    <h2 className={toggleButtonStyle}>Color Tag</h2>
                  </button>
                </div>
                <div
                  className={
                    isColorTagOpen
                      ? "grid grid-cols-4 gap-y-3 place-items-center mt-4"
                      : "hidden"
                  }>
                  <button
                    type="button"
                    onClick={() => handleColorToggle("bg-purple-700")}
                    className={`${
                      selectedColorTag === "bg-purple-700" && "bg-purple-700"
                    } ${colorButtonStyle} ring-purple-700`}></button>
                  <button
                    type="button"
                    onClick={() => handleColorToggle("bg-blue-800")}
                    className={`${
                      selectedColorTag === "bg-blue-800" && "bg-blue-800"
                    } ${colorButtonStyle} ring-blue-800`}></button>
                  <button
                    type="button"
                    onClick={() => handleColorToggle("bg-blue-400")}
                    className={`${
                      selectedColorTag === "bg-blue-400" && "bg-blue-400"
                    } ${colorButtonStyle} ring-blue-400`}></button>
                  <button
                    type="button"
                    onClick={() => handleColorToggle("bg-pink-600")}
                    className={`${
                      selectedColorTag === "bg-pink-600" && "bg-pink-600"
                    } ${colorButtonStyle} ring-pink-600`}></button>
                  <button
                    type="button"
                    onClick={() => handleColorToggle("bg-red-700")}
                    className={`${
                      selectedColorTag === "bg-red-700" && "bg-red-700"
                    } ${colorButtonStyle} ring-red-700`}></button>
                  <button
                    type="button"
                    onClick={() => handleColorToggle("bg-yellow-500")}
                    className={`${
                      selectedColorTag === "bg-yellow-500" && "bg-yellow-500"
                    } ${colorButtonStyle} ring-yellow-500`}></button>
                  <button
                    type="button"
                    onClick={() => handleColorToggle("bg-green-700")}
                    className={`${
                      selectedColorTag === "bg-green-700" && "bg-green-700"
                    } ${colorButtonStyle} ring-green-700`}></button>
                  <button
                    type="button"
                    onClick={() => handleColorToggle("bg-background-700")}
                    className={`${
                      selectedColorTag === "bg-background-700" && ""
                    } ${colorButtonStyle} ring-gray-700`}>
                    <IoMdClose className="text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Deadline */}
              <div className="w-1/2">
                <div className="w-full mx-auto">
                  <div className="flex justify-center items-center">
                    <h2 className="text-lg">Deadline</h2>
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-1 justify-evenly mt-4">
                    <button
                      type="button"
                      onClick={() => handleDeadline("today")}
                      className={deadlineStyle}>
                      <div
                        className={`${
                          selectedDeadlineButton === "today" && "bg-primary-500"
                        } ${deadlineButtonStyle}`}></div>
                      <span>Today</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeadline("tomorrow")}
                      className={deadlineStyle}>
                      <div
                        className={`${
                          selectedDeadlineButton === "tomorrow" &&
                          "bg-primary-500"
                        } ${deadlineButtonStyle}`}></div>
                      <span>Tomorrow</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeadline("soon")}
                      className={deadlineStyle}>
                      <div
                        className={`${
                          selectedDeadlineButton === "soon" && "bg-primary-500"
                        } ${deadlineButtonStyle}`}></div>
                      <span>Soon</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeadline("someday")}
                      className={deadlineStyle}>
                      <div
                        className={`${
                          selectedDeadlineButton === "someday" &&
                          "bg-primary-500"
                        } ${deadlineButtonStyle}`}></div>
                      <span>Someday</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeadline("specific-day")}
                      className={deadlineStyle}>
                      <div
                        className={`${
                          selectedDeadlineButton === "specific-day" &&
                          "bg-primary-500"
                        } ${deadlineButtonStyle}`}></div>
                      <span>Specific Day</span>
                    </button>
                  </div>
                </div>
                <div
                  className={`${
                    selectedDeadlineButton === "specific-day"
                      ? "block"
                      : "hidden"
                  } w-full flex justify-center mt-3`}>
                  <DateCalender
                    handleSpecificDateChange={handleSpecificDateChange}
                  />
                </div>
                <div
                  className={
                    isDateWarningCollapse
                      ? "hidden"
                      : "text-red-500 text-sm text-center pt-2"
                  }>
                  The title field is required
                </div>
              </div>

              {/* Note */}
              <div className="w-2/3">
                <div className="">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setIsNoteOpen(!isNoteOpen)}>
                      <h2 className={toggleButtonStyle}>Note</h2>
                    </button>
                  </div>
                  {isNoteOpen && (
                    <>
                      <div className="mt-4">
                        <textarea
                          name="note"
                          id="note"
                          onInput={(e) => noteAutoGrow(e.target)}
                          onChange={(e) => setNote(e.target.value)}
                          value={note}
                          placeholder="Add Note"
                          className="px-2 py-[4px] w-full h-[32px] bg-background-700 resize-none overflow-hidden min-w-[50px]"></textarea>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* SubTask */}
              <div className="w-1/2">
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    onClick={() => setIsSubtaskOpen(!isSubtaskOpen)}>
                    <h2 className={toggleButtonStyle}>Subtask</h2>
                  </button>
                </div>
                {isSubtaskOpen && (
                  <>
                    <div className="bg-background-700 relative mt-4">
                      <div className="absolute w-[26px] h-full flex justify-center items-center">
                        <button
                          type="button"
                          onClick={handleAddSubtaskItem}
                          className="text-xl">
                          <IoMdAdd />
                        </button>
                      </div>
                      <input
                        type="text"
                        id="subtask-item"
                        name="subtask-item"
                        value={subtaskListItem}
                        onInput={(e) => setSubtaskListItem(e.target.value)}
                        placeholder="Create Subtask Item"
                        className="bg-transparent w-full py-1 pl-[26px]"
                      />
                    </div>

                    {subtaskList.length > 0 && (
                      <>
                        <div className="bg-background-700 px-1 pt-1 pb-4 rounded-b-2xl">
                          <ul>
                            {subtaskList.map((item, index) => (
                              <li
                                key={index}
                                className="flex justify-between items-center mt-1 ml-2 pl-2 mr-1 pr-2 border-b border-background-300">
                                <span>{item.title}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteSubtaskItem(index)
                                  }>
                                  <FaRegTrashAlt className="hover:text-red-500" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center items-center absolute w-full bottom-0 p-6 border-t border-gray-700">
                <button
                  type="button"
                  className="text-2xl"
                  onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTaskSlide;

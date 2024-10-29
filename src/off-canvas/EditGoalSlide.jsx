import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import DateCalender from "../components/DateCalender";

const EditGoalSlide = ({ goal, setIsSlideInOpen, handleEditGoal }) => {
  /* Dom States */
  const [isColorTagOpen, setIsColorTagOpen] = useState(false);
  const [selectedTargetCustom, setSelectedTargetCustom] = useState("custom");
  const [selectedDeadlineButton, setSelectedDeadlineButton] = useState(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isTitleWarningCollapse, setIsTitleWarningCollapse] = useState(true);
  const [isDeadlineWarningCollapse, setIsDeadlineWarningCollapse] =
    useState(true);
  const [isTargetWarningCollapse, setIsTargetWarningCollapse] = useState(true);

  /* Form States */
  const [title, setTitle] = useState(goal.title);
  const [selectedColorTag, setSelectedColorTag] = useState(goal.colorTag);
  const [selectedDeadline, setSelectedDeadline] = useState(goal.deadline);
  const [note, setNote] = useState(goal.note);
  const [targetValue, setTargetValue] = useState(goal.target.target);
  const [targetUnit, setTargetUnit] = useState(goal.target.unit);

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

  /* Target Functions */
  function handleTarget() {
    return { target: targetValue, unit: targetUnit, value: "0" };
  }

  /* Deadline Functions */
  function handleDeadline(value) {
    setSelectedDeadlineButton(value);

    switch (value) {
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

  function handleSubmit() {
    if (!title.trim()) {
      setIsTitleWarningCollapse(false);
    } else if (!targetValue.trim() || !targetUnit.trim()) {
      setIsTargetWarningCollapse(false);
    } else if (!selectedDeadline) {
      setIsDeadlineWarningCollapse(false);
    } else {
      const updatedGoal = {
        ...goal,
        title,
        colorTag: selectedColorTag,
        deadline: selectedDeadline,
        target: handleTarget(),
        note,
      };

      handleEditGoal(updatedGoal);
      setIsSlideInOpen(false);
    }
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between text-3xl py-4 px-5 border-b border-gray-700 self-center">
          <h1>New Goal</h1>
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
                    <h2 className={toggleButtonStyle}>Color Tag +</h2>
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

              {/* Target */}
              <div className="w-1/2">
                <h2 className="text-lg text-center">Target</h2>
                <div className="flex justify-center items-center gap-x-5 text-sm mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTargetCustom("100%");
                      setTargetValue("100");
                      setTargetUnit("%");
                    }}
                    className="flex items-center gap-x-2 hover:text-primary-300">
                    <div
                      className={`${
                        selectedTargetCustom === "100%"
                          ? "bg-primary-500 ring-primary-500"
                          : "ring-gray-300"
                      } w-2 h-2 rounded-full ring-2`}></div>
                    100%
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTargetCustom("custom");
                      setTargetUnit("");
                    }}
                    className="flex items-center gap-x-2 hover:text-primary-300s">
                    <div
                      className={`${
                        selectedTargetCustom === "custom"
                          ? "bg-primary-500 ring-primary-500"
                          : "ring-gray-300"
                      } w-2 h-2 rounded-full ring-2`}></div>
                    Custom
                  </button>
                </div>
                {selectedTargetCustom === "custom" && (
                  <>
                    <div className="flex items-center justify-evenly mt-2">
                      <input
                        type="number"
                        className="w-1/3 bg-background-700 py-px px-2 text-center"
                        value={targetValue}
                        onChange={(e) => setTargetValue(e.target.value)}
                      />
                      <input
                        type="text"
                        className="w-1/3 bg-background-700 py-px px-2"
                        placeholder="$, kg, km..."
                        value={targetUnit}
                        onChange={(e) => setTargetUnit(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <div
                  className={
                    isTargetWarningCollapse
                      ? "hidden"
                      : "text-red-500 text-sm text-center pt-2"
                  }>
                  The deadline field is required
                </div>
              </div>

              {/* Deadline */}
              <div className="w-1/2">
                <div className="w-full mx-auto">
                  <h2 className="text-lg text-center">Deadline</h2>

                  <div className="flex flex-wrap gap-x-5 gap-y-1 justify-evenly mt-4">
                    <button
                      type="button"
                      onClick={() => handleDeadline("this-month")}
                      className={deadlineStyle}>
                      <div
                        className={`${
                          selectedDeadlineButton === "this-month" &&
                          "bg-primary-500"
                        } ${deadlineButtonStyle}`}></div>
                      <span>This month</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeadline("next-month")}
                      className={deadlineStyle}>
                      <div
                        className={`${
                          selectedDeadlineButton === "next-month" &&
                          "bg-primary-500"
                        } ${deadlineButtonStyle}`}></div>
                      <span>Next month</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeadline("this-year")}
                      className={deadlineStyle}>
                      <div
                        className={`${
                          selectedDeadlineButton === "this-year" &&
                          "bg-primary-500"
                        } ${deadlineButtonStyle}`}></div>
                      <span>This year</span>
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
                    isDeadlineWarningCollapse
                      ? "hidden"
                      : "text-red-500 text-sm text-center pt-2"
                  }>
                  The deadline field is required
                </div>
              </div>

              {/* Note */}
              <div className="w-2/3">
                <div className="">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setIsNoteOpen(!isNoteOpen)}>
                      <h2 className={toggleButtonStyle}>Note +</h2>
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

export default EditGoalSlide;

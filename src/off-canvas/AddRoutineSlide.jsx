import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const AddRoutineSlide = ({ setIsSlideInOpen, handleAddRoutine }) => {
  /* DOM States  */
  const [isColorTagOpen, setIsColorTagOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedRepeatButton, setSelectedRepeatButton] = useState(null);
  const [selectedRepeatDays, setSelectedRepeatDays] = useState([]);
  const [isTitleWarningCollapse, setIsTitleWarningCollapse] = useState(true);
  const [isRepeatWarningCollapse, setIsRepeatWarningCollapse] = useState(true);

  /* Form States */
  const [title, setTitle] = useState("");
  const [selectedColorTag, setSelectedColorTag] = useState("bg-background-700");
  const [selectedRepeat, setSelectedRepeat] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    setSelectedRepeat(selectedRepeatDays);
  }, [selectedRepeatDays]);

  /* Styles */
  const toggleButtonStyle =
    "text-lg ease-in-out duration-300 hover:scale-110 hover:text-primary-300";
  const colorButtonStyle =
    "w-4 h-4 rounded-full ring-2 ease-in-out delay-50 duration-150 hover:scale-110";
  const repeatStyle =
    "flex items-center gap-x-2 ease-in-out delay-50 duration-150  hover:scale-110 ";
  const repeatButtonStyle = "w-4 h-4 rounded-full ring-2 ring-gray-300 ";
  const repeatDayStyle =
    "px-[3px] py-px text-sm border border-background-400 rounded-md ease-in-out delay-50 duration-150 hover:scale-110 hover:bg-primary-500";

  function generateId() {
    return Math.random().toString(18).slice(2);
  }

  /* Color Tag Functions */
  function handleColorToggle(value) {
    setSelectedColorTag(value);
  }

  /* Repeat Functions */
  function handleSelectedDays(dayIndex) {
    if (selectedRepeatDays.includes(dayIndex)) {
      setSelectedRepeatDays(
        selectedRepeatDays.filter((day) => day !== dayIndex)
      );
    } else {
      setSelectedRepeatDays([...selectedRepeatDays, dayIndex]);
    }
  }

  /* Note Functions */
  function noteAutoGrow(element) {
    element.style.height = element.scrollHeight + "px";
  }

  function handleSubmit() {
    if (!title.trim()) {
      setIsTitleWarningCollapse(false);
    } else if (!selectedRepeat) {
      setIsRepeatWarningCollapse(false);
    } else {
      const newRoutine = {
        id: generateId(),
        title,
        colorTag: selectedColorTag,
        repeat: selectedRepeat,
        note,
        isDone: false,
      };

      handleAddRoutine(newRoutine);
      setIsSlideInOpen(false);
    }
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between text-3xl py-4 px-5 border-b border-gray-700 self-center">
          <h1>New Routine</h1>
          <button onClick={() => setIsSlideInOpen(false)}>
            <IoMdClose />
          </button>
        </div>
        <form>
          <div className="flex flex-col items-center gap-y-8 mt-10">
            {/* Title */}
            <>
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
            </>

            {/* Color Tag */}
            <>
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
            </>

            {/* Repeat */}
            <>
              <div className="w-1/2 mx-auto">
                <div className="flex justify-center items-center">
                  <h2 className="text-lg">Repeat Time</h2>
                </div>

                <div className="flex gap-x-7 gap-y-1 justify-center mt-4">
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRepeatButton("daily");
                        setSelectedRepeat("daily");
                      }}
                      className={repeatStyle}>
                      <div
                        className={`${
                          selectedRepeatButton === "daily" && "bg-primary-500"
                        } ${repeatButtonStyle}`}></div>
                      <span>Daily</span>
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedRepeatButton("weekly")}
                      className={repeatStyle}>
                      <div
                        className={`${
                          selectedRepeatButton === "weekly" && "bg-primary-500"
                        } ${repeatButtonStyle}`}></div>
                      <span>Weekly</span>
                    </button>
                  </div>
                </div>

                <div
                  className={
                    selectedRepeatButton !== "weekly"
                      ? "hidden"
                      : "flex justify-evenly py-3"
                  }>
                  <button
                    type="button"
                    onClick={() => handleSelectedDays("0")}
                    className={
                      selectedRepeatDays.includes("0")
                        ? repeatDayStyle + " bg-primary-500"
                        : repeatDayStyle
                    }>
                    Su
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectedDays("1")}
                    className={
                      selectedRepeatDays.includes("1")
                        ? repeatDayStyle + " bg-primary-500"
                        : repeatDayStyle
                    }>
                    Mo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectedDays("2")}
                    className={
                      selectedRepeatDays.includes("2")
                        ? repeatDayStyle + " bg-primary-500"
                        : repeatDayStyle
                    }>
                    Tu
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectedDays("3")}
                    className={
                      selectedRepeatDays.includes("3")
                        ? repeatDayStyle + " bg-primary-500"
                        : repeatDayStyle
                    }>
                    We
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectedDays("4")}
                    className={
                      selectedRepeatDays.includes("4")
                        ? repeatDayStyle + " bg-primary-500"
                        : repeatDayStyle
                    }>
                    Th
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectedDays("5")}
                    className={
                      selectedRepeatDays.includes("5")
                        ? repeatDayStyle + " bg-primary-500"
                        : repeatDayStyle
                    }>
                    Fr
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectedDays("6")}
                    className={
                      selectedRepeatDays.includes("6")
                        ? repeatDayStyle + " bg-primary-500"
                        : repeatDayStyle
                    }>
                    St
                  </button>
                </div>
              </div>
              <div
                className={
                  isRepeatWarningCollapse
                    ? "hidden"
                    : "text-red-500 text-sm text-center pt-2"
                }>
                The title field is required
              </div>
            </>

            {/* Note */}
            <>
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
            </>

            {/* Submit Button */}
            <>
              <div className="flex justify-center items-center absolute w-full bottom-0 p-6 border-t border-gray-700">
                <button
                  type="button"
                  className="text-2xl"
                  onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRoutineSlide;

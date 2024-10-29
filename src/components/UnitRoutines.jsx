import React, { useState, useEffect } from "react";
import SlideIn from "../off-canvas/SlideIn";
import AddRoutineSlide from "../off-canvas/AddRoutineSlide";
import EditRoutineSlide from "../off-canvas/EditRoutineSlide";
import ItemRoutine from "./ItemRoutine";
import { isToday } from "date-fns";

const UnitRoutines = () => {
  const [isSlideInOpen, setIsSlideInOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const { todaysRoutines, restOfRoutines } = categorizeRepeat(routines);

  useEffect(() => {
    setRoutines(JSON.parse(localStorage.getItem("routines")) || []);

    const lastLogin = JSON.parse(localStorage.getItem("lastLogin"));
    if (!isToday(new Date(lastLogin))) {
      const routines = JSON.parse(localStorage.getItem("routines"));
      routines.map((item) => (item.isDone = false));
      localStorage.setItem("routines", JSON.stringify(routines));
      setRoutines(routines);
    }
    localStorage.setItem("lastLogin", JSON.stringify(new Date()));
  }, []);

  function categorizeRepeat(routines) {
    const todaysDay = new Date().getDay();

    const todaysRoutines = routines.filter((routine) => {
      if (routine.repeat === "daily") return true;
      if (routine.repeat.includes(String(todaysDay))) return true;
    });

    const restOfRoutines = routines.filter((routine) => {
      if (routine.repeat === "daily") return false;
      if (!routine.repeat.includes(String(todaysDay))) return true;
    });

    return { todaysRoutines, restOfRoutines };
  }

  /* Data Functions */
  function handleAddRoutine(newRoutine) {
    const routines = JSON.parse(localStorage.getItem("routines")) || [];
    routines.push(newRoutine);
    localStorage.setItem("routines", JSON.stringify(routines));
    setRoutines(routines);
  }

  function handleEditRoutine(editedRoutine) {
    const routines = JSON.parse(localStorage.getItem("routines"));
    const index = routines.findIndex(
      (routine) => routine.id === editedRoutine.id
    );
    routines[index] = editedRoutine;
    localStorage.setItem("routines", JSON.stringify(routines));
    setRoutines(routines);
  }

  function handleDeleteRoutine(id) {
    const routines = JSON.parse(localStorage.getItem("routines"));
    const updatedRoutines = routines.filter((routine) => routine.id !== id);
    localStorage.setItem("routines", JSON.stringify(updatedRoutines));
    setRoutines(updatedRoutines);
  }

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex items-center gap-x-4">
          <h1 className="text-6xl font-bold">routines</h1>
          <button
            onClick={() => {
              setSelectedSlide("add-routine");
              setIsSlideInOpen(true);
            }}
            className="text-6xl font-bold duration-30s0 hover:text-primary-300 hover:scale-125">
            +
          </button>
        </div>

        {/* Date Filter */}
        <div className="flex items-center justify-start gap-4 text-2xl text-gray-400">
          <button
            onClick={() => setDateFilter("today")}
            className={dateFilter === "today" ? "text-white" : null}>
            today
          </button>
          <button
            onClick={() => setDateFilter("all")}
            className={dateFilter === "all" ? "text-white" : null}>
            all
          </button>
        </div>

        <div>
          {/* Today */}
          {todaysRoutines.length > 0 && (
            <div className="py-2">
              <div>
                <h2 className="text-center text-2xl mb-1">Today</h2>
              </div>
              <div className="flex flex-col gap-y-3">
                {todaysRoutines.map((item, index) => (
                  <li key={index} className="list-none">
                    <ItemRoutine
                      routine={item}
                      setSelectedRoutine={setSelectedRoutine}
                      handleEditRoutine={handleEditRoutine}
                      handleDeleteRoutine={handleDeleteRoutine}
                      setSelectedSlide={setSelectedSlide}
                      setIsSlideInOpen={setIsSlideInOpen}
                    />
                  </li>
                ))}
              </div>
            </div>
          )}

          {/* Rest */}
          {dateFilter === "all" && restOfRoutines.length > 0 && (
            <>
              <div className="py-2">
                <div>
                  <h2 className="text-center text-2xl mb-1">Rest</h2>
                </div>
                <div className="flex flex-col gap-y-3">
                  {restOfRoutines.map((item, index) => (
                    <li key={index} className="list-none">
                      <ItemRoutine
                        routine={item}
                        setSelectedRoutine={setSelectedRoutine}
                        handleEditRoutine={handleEditRoutine}
                        handleDeleteRoutine={handleDeleteRoutine}
                        setSelectedSlide={setSelectedSlide}
                        setIsSlideInOpen={setIsSlideInOpen}
                      />
                    </li>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <SlideIn
        isSlideInOpen={isSlideInOpen}
        setIsSlideInOpen={setIsSlideInOpen}>
        {selectedSlide === "add-routine" && (
          <AddRoutineSlide
            setIsSlideInOpen={setIsSlideInOpen}
            handleAddRoutine={handleAddRoutine}
          />
        )}
        {selectedSlide === "edit-routine" && (
          <EditRoutineSlide
            routine={selectedRoutine}
            setIsSlideInOpen={setIsSlideInOpen}
            handleEditRoutine={handleEditRoutine}
          />
        )}
      </SlideIn>
    </>
  );
};

export default UnitRoutines;

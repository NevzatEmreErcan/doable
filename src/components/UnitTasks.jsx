import React, { useEffect, useState } from "react";
import { startOfDay, isBefore, isToday, isTomorrow, isDate } from "date-fns";
import SlideIn from "../off-canvas/SlideIn";
import AddTaskSlide from "../off-canvas/AddTaskSlide";
import EditTaskSlide from "../off-canvas/EditTaskSlide";
import ItemTask from "./ItemTask";

const UnitTasks = () => {
  const [isSlideInOpen, setIsSlideInOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const {
    deadlineOverdue,
    deadlineToday,
    deadlineTomorrow,
    deadlineNextWeek,
    deadlineSoon,
    deadlineSomeday,
  } = categorizeDeadlines(tasks);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function categorizeDeadlines(tasks) {
    const todaysDate = startOfDay(new Date());

    const deadlineOverdue = tasks.filter((task) =>
      isBefore(new Date(task.deadline), todaysDate)
    );

    const deadlineToday = tasks.filter((task) =>
      isToday(new Date(task.deadline), todaysDate)
    );

    const deadlineTomorrow = tasks.filter((task) =>
      isTomorrow(new Date(task.deadline), todaysDate)
    );

    const deadlineNextWeek = tasks.filter((task) => {
      const deadline = new Date(task.deadline);
      if (
        isDate(deadline) &&
        deadline.getDate() - todaysDate.getDate() >= 2 &&
        deadline.getDate() - todaysDate.getDate() <= 7
      ) {
        return true;
      }
    });

    const deadlineSoon = tasks.filter((task) => {
      if (task.deadline === "soon") return true;
    });

    const deadlineSomeday = tasks.filter((task) => {
      const deadline = new Date(task.deadline);

      if (task.deadline === "someday") return true;
      if (isDate(deadline) && deadline.getDate() - todaysDate.getDate() > 7) {
        return true;
      }
    });

    return {
      deadlineOverdue,
      deadlineToday,
      deadlineTomorrow,
      deadlineNextWeek,
      deadlineSoon,
      deadlineSomeday,
    };
  }

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
  }, []);

  /* Data Functions */
  function handleAddTask(newTask) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(newTask);
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTasks(tasks);
  }

  function handleEditTask(editedTask) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const index = tasks.findIndex((task) => task.id === editedTask.id);

    tasks[index] = editedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTasks(tasks);
  }

  function handleDeleteTask(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  return (
    <>
      <div>
        {/* Header */}
        <>
          <div className="flex items-center gap-x-4">
            <h1 className="text-6xl font-bold">tasks</h1>
            <button
              onClick={() => {
                setSelectedSlide("add-task");
                setIsSlideInOpen(true);
              }}
              className="text-6xl font-bold duration-30s0 hover:text-primary-300 hover:scale-125">
              +
            </button>
          </div>
        </>

        {/* Date Filter */}
        <>
          <div className="flex items-center justify-start gap-4 text-2xl text-gray-400">
            <button
              onClick={() => setDateFilter("today")}
              className={dateFilter === "today" ? "text-white" : null}>
              today
            </button>
            <button
              onClick={() => setDateFilter("next-week")}
              className={dateFilter === "next-week" ? "text-white" : null}>
              next 7 days
            </button>
            <button
              onClick={() => setDateFilter("all")}
              className={dateFilter === "all" ? "text-white" : null}>
              all
            </button>
          </div>
        </>

        <div>
          {/* Overdue */}
          <>
            {deadlineOverdue.length > 0 && (
              <>
                <div className="py-2">
                  <div>
                    <h2 className="text-red-500 text-center text-2xl mb-1">
                      Overdue
                    </h2>
                  </div>
                  <ul className="flex flex-col gap-y-2">
                    {deadlineOverdue.map((item, index) => (
                      <li key={index} className="list-none">
                        <ItemTask
                          task={item}
                          setSelectedTask={setSelectedTask}
                          setSelectedSlide={setSelectedSlide}
                          setIsSlideInOpen={setIsSlideInOpen}
                          handleEditTask={handleEditTask}
                          handleDeleteTask={handleDeleteTask}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </>

          {/* Today */}
          <>
            {deadlineToday.length > 0 && (
              <>
                <div className="py-2">
                  <div>
                    <h2 className="text-center text-2xl mb-1">Today</h2>
                  </div>
                  <ul className="flex flex-col gap-y-2">
                    {deadlineToday.map((item, index) => (
                      <li key={index} className="list-none">
                        <ItemTask
                          task={item}
                          setSelectedTask={setSelectedTask}
                          setSelectedSlide={setSelectedSlide}
                          setIsSlideInOpen={setIsSlideInOpen}
                          handleEditTask={handleEditTask}
                          handleDeleteTask={handleDeleteTask}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </>

          {/* Tomorrow */}
          <>
            {deadlineTomorrow.length > 0 && dateFilter !== "today" && (
              <>
                <div className="py-2">
                  <div>
                    <h2 className="text-center text-2xl mb-1">Tomorrow</h2>
                  </div>
                  <ul className="flex flex-col gap-y-2">
                    {deadlineTomorrow.map((item, index) => (
                      <li key={index} className="list-none">
                        <ItemTask
                          task={item}
                          setSelectedTask={setSelectedTask}
                          setSelectedSlide={setSelectedSlide}
                          setIsSlideInOpen={setIsSlideInOpen}
                          handleEditTask={handleEditTask}
                          handleDeleteTask={handleDeleteTask}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </>

          {/* Soon */}
          <>
            {(deadlineSoon.length > 0 || deadlineNextWeek > 0) &&
              dateFilter === "all" && (
                <>
                  <div className="py-2">
                    <div>
                      <h2 className="text-center text-2xl mb-1">Soon</h2>
                    </div>
                    <ul className="flex flex-col gap-y-2">
                      {deadlineNextWeek.map((item, index) => (
                        <li key={index} className="list-none">
                          <ItemTask
                            task={item}
                            setSelectedTask={setSelectedTask}
                            setSelectedSlide={setSelectedSlide}
                            setIsSlideInOpen={setIsSlideInOpen}
                            handleEditTask={handleEditTask}
                            handleDeleteTask={handleDeleteTask}
                          />
                        </li>
                      ))}
                      {deadlineSoon.map((item, index) => (
                        <li key={index} className="list-none">
                          <ItemTask
                            task={item}
                            setSelectedTask={setSelectedTask}
                            setSelectedSlide={setSelectedSlide}
                            setIsSlideInOpen={setIsSlideInOpen}
                            handleEditTask={handleEditTask}
                            handleDeleteTask={handleDeleteTask}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
          </>

          {/* Someday */}
          <>
            {deadlineSomeday.length > 0 && dateFilter === "all" && (
              <>
                <div className="py-2">
                  <div>
                    <h2 className="text-center text-2xl mb-1">Someday</h2>
                  </div>
                  <ul className="flex flex-col gap-y-2">
                    {deadlineSomeday.map((item, index) => (
                      <li key={index} className="list-none">
                        <ItemTask
                          task={item}
                          setSelectedTask={setSelectedTask}
                          setSelectedSlide={setSelectedSlide}
                          setIsSlideInOpen={setIsSlideInOpen}
                          handleEditTask={handleEditTask}
                          handleDeleteTask={handleDeleteTask}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </>

          {/* Next Week */}
          <>
            {deadlineNextWeek.length > 0 && dateFilter === "next-week" && (
              <>
                <div className="py-2">
                  <ul className="flex flex-col gap-y-2">
                    {deadlineNextWeek.map((item, index) => (
                      <li key={index} className="list-none">
                        <div>
                          <h2 className="text-center text-2xl mb-1">
                            {daysOfWeek[new Date(item.deadline).getDay()]}
                          </h2>
                        </div>
                        <ItemTask
                          task={item}
                          setSelectedSlide={setSelectedSlide}
                          handleEditTask={handleEditTask}
                          setIsSlideInOpen={setIsSlideInOpen}
                          hand
                          setSelectedTask={setSelectedTask}
                          leDeleteTask={handleDeleteTask}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </>
        </div>
      </div>

      <SlideIn
        isSlideInOpen={isSlideInOpen}
        setIsSlideInOpen={setIsSlideInOpen}>
        {selectedSlide === "add-task" && (
          <AddTaskSlide
            setIsSlideInOpen={setIsSlideInOpen}
            handleAddTask={handleAddTask}
          />
        )}
        {selectedSlide === "edit-task" && (
          <EditTaskSlide
            task={selectedTask}
            setIsSlideInOpen={setIsSlideInOpen}
            handleEditTask={handleEditTask}
          />
        )}
      </SlideIn>
    </>
  );
};

export default UnitTasks;

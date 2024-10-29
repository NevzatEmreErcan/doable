import React, { useState, useEffect } from "react";
import SlideIn from "../off-canvas/SlideIn";
import AddGoalSlide from "../off-canvas/AddGoalSlide";
import EditGoalSlide from "../off-canvas/EditGoalSlide";
import ItemGoal from "./ItemGoal";

const UnitGoals = () => {
  const [isSlideInOpen, setIsSlideInOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    setGoals(JSON.parse(localStorage.getItem("goals")) || []);
  }, []);

  /* Data Functions */
  function handleAddGoal(newGoal) {
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.push(newGoal);
    goals.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    localStorage.setItem("goals", JSON.stringify(goals));
    setGoals(goals);
  }

  function handleEditGoal(editedGoal) {
    const goals = JSON.parse(localStorage.getItem("goals"));
    const index = goals.findIndex((goal) => goal.id === editedGoal.id);

    goals[index] = editedGoal;
    localStorage.setItem("goals", JSON.stringify(goals));
    setGoals(goals);
  }

  function handleDeleteGoal(id) {
    const goals = JSON.parse(localStorage.getItem("goals"));
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  }
  return (
    <>
      <div>
        {/* Header */}
        <>
          <div className="flex items-center gap-x-4 mb-[72px]">
            <h1 className="text-6xl font-bold">goals</h1>
            <button
              onClick={() => {
                setSelectedSlide("add-goal");
                setIsSlideInOpen(true);
              }}
              className="text-6xl font-bold duration-30s0 hover:text-primary-300 hover:scale-125">
              +
            </button>
          </div>
        </>

        <div>
          <ul className="flex flex-col gap-y-3">
            {goals.map((item, index) => (
              <li key={index}>
                <ItemGoal
                  goal={item}
                  setSelectedGoal={setSelectedGoal}
                  handleEditGoal={handleEditGoal}
                  handleDeleteGoal={handleDeleteGoal}
                  setSelectedSlide={setSelectedSlide}
                  setIsSlideInOpen={setIsSlideInOpen}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <SlideIn
        isSlideInOpen={isSlideInOpen}
        setIsSlideInOpen={setIsSlideInOpen}>
        {selectedSlide === "add-goal" && (
          <AddGoalSlide
            setIsSlideInOpen={setIsSlideInOpen}
            handleAddGoal={handleAddGoal}
          />
        )}
        {selectedSlide === "edit-goal" && (
          <EditGoalSlide
            goal={selectedGoal}
            setIsSlideInOpen={setIsSlideInOpen}
            handleEditGoal={handleEditGoal}
          />
        )}
      </SlideIn>
    </>
  );
};

export default UnitGoals;

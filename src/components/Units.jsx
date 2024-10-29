import UnitTasks from "./UnitTasks";
import UnitRoutines from "./UnitRoutines";
import UnitGoals from "./UnitGoals";

const Units = () => {
  return (
    <>
      <section className="grid grid-cols-2 gap-y-4 gap-x-8 py-10 px-8 lg:grid-cols-3">
        <UnitTasks />
        <UnitRoutines />
        <UnitGoals />
      </section>
    </>
  );
};

export default Units;

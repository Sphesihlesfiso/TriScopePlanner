import { NavBar } from "./layouts/Navbar";
import { TaskHolder } from "@/components/TaskHolder";
export const Home = () => {
  return (
    <div>
      <NavBar />

      <div className="p-6">
        <div className="grid  grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <TaskHolder scope="Daily" due="Due Today" />
          <TaskHolder scope="Weekly" due="Due this week" />
          <TaskHolder scope="Monthly" due="Due later this month" />
        </div>
      </div>
    </div>
  );
};

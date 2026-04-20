import { NavBar } from "@/pages/layouts/Navbar";
import { TaskHolder } from '@/components/TaskHolder';
import axios from "axios";
// import {getTasks} from "@/api/endpoints"
// const fetchData = async () => {
//   const userTasks = await getTasks.getAllTasks(1);
//   console.log(userTasks);
// };

// fetchData();
export const Home = () => {
//  const result = axios.get(`http://localhost:3000/1`);
//  console.log(result)
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

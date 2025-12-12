import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TaskCard } from "./taskcard";
import { useEffect,useState } from "react";
type TaskHolderProps = {
  scope: string;
  due: string;
  
};

export const TaskHolder = ({ scope, due}: TaskHolderProps) => {
  interface Task {
    task_id: number;
    title: string;
    description: string;
    start_time: string;
    tittle: string;
    scope: string;
  }
  async function fetchData(): Promise<Task[]> {
    const responce = await fetch("http://localhost:3000");
    return await responce.json();
  }

  const [userTasks, setUserTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchData(); // ✅ await inside async function
      setUserTasks(data);
    };
    loadTasks();
  });
  return (
    <Card className="w-full  border rounded-2xl">
      <CardHeader className="border-b">
        <CardTitle>{scope}</CardTitle>
        <CardDescription>{due}</CardDescription>
      </CardHeader>
      <CardContent>
        {userTasks.filter((task)=> task.scope==scope).map((task) => (
          <TaskCard
            key={task.task_id}
            title={task.tittle}
            task={task.description}
            time={task.start_time}
          />
        ))}
      </CardContent>
    </Card>
  );
};

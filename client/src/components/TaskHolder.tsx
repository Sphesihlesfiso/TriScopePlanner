import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TaskCard } from "./taskcard";
import { useEffect,useState } from "react";
interface TaskHolderProps  {
  scope: string;
  due: string;
  
};
export  interface Task {
   task_id: number;
   title: string;
   description: string;
   start_time: string;
   tittle: string;
   scope: string;
   end_time: string;
 }

export const TaskHolder = ({ scope, due}: TaskHolderProps) => {
 
  const  fetchData= async(): Promise<Task[]> => {
    const responce = await fetch("http://localhost:3000");
    return await responce.json();
  }

  const [userTasks, setUserTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchData();
      setUserTasks(data);
    };
    loadTasks();
  });
  return (
    <Card className="w-full h-screen  border rounded-2xl">
      <CardHeader className="border-b">
        <CardTitle>{scope}</CardTitle>
        <CardDescription>{due}</CardDescription>
      </CardHeader>
      <CardContent>
        {userTasks.filter((task)=> task.scope==scope).map((task) => (
          <TaskCard
            key={task.task_id}
            id= {task.task_id}
            title={task.tittle}
            task={task.description}
            start_time={task.start_time}
            end_time={task.end_time}
          />
          
        ))}
         {/* <TaskCard
            key="1"
            id={2}
            title="Hi"
            task="there"
            start_time="2:00"
            end_time="3:00"
          /> */}
          
        
      </CardContent>

    </Card>
  );
};

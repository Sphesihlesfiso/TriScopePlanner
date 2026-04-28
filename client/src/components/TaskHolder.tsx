import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TaskCard } from "./taskcard";

import type { TaskHolderProps} from "@/types";
import { getTasks } from "@/api/endpoints"
import { useEffect,useState } from "react";
import type { Task } from '../types/index';

export const TaskHolder = ({ scope, due }: TaskHolderProps) => {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  useEffect ( () => {
    const fetchAllTasks = async()=>{
    await getTasks.getAll().then((response)=>{
      setUserTasks(response)
      console.log(response)
    });
    }
    
    fetchAllTasks();
  },[])
  
  
  return (
    <Card className="w-full h-screen  border rounded-2xl">
      <CardHeader className="border-b">
        <CardTitle>{scope}</CardTitle>
        <CardDescription>{due}</CardDescription>
      </CardHeader>
      <CardContent>
        {userTasks
          .filter((task) => task.scope == scope)
          .map((task) => (
            <TaskCard
              key={task.taskId}
              taskId={task.taskId}
              title={task.title}
              
              startTime={task.startTime}
              endTime={task.endTime}
              description={task.description}
              scope={task.scope}
            />
          ))}
      </CardContent>
    </Card>
  );
};

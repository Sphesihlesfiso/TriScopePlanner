import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TaskCard } from "./taskcard";
import { useEffect, useState } from "react";
import type { TaskHolderProps,Task } from "@/types";

export const TaskHolder = ({ scope, due }: TaskHolderProps) => {
  const fetchData = async (): Promise<Task[]> => {
    const responce = await fetch("http://localhost:3000");
    console.log(responce);
    return await responce.json();
  };

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
        {userTasks
          .filter((task) => task.scope == scope)
          .map((task) => (
            <TaskCard
              key={task.taskId}
              id={task.taskId}
              title={task.title}
              task={task.description}
              startTime={task.startTime}
              endTime={task.endTime}
            />
          ))}
      </CardContent>
    </Card>
  );
};

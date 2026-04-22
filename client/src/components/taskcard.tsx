import { Trash, Edit, Calendar, Clock } from "lucide-react";
import { Button } from "./ui/button";

import { TaskInputForm } from "./TaskInputForm";



import type { TaskCardProps } from "@/types";



import { deleteTaskById } from "@/api/endpoints";

export const TaskCard = ({
  title,
  task,
  startTime,
  endTime,
  taskId,
}: TaskCardProps) => {
  
  return (
    <div className="grid grid-rows-2 gap-3 border p-3 rounded-2xl mb-1.5">
      <ul className="flex justify-between gap-1.5">
        <li>{title}</li>
        <li>
          <ul className="flex gap-1 align-middle justify-center">
            <li>
              <Clock />
            </li>
            <li>
              <p>{startTime}</p>
            </li>
            -
            <li>
              <p>{endTime}</p>
            </li>
          </ul>
        </li>
        <div className="flex align-middle gap-1">
          <Button>
            <Calendar />
          </Button>

          <TaskInputForm
            triggerButton={
              <Button >
                <Edit />
              </Button>
            }
            formType="Edit Task"
            
          />
      
          <Button
            onClick={async () => {
              await deleteTaskById.delete(taskId);
            }}
          >
            <Trash />
          </Button>
        </div>
      </ul>

      <div>{task}</div>
    </div>
  );
};

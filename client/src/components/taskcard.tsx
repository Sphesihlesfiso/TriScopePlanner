import { Trash, Edit, Calendar, Clock } from "lucide-react";
import { Button } from "./ui/button";

import { TaskInputForm } from "./TaskInputForm";

import { EditTask } from "./TaskInputForm";
import toast from "react-hot-toast";
import type { TaskCardProps } from "@/types";

export const TaskCard = ({
  title,
  task,
  startTime,
  endTime,
  id,
}: TaskCardProps) => {
  const DeleteTask = async () => {
    const response = await fetch(`http://localhost:3000/task/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      toast.success("Deleted task.");
    } else {
      toast.error("Failed to delete task.");
    }
  };
  const addToGoogleCalender = async () => {
    const response = await fetch(
      `http://localhost:3000/googlecalender/task/:${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    );

    response.json();
  };

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
          <Button onClick={addToGoogleCalender}>
            <Calendar />
          </Button>

          <TaskInputForm
            triggerButton={
              <Button onClick={EditTask}>
                <Edit />
              </Button>
            }
            formType="Edit Task"
            httpMethod="PATCH"
            endPoint={`task/:${id}`}
          />

          <Button onClick={DeleteTask}>
            <Trash />
          </Button>
        </div>
      </ul>

      <div>{task}</div>
    </div>
  );
};

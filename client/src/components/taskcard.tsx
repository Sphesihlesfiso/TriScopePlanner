import { Trash, Edit, CalendarClock, Clock } from "lucide-react";
import { Button } from "./ui/button";

import { TaskInputForm } from "./TaskInputForm";

import type { TaskCardProps } from "@/types";

import { deleteTaskById } from "@/api/endpoints";

export const TaskCard = ({
  title,
  startTime,
  endTime,
  taskId,
  description,
  scope,
  onRefresh
}: TaskCardProps) => {
  return (
    <div className="grid grid-rows-2 gap-3 border p-3 rounded-2xl mb-1.5">
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
        <span className="truncate">{title}</span>

        <ul className="flex gap-1 items-center">
          <li>
            {scope === "Daily" ? (
              <Clock size={16} />
            ) : (
              <CalendarClock size={16} />
            )}
          </li>
          <li>
            <p>{startTime}</p>
          </li>
          <li>-</li>
          <li>
            <p>{endTime}</p>
          </li>
        </ul>

        <div className="flex items-center gap-1">
          <TaskInputForm
            triggerButton={
              <Button>
                <Edit />
              </Button>
            }
            formType="Edit Task"
            taskId={taskId}
            description={description}
            title={title}
            startTime={startTime}
            scope={scope}
            endTime={endTime}
            onSuccess={onRefresh}
          />
          <Button
            onClick={async () => {
              await deleteTaskById.delete(taskId);
              onRefresh();
            }}
          >
            <Trash />
          </Button>
        </div>
      </div>
      <div>{description}</div>
    </div>
  );
};

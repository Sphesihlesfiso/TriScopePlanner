import { Trash2, Pencil, CalendarClock, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { TaskInputForm } from "./TaskInputForm";
import type { TaskCardProps } from "@/types";
import { deleteTaskById } from "@/api/endpoints";
import { useState } from "react";

export const TaskCard = ({
  title,
  startTime,
  endTime,
  taskId,
  description,
  scope,
  onRefresh,
}: TaskCardProps) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await deleteTaskById.delete(taskId);
    onRefresh();
  };

  const scopeColors: Record<string, string> = {
    Daily: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    Weekly: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    Monthly: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  };

  return (
    <div
      className={`group relative flex flex-col gap-2 border bg-card rounded-2xl p-4 mb-2 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
        deleting ? "opacity-40 pointer-events-none" : ""
      }`}
    >
      {/* Top row: title + actions */}
      <div className="grid grid-cols-[1fr_auto] items-start gap-2">
        <span className="font-medium text-sm leading-snug truncate pr-1">
          {title}
        </span>

        {/* Actions — visible on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <TaskInputForm
            triggerButton={
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
              >
                <Pencil size={14} />
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
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
      )}

      {/* Bottom row: scope badge + time */}
      <div className="flex items-center justify-between mt-1">
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
            scopeColors[scope] ?? "bg-muted text-muted-foreground"
          }`}
        >
          {scope === "Daily" ? (
            <Clock size={11} />
          ) : (
            <CalendarClock size={11} />
          )}
          {scope}
        </span>

        <span className="text-xs text-muted-foreground tabular-nums">
          {startTime} — {endTime}
        </span>
      </div>
    </div>
  );
};

import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TaskCard } from "./taskcard";

import type { TaskHolderProps } from "@/types";
import { getTasks } from "@/api/endpoints";
import { useEffect, useState } from "react";
import type { Task } from "../types/index";

const scopeAccents: Record<string, { border: string; dot: string }> = {
  Daily: { border: "border-t-blue-500", dot: "bg-blue-500" },
  Weekly: { border: "border-t-violet-500", dot: "bg-violet-500" },
  Monthly: { border: "border-t-amber-500", dot: "bg-amber-500" },
};

export const TaskHolder = ({
  scope,
  due,
  refreshKey,
  onRefresh,
}: TaskHolderProps) => {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTasks = async () => {
      setLoading(true);
      await getTasks.getAll().then((response) => {
        setUserTasks(response);
      });
      setLoading(false);
    };

    fetchAllTasks();
  }, [refreshKey]);

  const filtered = userTasks.filter((task) => task.scope === scope);
  const accent = scopeAccents[scope] ?? {
    border: "border-t-muted",
    dot: "bg-muted",
  };

  return (
    <Card
      className={`flex flex-col w-full h-screen border-t-4  rounded-2xl shadow-sm`}
    >
      <CardHeader className="border-b pb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${accent.dot}`} />
          <CardTitle className="text-base font-semibold">{scope}</CardTitle>
          {/* Task count badge */}
          {!loading && (
            <span className="ml-auto text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {filtered.length} {filtered.length === 1 ? "task" : "tasks"}
            </span>
          )}
        </div>
        <CardDescription className="text-xs mt-1 ml-4">{due}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto pt-4 px-3">
        {loading ? (
          // Skeleton loaders
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 rounded-2xl bg-muted animate-pulse"
                style={{ opacity: 1 - i * 0.2 }}
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center h-40 gap-2 text-muted-foreground">
            <span className="text-3xl">🗒️</span>
            <p className="text-sm">No {scope.toLowerCase()} tasks yet</p>
          </div>
        ) : (
          filtered.map((task) => (
            <TaskCard
              key={task.taskId}
              taskId={task.taskId}
              title={task.title}
              startTime={task.startTime}
              endTime={task.endTime}
              description={task.description}
              scope={task.scope}
              onRefresh={onRefresh}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

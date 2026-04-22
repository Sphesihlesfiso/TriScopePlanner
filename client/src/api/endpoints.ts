import { crudeOperations } from "./crude";
import type { Task } from "@/types";
export const getTasks = crudeOperations<Task>("user");
export const postTask = crudeOperations<Task>("post");
export const deleteTaskById = crudeOperations<Task>("delete/task");
export const getTaskById = crudeOperations<Task>("user/task");
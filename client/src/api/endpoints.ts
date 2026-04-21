import { crudeOperations } from "./crude";

export const getTasks = crudeOperations("user");
export const deleteTaskById = crudeOperations("delete/task");
export const getTaskById = crudeOperations("user/task");
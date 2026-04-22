import { crudeOperations, userCrude } from "./crude";
import type { User, Task } from "@/types";
export const getTasks = crudeOperations<Task[]>("user");
export const postTask = crudeOperations<Task>("post");
export const editTask = crudeOperations<Task>("patch/task");
export const deleteTaskById = crudeOperations<Task>("delete/task");
export const getTaskById = crudeOperations<Task>("user/task");
export const loginUser=userCrude<User>("auth/sign-in")
export const signUp = userCrude<User>("/auth/register");
export const logOut=userCrude<User>("/auth/sign-out")

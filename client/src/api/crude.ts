import { serverApi } from "@/lib/axios";
import type { ServerRes } from "../types/api";

export function crudeOperations<T>(resourcesUrl?:string,payload?:T) {
  return {
    getAllTasks: async (userId: string | number): Promise<T> => {
      const results = await serverApi.get<ServerRes<T>>(
        `/${resourcesUrl}/${userId}`,
      );
      if (!results.data.success) throw new Error(results.data.message);
      return results.data.payload;
    },
    deleteTask: async (taskId: string | number) =>
      await serverApi.delete(`/${resourcesUrl}/${taskId}`),
    patchTask: async (taskId: number | string) => {
      await serverApi.patch(`/${resourcesUrl}/${taskId}`, payload);
    },
    createTask: async (userId: string | number,payload:T) => {
      const results=await serverApi.post(`/${resourcesUrl}/${userId}`,payload);
      return results
    },
    getTask: async (taskId: string | number): Promise<T> => {
      const results = await serverApi.get<ServerRes<T>>(
        `/${resourcesUrl}/${taskId}`,
      );
      return results.data.payload;
    },
  };
}

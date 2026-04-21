import { serverApi } from "@/lib/axios";

export function crudeOperations(resourcesUrl?: string) {
  return {
    getAllTasks: async (userId: string | number) =>{
      const results =await serverApi.get(`/${resourcesUrl}/${userId}`)
        return results.data.tasks;
      },
    deleteTask: async (taskId: string | number) =>
      await serverApi.delete(`/${resourcesUrl}/${taskId}`),
    patchTask: async (taskId: number | string) => {
      await serverApi.patch(`/${resourcesUrl}/${taskId}`);
    },
    getTask: async (taskId: string | number) => {
      const results = await serverApi.get(`/${resourcesUrl}/${taskId}`);
      return results.data.task;
    },
  };
}

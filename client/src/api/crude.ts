import { serverApi } from "@/lib/axios";

export function crudeOperations ( ) {
    return {
      getAllTasks: async (userId: string | number) =>
        await serverApi.get(`/${userId}`).then((responce) => {
          return responce.data.tasks;
        }),
      deleteTask: (taskId: string | number) =>
        
        serverApi.delete(`/delete/task/${taskId}`)
            
        
    };
    
}
import { serverApi } from "@/lib/axios";

export function crudeOperations <T>  ( ) {
    return {
        getAllTasks: async (userId:string| number) =>
            await serverApi.get<T[]>(`/${userId}`),
    }
    
}
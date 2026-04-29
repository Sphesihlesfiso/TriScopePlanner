
import { serverApi } from "@/lib/axios";
import type { ServerRes, } from "../types/api";


export function crudeOperations<T>(resourcesUrl?: string) {
  return {
    getAll: async (): Promise<T> => {
      const results = await serverApi.get<ServerRes<T>>(
        `/${resourcesUrl}`,
      );
      if (!results.data.success) throw new Error(results.data.message);
      return results.data.payload;
    },
    delete: async (taskId: string | number) =>
      await serverApi.delete(`/${resourcesUrl}/${taskId}`),
    patchTask: async (taskId: number | string, payload: T) => {
      return await serverApi.patch(`/${resourcesUrl}/${taskId}`, payload);
    },
    create: async ( payload?: T) => {
      const results = await serverApi.post(
        `/${resourcesUrl}`,
        payload,
      );
      return results;
    },
    getById: async (taskId: string | number): Promise<T> => {
      const results = await serverApi.get<ServerRes<T>>(
        `/${resourcesUrl}/${taskId}`,
      );
      return results.data.payload;
    },

  };
}
export function userCrude<T>(resourcesUrl?:string) {
  return {
    postUser: async (payload?:T) => {
      const results = await serverApi.post(
        `/${resourcesUrl}`,
        payload,
      );
      return results;
    },
    logout :async()=>{
      return await serverApi.post( `/${resourcesUrl}`)
    },
    postToken :async(payload:object,verifyToken:string)=>{
       const results = await serverApi.post(`/${resourcesUrl}/${verifyToken}`, payload);
       return results;
    }
  };
}

import {useApiGet} from "@/components/api/ApiGet.ts";
import {UserData} from "@/components/contextApi/AuthContext.tsx";

export type ApiListResponse<T> = {
    statusCode: number;
    message: string;
    data: T[];
};

export type ApiPaginatedResponse<T> = {
    statusCode: number;
    message: string;
    data: {
        data: T[];
        pagination?: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        };
        total?: number;
        page?: number;
        limit?: number;
    };
};

export type ApiSingleResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
};

export const useGetInit = () => {
    return useApiGet<ApiListResponse<UserData>>("/api/init", {
        retry: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

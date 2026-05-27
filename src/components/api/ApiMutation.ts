import {
    useMutation,
    useQueryClient,
    UseMutationOptions,
    UseMutationResult,
    QueryKey,
} from "@tanstack/react-query";

import type {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import { apiService } from "@/utility/api.ts";
import { toast } from "@/lib/toast.ts";

// ─── Types ────────────────────────────────────────────────────────────────────

type Method = "post" | "put" | "patch" | "delete";

export interface ApiSuccessResponse<T = any> {
    statusCode?: number;
    message?: string;
    data?: T;
}

export interface UseApiMutationOptions<
    TResponse = any,
    TVariables = any,
    TContext = unknown
> extends Omit<
    UseMutationOptions<
        AxiosResponse<ApiSuccessResponse<TResponse>>,
        AxiosError<ApiSuccessResponse>,
        TVariables,
        TContext
    >,
    "mutationFn"
> {
    /** Static axios config merged into every request */
    axiosConfig?: AxiosRequestConfig;

    /**
     * Derive endpoint dynamically from mutation variables.
     * When provided, takes precedence over the static `endpoint` argument.
     * Example: (vars) => `/api/user/${vars.id}`
     */
    endpointFn?: (variables: TVariables) => string;

    /** Show a sonner success toast on mutation success (default: true) */
    showSuccessToast?: boolean;
    /** Show a sonner error toast on mutation failure (default: true) */
    showErrorToast?: boolean;

    /** Override the success message shown in the toast */
    successMessage?: string;
    /** Override the error message shown in the toast */
    errorMessage?: string;

    /**
     * Query keys to invalidate after a successful mutation.
     * Triggers a re-fetch of matching queries automatically.
     */
    invalidateQueryKeys?: QueryKey[];
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApiMutation<
    TResponse = any,
    TVariables = any,
    TContext = unknown
>(
    method: Method,
    endpoint: string,
    options?: UseApiMutationOptions<TResponse, TVariables, TContext>
): UseMutationResult<
    AxiosResponse<ApiSuccessResponse<TResponse>>,
    AxiosError<ApiSuccessResponse>,
    TVariables,
    TContext
> {
    const queryClient = useQueryClient();

    const {
        axiosConfig,
        endpointFn,
        showSuccessToast = true,
        showErrorToast = true,
        successMessage,
        errorMessage,
        invalidateQueryKeys,
        onSuccess,
        onError,
        ...mutationOptions
    } = options ?? {};

    return useMutation<
        AxiosResponse<ApiSuccessResponse<TResponse>>,
        AxiosError<ApiSuccessResponse>,
        TVariables,
        TContext
    >({
        mutationFn: async (variables: TVariables) => {
            // Resolve endpoint — dynamic takes priority over static
            const resolvedEndpoint = endpointFn
                ? endpointFn(variables)
                : endpoint;

            return apiService<ApiSuccessResponse<TResponse>>({
                url: resolvedEndpoint,
                method,
                data: variables,
                ...axiosConfig,
            });
        },

        onSuccess: async (response, variables, context, mutationCtx) => {
            // Invalidate any registered query keys
            if (invalidateQueryKeys?.length) {
                await Promise.all(
                    invalidateQueryKeys.map((key) =>
                        queryClient.invalidateQueries({ queryKey: key as QueryKey })
                    )
                );
            }

            if (showSuccessToast) {
                toast.success(
                    successMessage ??
                    response.data?.message ??
                    "Operation successful"
                );
            }

            onSuccess?.(response, variables, context, mutationCtx);
        },

        onError: (error, variables, context, mutationCtx) => {
            const message =
                error.response?.data?.message ??
                error.message ??
                "Something went wrong";

            if (showErrorToast) {
                toast.error(errorMessage ?? message);
            }

            onError?.(error, variables, context, mutationCtx);
        },

        ...mutationOptions,
    });
}
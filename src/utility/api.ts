import axios, {
    AxiosError,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from "axios";
import {
    getRefreshToken,
    getToken,
    removeRefreshToken,
    removeToken,
    setRefreshToken,
    setToken
} from "@/utility/authService.ts";
import {startGlobalLoading, stopGlobalLoading} from "@/utility/loadingBus.ts";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiService = axios.create({
    baseURL: BASE_URL,
});

let requestCount = 0;

const startLoading = () => {
    requestCount++;
    startGlobalLoading();
};

const stopLoading = () => {
    requestCount--;

    if (requestCount <= 0) {
        requestCount = 0;
        stopGlobalLoading();
    }
};

// REQUEST INTERCEPTOR
apiService.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        startLoading();

        const token = getToken();

        if (token && !config.url?.includes("/auth/refresh")) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => {
        stopLoading();
        return Promise.reject(error);
    }
);

// RESPONSE INTERCEPTOR
apiService.interceptors.response.use(
    (response) => {
        stopLoading();
        return response;
    },
    async (error: AxiosError<any>) => {
        stopLoading();

        const originalRequest: any = error.config;

        // TOKEN REFRESH
        if (
            error.response?.status === 403 &&
            !originalRequest?._retry &&
            !originalRequest?.url?.includes("/auth/refresh")
        ) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(
                    `${BASE_URL}/api/auth/refresh`,
                    {
                        refreshToken: getRefreshToken(),
                    }
                );

                const { accessToken, refreshToken } = res.data.data;

                setToken(accessToken);
                setRefreshToken(refreshToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return apiService(originalRequest);
            } catch (refreshError) {
                removeToken();
                removeRefreshToken();

                window.location.href = "/";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// GENERIC REQUEST FUNCTION
export const apiRequest = async <T = any>(
    config: AxiosRequestConfig
) => {
    return apiService.request<T>(config);
};

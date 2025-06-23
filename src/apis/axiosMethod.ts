import axios, {
    AxiosRequestConfig,
    Method,
    // AxiosError,
    // AxiosResponse,
} from 'axios';

const callAxios = async <R = any, D = any>(
    method: Method,
    endpoint: string,
    data: D | null = null,
    additionalHeaders: Record<string, string> = {},
    config: Omit<AxiosRequestConfig<D>, 'method' | 'url' | 'data' | 'headers' | 'signal'> = {},
    signal: AbortSignal | null = null,
): Promise<R | undefined> => {
    const token = localStorage.getItem('authToken');
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (!baseUrl) {
        const errorMessage = 'VITE_API_BASE_URL is not defined. Please check your environment configuration.';
        console.error(`Error in callAxios: ${errorMessage}`);
        throw new Error(errorMessage);
    }

    // ✅ Headers as plain object
    const headers: Record<string, string> = {
        'x-app-name': 'furnitureByPanchal',
        'source-type': 'OPS',
        'App-Version': '1',
        'Content-Type': 'application/json',
        ...additionalHeaders,
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await axios<R, D>({
            method,
            url: `${baseUrl}${endpoint}`,           // ✅ Will always be a valid string
            data: data ?? undefined,                // ✅ data can be undefined
            headers,
            signal: signal ?? undefined,
            ...config,
        });
        return response?.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
            return undefined;
        } else if (axios.isAxiosError(error)) {
            throw error;
        } else {
            throw error;
        }
    }
};

export default callAxios;


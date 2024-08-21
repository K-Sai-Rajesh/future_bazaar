import axios from 'axios';
import { CookiesNames, clearSession, getCookieItem } from './cookies';
import { refreshToken } from '../reducers/slices/login';

let isAlreadyFetchingAccessToken = false;

let subscribers = [];

function onAccessTokenFetched(accessToken) {
    subscribers = subscribers?.filter((callback) => callback(accessToken));
}

function addSubscriber(callback) {
    subscribers.push(callback);
}

const client = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
})

const ROUTE_WITHOUT_TOKEN = ["login"];

client.interceptors.request.use(
    (request) => {
        // eslint-disable-next-line
        const authRoutes = ROUTE_WITHOUT_TOKEN?.some(i => (request?.url?.includes(i)));
        const accessToken = getCookieItem(CookiesNames.ACCESS_TOKEN);
        if (!authRoutes && request.headers && accessToken) {
            request.headers["Content-Type"] = request["Content-Type"]
            request.headers["Authorization"] = accessToken
        }
        return request;
    },
    (error) => {
        return Promise.reject(error)
    }
);

client.interceptors.response.use(
    (response) => {
        if (response.data.error) {
            return Promise.reject(response.data);
        }

        return Promise.resolve(response.data);
    },
    async (error) => {
        if (error?.config?.url?.includes("refreshToken")) {
            clearSession(true);

            return Promise.reject(error.response?.data);
        }

        if (error.response?.status === 401) {
            const originalRequest = error.config;

            const retryOriginalRequest = new Promise((resolve) => {
                addSubscriber((accessToken) => {
                    if (originalRequest?.headers && accessToken) {
                        originalRequest.headers.Authorization = accessToken;
                    }
                    if (originalRequest) {
                        resolve(client(originalRequest));
                    }
                });
            });
            try {
                const rToken = getCookieItem(CookiesNames.REFRESH_TOKEN);
                if (!isAlreadyFetchingAccessToken && rToken) {
                    isAlreadyFetchingAccessToken = true;
                    const data = await refreshToken(rToken);
                    isAlreadyFetchingAccessToken = false;
                    onAccessTokenFetched(data.accessToken);
                }

                return await retryOriginalRequest;
            } catch (err) {
                clearSession(true);
                return retryOriginalRequest;
            }
        }

        return Promise.reject(error.response?.data);
    }
);

export default client;
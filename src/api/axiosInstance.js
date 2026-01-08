import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { normalizeApiError } from "../utils/errorNormalizer";
import { errorToast } from "../../src/utils/tost";

const api = axios.create({
    baseURL: "http://localhost:2519/api",
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const normalizedError = normalizeApiError(error);

        if (normalizedError.status === 401) {
            store.dispatch(logout());
            errorToast("Session expired. Please login again.");
            return Promise.reject(normalizedError);
        }

        errorToast(normalizedError);

        return Promise.reject(normalizedError);
    }
);

export default api;

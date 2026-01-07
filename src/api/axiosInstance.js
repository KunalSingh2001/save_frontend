import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { normalizeApiError } from "../utils/errorNormalizer";
import { errorToast } from "../../src/utils/tost";

const api = axios.create({
    baseURL: "http://localhost:2519/api",
});

// 🔐 Attach token
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

// 🚨 Global error handler
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const normalizedError = normalizeApiError(error);

        // 🔥 Token expired / Unauthorized
        if (normalizedError.status === 401) {
            store.dispatch(logout());
            errorToast("Session expired. Please login again.");
            return Promise.reject(normalizedError);
        }

        // 🔥 Show error toast
        errorToast(normalizedError);

        return Promise.reject(normalizedError);
    }
);

export default api;

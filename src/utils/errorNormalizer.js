export function normalizeApiError(error) {
    const status = error.response?.status;
    const data = error.response?.data;

    let message = "Something went wrong";

    if (data?.errors) {
        const key = Object.keys(data.errors)[0];
        message = data.errors[key]?.message || data.message;
    } else if (data?.message) {
        message = data.message;
    } else if (error.message) {
        message = error.message;
    }

    return {
        status,
        message,
        raw: error,
    };
}

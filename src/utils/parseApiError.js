export const parseApiError = (error) => {
    const data = error.response?.data;

    if (data?.errors) {
        const errors = data.errors;
        const firstKey = Object.keys(errors)[0];

        if (typeof errors[firstKey] === "string") {
            return errors[firstKey];
        }

        if (Array.isArray(errors[firstKey])) {
            return errors[firstKey][0];
        }
    }

    if (data?.message && data.message !== "Validation failed") {
        return data.message;
    }

    if (error.message) {
        return error.message;
    }

    return "Something went wrong";
};

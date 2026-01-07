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
        console.log("enter 1");
        return data.message;
    }

    if (error.message) {
        console.log("enter 2");
        return error.message;
    }

    return "Something went wrong";
};

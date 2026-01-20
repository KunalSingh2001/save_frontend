export const BLOG_ROUTES = {
    LIST: "blog/listing",
    DELETE: (id) => `/blog/delete/${id}`,
    CREATE: "/blog/save",
    UPDATE: (id) => `/blog/update/${id}`,
    ActiveStatus: (id) => `/blog/key/update/${id}`,
};

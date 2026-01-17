export const ADMIN_ROUTES = {
    LIST: "/admin/sub-admin/index",
    DELETE: (id) => `/admin/sub-admin/delete/${id}`,
    CREATE: "/admin/sub-admin/create",
    UPDATE: (id) => `/admin/sub-admin/update/${id}`,
    fetchRolesMenus: "/admin/sub-admin/fetch-role-menu",
};

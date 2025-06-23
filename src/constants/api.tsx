export const API_BASE_URL = "https://api2.thendralbooking.com/v1";

export const API_ENDPOINTS = {

  // === Manage Roles & Permissions ===
  ROLE_LIST: `${API_BASE_URL}/role/list`,
  ROLE_CREATE: `${API_BASE_URL}/role/create`,
  ROLE_UPDATE: (id: string) => `${API_BASE_URL}/role/update/${id}`,

};

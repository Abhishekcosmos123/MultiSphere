import { apiClient } from "../../client";

export const getCurrentModule = async () => {
  return apiClient.post("/super-admin/current-module");
}

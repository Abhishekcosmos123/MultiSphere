
// services/admin.service.ts
import { apiClient } from '../../client';
import { AdminProfilePayload } from '../../../../../types/admin';

export const updateAdminProfile = async (
    id: string,
    payload: AdminProfilePayload
): Promise<{ message: string; data: any }> => {
    return apiClient.patch(`/admin/profile/${id}`, payload);
};

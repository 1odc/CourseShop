import api from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { Purchase } from "../types";

const mapPurchase = (p: Purchase): Purchase => ({
  id: p.id,
  userId: p.userId,
  courseId: p.courseId,
});

export const purchasesApi = {
  getByUser: async (userId: number): Promise<Purchase[]> => {
    const { data } = await api.get<Purchase[]>(endpoints.purchases, {
      params: { userId },
    });
    return data.map(mapPurchase);
  },
  create: async (userId: number, courseId: number): Promise<Purchase> => {
    const { data } = await api.post<Purchase>(endpoints.purchases, { userId, courseId });
    return mapPurchase(data);
  },
};
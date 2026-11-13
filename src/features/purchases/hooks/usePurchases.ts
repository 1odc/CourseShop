import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { purchasesApi } from "../api/purchaseApi";
export const usePurchases = (userId: number | undefined) =>
  useQuery({
    queryKey: ["purchases", userId],
    queryFn: () => purchasesApi.getByUser(userId!),
    enabled: userId !== undefined,
  });

export const useBuyCourse = (userId: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: number) => purchasesApi.create(userId!, courseId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["purchases", userId] }),
  });
};
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { coursesApi } from "../api/coursesApi";

export const useCourses = () =>
  useQuery({ queryKey: ["courses"], queryFn: coursesApi.getAll });

export const useAddCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: coursesApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });
};
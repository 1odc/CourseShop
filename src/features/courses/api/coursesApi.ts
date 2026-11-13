import api from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { Course, NewCourse } from "../types";

const mapCourse = (c: Course): Course => ({
  id: c.id,
  title: c.title,
  description: c.description,
  price: c.price,
  author: c.author,
  image: c.image
});

export const coursesApi = {
  getAll: async (): Promise<Course[]> => {
    const { data } = await api.get<Course[]>(endpoints.courses);
    return data.map(mapCourse);
  },
  create: async (course: NewCourse): Promise<Course> => {
    const { data } = await api.post<Course>(endpoints.courses, course);
    return mapCourse(data);
  },
  remove: async (id: number): Promise<void> => {
    await api.delete(`${endpoints.courses}/${id}`);
  },
};
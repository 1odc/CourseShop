export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  author: string;
}

export type NewCourse = Omit<Course, "id">;
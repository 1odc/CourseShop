import { useCourses } from "../hooks/useCourses";
import CourseCard from "../components/CourseCard";

export default function HomePage() {
  const { data: courses = [], isLoading, error } = useCourses();

  if (isLoading) return <p className="status status--loading">Завантаження...</p>;
  if (error) return <p className="status status--error">{error.message}</p>;

  return (
    <section className="home">
      <h1 className="home__title">Курси на продаж</h1>
      <div className="home__grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
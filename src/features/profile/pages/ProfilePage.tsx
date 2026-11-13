import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth";
import { useCourses } from "@/features/courses";
import { usePurchases } from "@/features/purchases";

export default function ProfilePage() {
  const user = useSelector(selectUser);
  const { data: courses = [], isLoading: loadingCourses } = useCourses();
  const { data: purchases = [], isLoading: loadingPurchases } = usePurchases(user?.id);

  if (!user) return null;

  if (loadingCourses || loadingPurchases) {
    return <p className="status status--loading">Завантаження...</p>;
  }

  const purchasedIds = purchases.map((p) => p.courseId);
  const myCourses = courses.filter((c) => purchasedIds.includes(c.id));

  return (
    <section className="profile">
      <div className="profile__info">
        <div className="profile__avatar">{user.name[0]}</div>
        <div className="profile__details">
          <h1 className="profile__name">{user.name}</h1>
          <p className="profile__email">{user.email}</p>
          <p className="profile__role">
            {user.role === "admin" ? "Викладач" : "Студент"}
          </p>
        </div>
      </div>

      <h2 className="profile__subtitle">Мої курси ({myCourses.length})</h2>

      {myCourses.length === 0 ? (
        <div className="profile__empty">
          <p>Ви ще не купили жодного курсу.</p>
          <Link to="/" className="profile__link">
            Перейти до курсів
          </Link>
        </div>
      ) : (
        <ul className="profile__list">
          {myCourses.map((course) => (
            <li key={course.id} className="profile__item">
              <h3 className="profile__item-title">{course.title}</h3>
              <p className="profile__item-author">{course.author}</p>
              <p className="profile__item-description">{course.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
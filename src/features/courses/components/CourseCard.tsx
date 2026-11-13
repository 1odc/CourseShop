import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth";
import { useBuyCourse, usePurchases } from "@/features/purchases";
import type { Course } from "../types";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { data: purchases = [] } = usePurchases(user?.id);
  const buy = useBuyCourse(user?.id);

  const purchased = purchases.some((p) => p.courseId === course.id);

  const handleBuy = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    buy.mutate(course.id);
  };

  return (
    <article className="course-card">
      <div className="course-card__image">
        {course.image ? (
          <img src={course.image} alt ={`Обкладинка курсу ${course.title}`}></img>) : ("IMG")}
      </div>
      <div className="course-card__body">
        <h3 className="course-card__title">{course.title}</h3>
        <p className="course-card__author">{course.author}</p>
        <p className="course-card__description">{course.description}</p>
      </div>
      <div className="course-card__footer">
        <span className="course-card__price">{course.price} грн</span>
        {user?.role === "admin" ? null : purchased ? (
          <button className="course-card__button course-card__button--purchased" disabled>
            Куплено
          </button>
        ) : (
          <button
            className="course-card__button"
            onClick={handleBuy}
            disabled={buy.isPending}
          >
            {buy.isPending ? "..." : "Купити"}
          </button>
        )}
      </div>
    </article>
  );
}
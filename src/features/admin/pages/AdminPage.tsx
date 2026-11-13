import { useSelector } from "react-redux";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FixedSizeList, type ListChildComponentProps } from "react-window";
import { selectUser } from "@/features/auth";
import {
  courseSchema,
  useAddCourse,
  useCourses,
  type Course,
  type CourseForm,
} from "@/features/courses";

function Row({ index, style, data }: ListChildComponentProps<Course[]>) {
  const course = data[index];
  return (
    <div className="admin__row" style={style}>
      <span className="admin__row-title">{course.title}</span>
      <span className="admin__row-author">{course.author}</span>
      <span className="admin__row-price">{course.price} грн</span>
    </div>
  );
}

export default function AdminPage() {
  const user = useSelector(selectUser);
  const authorName = user?.name ?? "";
  const { data: courses = [], isLoading } = useCourses();
  const addCourse = useAddCourse();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
    defaultValues: { author: authorName },
  });

  const onSubmit: SubmitHandler<CourseForm> = (values) => {
    addCourse.mutate(values, {
      onSuccess: () =>
        reset({ title: "", description: "", author: authorName }),
    });
  };

  return (
    <section className="admin">
      <h1 className="admin__title">Панель викладача</h1>

      <form className="admin__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="admin__subtitle">Новий курс</h2>

        <div className="admin__field">
          <label className="admin__label">Назва</label>
          <input className="admin__input" {...register("title")} />
          {errors.title && <p className="admin__error">{errors.title.message}</p>}
        </div>

        <div className="admin__field">
          <label className="admin__label">Опис</label>
          <textarea className="admin__input" rows={3} {...register("description")} />
          {errors.description && <p className="admin__error">{errors.description.message}</p>}
        </div>

        <div className="admin__field">
          <label className="admin__label">Автор</label>
          <input className="admin__input" {...register("author")} />
          {errors.author && <p className="admin__error">{errors.author.message}</p>}
        </div>

        <div className="admin__field">
          <label className="admin__label">Ціна (грн)</label>
          <input
            className="admin__input"
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && <p className="admin__error">{errors.price.message}</p>}
        </div>

        {addCourse.isError && <p className="admin__error">{addCourse.error.message}</p>}
        {addCourse.isSuccess && <p className="admin__success">Курс додано!</p>}

        <button className="admin__button" type="submit" disabled={addCourse.isPending}>
          {addCourse.isPending ? "Збереження..." : "Додати курс"}
        </button>
      </form>

      <h2 className="admin__subtitle">Усі курси ({courses.length})</h2>
      {isLoading ? (
        <p className="status status--loading">Завантаження...</p>
      ) : (
        <FixedSizeList
          className="admin__list"
          height={300}
          width="100%"
          itemCount={courses.length}
          itemSize={50}
          itemData={courses}
        >
          {Row}
        </FixedSizeList>
      )}
    </section>
  );
}
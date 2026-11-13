import { useSelector } from "react-redux";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FixedSizeList, type ListChildComponentProps } from "react-window";
import { selectUser } from "@/features/auth";
import {
  courseSchema,
  useAddCourse,
  useCourses,
  useDeleteCourse,
  type Course,
  type CourseForm,
} from "@/features/courses";
interface CourseRowData{
  courses: Course[];
  onDelete: (id:number) => void;
}
function Row({ index, style, data }: ListChildComponentProps<CourseRowData>) {
  const course = data.courses[index];
  return (
    <div className="admin__row" style={style}>
      <span className="admin__row-title">{course.title}</span>
      <span className="admin__row-author">{course.author}</span>
      <span className="admin__row-price">{course.price} грн
        <button type="button" onClick={() => data.onDelete(course.id)}>Видалити</button>
      </span>
      
    </div>
  );
}

export default function AdminPage() {
  const user = useSelector(selectUser);
  const authorName = user?.name ?? "";
  const { data: courses = [], isLoading } = useCourses();
  const addCourse = useAddCourse();
  const deleteCourse = useDeleteCourse();

  const handleDeleteCourse = (id:number) => {
    if (window.confirm("Видалити цей курс?")) {
      deleteCourse.mutate(id);
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
    defaultValues: { author: authorName, image: "" },
  });

  const onSubmit: SubmitHandler<CourseForm> = (values) => {
    addCourse.mutate(values, {
      onSuccess: () =>
        reset({ title: "", description: "", author: authorName, image: "" }),
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
          <label className="admin__label">Посилання на фото (необов'язково)</label>
          <input
            className="admin__input"
            type="url"
            placeholder="https://example.com/image.jpg"
            {...register("image")}
          />
          {errors.image && <p className="admin__error">{errors.image.message}</p>}
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
          itemData={{courses, onDelete: handleDeleteCourse}}
        >
          {Row}
        </FixedSizeList>
      )}
    </section>
  );
}
import styles from "@/pages/todos/todos.module.scss";
import Link from "next/link";

type TodoType = {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
};

const TampilanTodos = ({ todos }: { todos: TodoType[] }) => {
  return (
    <div className={styles.todos}>
      <h1 className={styles.todos__title}>Daftar Todos</h1>

      <div className={styles.todos__content}>
        {todos.length > 0 ? (
          <>
            {todos.map((todos: TodoType) => (
              <Link
                href={`/todos/${todos.id}`}
                key={todos.id}
                className={styles.todos__content__item}
              >
                <h4 className={styles.todos__content__item__title}>
                  {todos.title}
                </h4>

                <p className={styles.todos__content__item__priority}>
                  Priority: {todos.priority}
                </p>

                <p className={styles.todos__content__item__status}>
                  Status: {todos.completed ? "Selesai" : "Belum selesai"}
                </p>
              </Link>
            ))}
          </>
        ) : (
          <div className={styles.todos__content__skeleton}>
            <div className={styles.todos__content__skeleton__title}></div>
            <div className={styles.todos__content__skeleton__priority}></div>
            <div className={styles.todos__content__skeleton__status}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TampilanTodos;
import styles from "@/pages/todos/todos.module.scss";

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
            {todos.map((todo: TodoType) => (
              <div key={todo.id} className={styles.todos__content__item}>
                <h4 className={styles.todos__content__item__title}>
                  {todo.title}
                </h4>

                <p className={styles.todos__content__item__priority}>
                  Priority: {todo.priority}
                </p>

                <p className={styles.todos__content__item__status}>
                  Status: {todo.completed ? "Selesai" : "Belum selesai"}
                </p>
              </div>
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
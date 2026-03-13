import { TodoType } from "@/types/todos.type";
import styles from "@/views/detailTodos/detailTodos.module.scss";

const DetailTodo = ({ todos }: { todos: TodoType }) => {
  return (
    <>
      <h1 className={styles.title_detail}>Detail Todo</h1>

      <div className={styles.tododetail}>
        <div className={styles.tododetail__info}>
          
          <h2 className={styles.tododetail_title}>{todos.title}</h2>

          <p className={styles.tododetail_priority}>
            Priority: {todos.priority}
          </p>

          <p
            className={styles.tododetail_status}
            style={{ color: todos.completed ? "green" : "red" }}
          >
            Status: {todos.completed ? "Completed" : "Not Completed"}
          </p>

        </div>
      </div>
    </>
  );
};

export default DetailTodo;

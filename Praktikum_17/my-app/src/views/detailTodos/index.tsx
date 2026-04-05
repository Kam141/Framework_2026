import { TodoType } from "@/types/todos.type";
import styles from "@/views/detailTodos/detailTodos.module.scss";

const DetailTodo = ({ data }: { data: TodoType }) => {
  return (
    <>
      <h1 className={styles.title_detail}>Detail Todo</h1>

      <div className={styles.tododetail}>
        <div className={styles.tododetail_info}>
          
          <h2 className={styles.tododetail_title}>{data.name}</h2>

          <p className={styles.tododetail_priority}>
            Priority: {data.priority}
          </p>

          <p
            className={styles.tododetail_status}
            style={{ color: data.completed ? "green" : "red" }}
          >
            Status: {data.completed ? "Completed" : "Not Completed"}
          </p>

        </div>
      </div>
    </>
  );
};

export default DetailTodo;

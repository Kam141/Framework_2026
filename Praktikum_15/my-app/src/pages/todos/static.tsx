import TampilanProduk from "@/views/todos";
import { TodoType } from "../../types/todos.type";


const HalamanTodoStatic = (props:{todos:TodoType[]}) => {
    const { todos } = props;
  return (
    <div>
      <h1>Halaman Produk Static</h1>
      <TampilanProduk todos={todos} />
    </div>
  );
};

export default HalamanTodoStatic;

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:3000/api/todos");
  const response = await res.json();

  return {
    props: {
      todos: response.data,
    },
  };
}
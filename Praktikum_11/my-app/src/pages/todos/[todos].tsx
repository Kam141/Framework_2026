import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailTodo from "@/views/detailTodos";
import { TodoType } from "@/types/todos.type";

// const HalamanTodo = () => {
//   const { query } = useRouter();

//   const { data, error, isLoading } = useSWR(
//     query.todos ? `/api/todos/${query.todos}` : null,
//     fetcher
//   );

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Gagal mengambil data todo</div>;
//   }

//   return (
//     <div>
//       <DetailTodo todos={data?.data?.[0]} />
//     </div>
//   );
// };

// export default HalamanTodo;


// server side rendering
// type Props = {
//   todos: TodoType | null;
// };

const HalamanTodo = ({ todos }: {todos: TodoType}) => {
  if (!todos) {
    return <div>Data todo tidak ditemukan</div>;
  }

  return (
    <div>
      <DetailTodo todos={todos} />
    </div>
  );
};

export default HalamanTodo;

export async function getServerSideProps({
  params,
}: {
  params: { todos: string };
}) {

  const res = await fetch(`http://localhost:3000/api/todos/${params?.todos}`);


    const response = await res.json();

    return {
      props: {
        todos: response.data?.[0], // Pastikan memberikan nilai default jika data tidak tersedia
      },
    };
}
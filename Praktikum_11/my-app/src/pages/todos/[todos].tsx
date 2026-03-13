import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailTodo from "@/views/detailTodos";
import { TodoType } from "@/types/todos.type";

const HalamanTodo = () => {
  const { query } = useRouter();

  const { data, error, isLoading } = useSWR(
    query.todos ? `/api/todos/${query.todos}` : null,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Gagal mengambil data todo</div>;
  }

  return (
    <div>
      <DetailTodo todos={data?.data?.[0]} />
    </div>
  );
};

export default HalamanTodo;
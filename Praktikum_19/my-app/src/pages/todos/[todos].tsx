import { TodoType } from "@/types/todos.type";
import DetailTodo from "@/views/detailTodos";

// Komponen tetap sama, hanya menerima props dari SSR
const HalamanTodo = ({ todos }: { todos: TodoType }) => {
  if (!todos) {
    return <div>Data todo tidak ditemukan</div>;
  }

  return (
    <div>
      <DetailTodo data={todos} />
    </div>
  );
};

export default HalamanTodo;

// Ganti getStaticProps & getStaticPaths menjadi getServerSideProps
export async function getServerSideProps({ params }: { params: { todos: string } }) {
  try {
    // Mengambil data berdasarkan parameter ID yang ada di URL
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${params.todos}`);
    
    if (!res.ok) {
      // Jika fetch gagal (misal 404), kembalikan notFound agar Next.js menampilkan halaman 404
      return { notFound: true };
    }

    const response: { data: TodoType } = await res.json();

    return {
      props: {
        // Asumsi API mengembalikan objek data langsung atau array. 
        // Sesuaikan dengan response API kamu (misal: response.data atau response.data[0])
        todos: response.data || null,
      },
    };
  } catch (error) {
    console.error("Error fetching todo SSR:", error);
    return {
      props: {
        todos: null,
      },
    };
  }
}
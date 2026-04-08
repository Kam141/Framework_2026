import TampilanProduk from "@/views/todos";
import { TodoType } from "../../types/todos.type";


const halamanTodoServer = (props:{todos:TodoType[]}) => {
  const { todos } = props;
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilanProduk todos={todos} />
    </div>
  );
};

export default halamanTodoServer;

// Fungsi getServerSideProps akan dipanggil setiap kali halaman ini diakses, dan akan mengambil data produk dari API sebelum merender halaman
export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`);
  const respone = await res.json();

//   console.log("Data produk yang diambil dari API:", respone);
  return {
    props: {
      todos: respone.data, // Pastikan untuk memberikan nilai default jika data tidak tersedia
    },
  };
}
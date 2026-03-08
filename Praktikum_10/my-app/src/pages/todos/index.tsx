import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import  TampilanList from "@/views/todos"
import useSWR from "swr";
import fetcher from "@/utils/swr/fetcher";


const list = () => {
  // const [isLogin, setIsLogin] = useState(false);
  // const { push } = useRouter();

  const [todos, setTodos] = useState([]);


  const {data, error, isLoading} = useSWR("/api/todos", fetcher);
  
  return (
    <div>
      <TampilanList todos={isLoading ? [] : data} />
    </div>
  );
  
};

export default list;
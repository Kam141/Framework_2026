// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataByID, retrieveProducts } from "@/utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Tangkap parameter 'todos' dari query
  const { todos } = req.query;

  // Jika berupa array (Catch-all route), ambil index 0. Jika string biasa, gunakan langsung.
  const id = Array.isArray(todos) ? todos[0] : todos;

  // Cek apakah 'id' tersedia
  if (id) {
    const data = await retrieveDataByID("todos", id as string);
    res.status(200).json({
      status: true,
      status_code: 200,
      data,
    });
  } else {
    // Jika tidak ada ID, ambil semua data
    const data = await retrieveProducts("todos");
    res.status(200).json({
      status: true,
      status_code: 200,
      data,
    });
  }
}
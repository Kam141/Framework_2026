import { useRouter } from "next/router";

const BlogDetail = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Detail Blog</h1>
      <p>Blog:  {query.slug}</p>
    </div>
  );
};

export default BlogDetail;
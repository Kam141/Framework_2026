import { useRouter } from "next/router";

const HalamanToko = () => {
//   const router = useRouter();
  const { query } = useRouter();
//   console.log(router);

  return (
    <div>
      <h1>Halaman Toko</h1>
        {/* <p>Toko: {` ${query.slug && query.slug[0] + "-" + query.slug[1]}` }</p> */}

        <p>
            Toko: {Array.isArray(query.slug) ? query.slug.join(" - ") : query.slug}
        </p>
    </div>
  );
};

export default HalamanToko;